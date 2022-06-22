import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Prisma, Spotting } from '@prisma/client';
import { endOfDay, parse, startOfDay } from 'date-fns';
import { AnimalService } from '../animal/animal.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateSpottingInput } from './dto/create-spotting.input';
import { SpottingsFilter } from './dto/spottings-filter.input';

@Injectable()
export class SpottingService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => AnimalService)) private readonly animalService: AnimalService
  ) {}

  async create(input: CreateSpottingInput): Promise<Spotting> {
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
    return spotting;
  }

  async getSpotting(id: string): Promise<Spotting | null> {
    const spotting = await this.prisma.spotting.findUnique({ where: { id } });
    if (!spotting) {
      return null;
    }
    return spotting;
  }

  async getSpottings(filter: SpottingsFilter): Promise<Spotting[]> {
    const where = this.generateFilter(filter);
    const spottings = await this.prisma.spotting.findMany({
      where
    });
    return spottings;
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
}
