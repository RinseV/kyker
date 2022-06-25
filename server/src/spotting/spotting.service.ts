import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { endOfDay, parse, startOfDay } from 'date-fns';
import { AnimalService } from '../animal/animal.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { paginationConstants } from './constants';
import { CreateSpottingInput } from './dto/create-spotting.input';
import { SpottingObject } from './dto/spotting.object';
import { SpottingsFilter } from './dto/spottings-filter.input';
import { SpottingsOrderBy } from './dto/spottings-order.input';
import { SpottingsPaginationInput } from './dto/spottings-pagination.input';
import { PaginatedSpottings } from './dto/spottings.object';

@Injectable()
export class SpottingService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => AnimalService)) private readonly animalService: AnimalService
  ) {}

  async create(input: CreateSpottingInput): Promise<SpottingObject> {
    // Find existing user or create one
    const user = await this.userService.findOrCreate({ identifier: input.userIdentifier });
    // Find animal from spotting and make sure it exists and is not disabled
    const animal = await this.animalService.findOne({ id: input.animalId });
    if (!animal) {
      throw new BadRequestException('Animal does not exist');
    }
    // Create spotting
    const spotting = await this.prisma.spotting.create({
      data: {
        user: { connect: { id: user.id } },
        animal: { connect: { id: animal.id } },
        latitude: input.latitude,
        longitude: input.longitude,
        description: input.description,
        visibility: input.visibility,
        traffic: input.traffic,
        createdAt: input.createdAt
      }
    });
    // Set location field in database
    await this.prisma.$executeRaw`UPDATE "Spotting"
      SET location = ST_GeomFromEWKT(${this.lonLatToPoint(input.longitude, input.latitude)})
      WHERE id = ${spotting.id};`;
    return {
      ...spotting,
      distance: null
    };
  }

  async getSpotting(id: string): Promise<SpottingObject | null> {
    const spotting = await this.prisma.spotting.findUnique({ where: { id } });
    if (!spotting) {
      return null;
    }
    return {
      ...spotting,
      distance: null
    };
  }

  async getSpottings(
    filter: SpottingsFilter,
    orderByInput?: SpottingsOrderBy,
    pagination?: SpottingsPaginationInput
  ): Promise<PaginatedSpottings> {
    const { skip, take } = this.generatePagination(pagination);
    const where = this.generateFilter(filter);
    const orderBy = this.generateOrder(orderByInput);
    const idOrder = await this.getClosestDistanceIds(filter, orderByInput);
    const spottings = await this.prisma.spotting.findMany({
      where,
      orderBy,
      take,
      skip
    });
    // Return results in order of idOrder
    const orderedSpottings = spottings.sort((a, b) => {
      return idOrder.findIndex((id) => id.id === a.id) - idOrder.findIndex((id) => id.id === b.id);
    });
    // Add distance from idOrder to each spotting
    const orderedSpottingsWithDistance = orderedSpottings.map((spotting) => {
      let distance = idOrder.find((id) => id.id === spotting.id)?.distance;
      distance = distance || distance === 0 ? Math.round(distance) : null;
      return { ...spotting, distance };
    });
    const totalCount = await this.prisma.spotting.count({ where });
    return {
      nodes: take ? orderedSpottingsWithDistance.slice(0, take - 1) : orderedSpottingsWithDistance,
      pageInfo: {
        hasNextPage: spottings.length === take,
        hasPreviousPage: skip > 0,
        totalCount
      }
    };
  }

  private generatePagination(pagination?: SpottingsPaginationInput): {
    skip: number;
    take: number | undefined;
  } {
    if (!pagination) {
      return { skip: 0, take: undefined };
    }

    const { offset, limit } = pagination || {};
    const skip = offset || paginationConstants.defaultOffset;
    // Take one more in case limit was given, otherwise just take all
    const realLimitPlusOne = limit ? limit + 1 : undefined;
    return {
      skip,
      take: realLimitPlusOne
    };
  }

  private async getClosestDistanceIds(
    { date, startHour, endHour }: SpottingsFilter,
    orderByInput?: SpottingsOrderBy
  ): Promise<{ id: string; distance: number }[]> {
    if (!orderByInput || !orderByInput.nearby) {
      return [];
    }
    // Parse query date to Date
    const [start, end] = this.getQueryDates(date, startHour, endHour);
    // Order by distance to user by creating a new field
    const result: { id: string; distance: number }[] = await this.prisma.$queryRaw`
      SELECT id, ST_Distance(
        location,
        ST_GeomFromEWKT(${this.lonLatToPoint(orderByInput.nearby.longitude, orderByInput.nearby.latitude)})
      ) AS distance
      FROM "Spotting"
      WHERE "createdAt" >= ${start} AND "createdAt" <= ${end}
      ORDER BY distance;
    `;
    // Reverse results if order is ascending
    if (orderByInput.nearby.nearby === 'desc') {
      result.reverse();
    }
    return result;
  }

  private generateOrder(orderByInput?: SpottingsOrderBy): Prisma.Enumerable<Prisma.SpottingOrderByWithRelationInput> {
    if (!orderByInput) {
      return [
        {
          createdAt: 'desc'
        }
      ];
    }

    // Default order is createdAt desc (newest first)
    let orderBy: Prisma.Enumerable<Prisma.SpottingOrderByWithRelationInput> = [
      {
        createdAt: 'desc'
      },
      {
        id: 'desc'
      }
    ];

    if (orderByInput.date) {
      orderBy = [
        ...orderBy,
        {
          createdAt: orderByInput.date
        }
      ];
    }

    return orderBy;
  }

  private generateFilter({
    animals,
    excludeAnimals,
    date,
    startHour,
    endHour
  }: SpottingsFilter): Prisma.SpottingWhereInput {
    let where: Prisma.SpottingWhereInput = {};

    // Include animals from filter
    if (animals.length > 0) {
      where = {
        animal: {
          id: {
            in: animals
          }
        }
      };
    }

    // Exclude excluded animals from filter
    if (excludeAnimals.length > 0) {
      where = {
        ...where,
        animal: {
          id: {
            notIn: excludeAnimals
          }
        }
      };
    }
    const [start, end] = this.getQueryDates(date, startHour, endHour);

    // Add date and time to filter
    where = {
      ...where,
      createdAt: {
        gte: start,
        lte: end
      }
    };

    return where;
  }

  private getQueryDates(date: string, startHour: string, endHour: string): [Date, Date] {
    // Parse query date to Date
    const dateAsDate = parse(date, 'yyyy-MM-dd', new Date());
    let start = startOfDay(dateAsDate);
    let end = endOfDay(dateAsDate);
    if (startHour) {
      start = parse(startHour, 'HH:mm', dateAsDate);
    }
    if (endHour) {
      end = parse(endHour, 'HH:mm', dateAsDate);
    }
    return [start, end];
  }

  private lonLatToPoint(lon: number, lat: number): string {
    return `SRID=4326;POINT(${lon} ${lat})`;
  }
}
