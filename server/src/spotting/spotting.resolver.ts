import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AnimalObject } from '../animal/dto/animal.object';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSpottingInput } from './dto/create-spotting.input';
import { SpottingObject } from './dto/spotting.object';
import { SpottingsFilter } from './dto/spottings-filter.input';
import { SpottingsOrderBy } from './dto/spottings-order.input';
import { SpottingsPaginationInput } from './dto/spottings-pagination.input';
import { PaginatedSpottings } from './dto/spottings.object';
import { SpottingService } from './spotting.service';

@Resolver(() => SpottingObject)
export class SpottingResolver {
  constructor(private readonly spottingService: SpottingService, private readonly prisma: PrismaService) {}

  @Query(() => PaginatedSpottings)
  async spottings(
    @Args('filter', { type: () => SpottingsFilter }) filter: SpottingsFilter,
    @Args('orderBy', { type: () => SpottingsOrderBy, nullable: true }) orderBy?: SpottingsOrderBy,
    @Args('paginationInput', { type: () => SpottingsPaginationInput, nullable: true })
    paginationInput?: SpottingsPaginationInput
  ): Promise<PaginatedSpottings> {
    return this.spottingService.getSpottings(filter, orderBy, paginationInput);
  }

  @Query(() => SpottingObject, { nullable: true })
  async spotting(@Args('id', { type: () => String }) id: string): Promise<SpottingObject | null> {
    return this.spottingService.getSpotting(id);
  }

  @Mutation(() => SpottingObject)
  async createSpotting(@Args('input') input: CreateSpottingInput): Promise<SpottingObject> {
    return this.spottingService.create(input);
  }

  @ResolveField(() => AnimalObject)
  async animal(@Parent() spotting: SpottingObject): Promise<AnimalObject> {
    const { id } = spotting;
    return this.prisma.spotting.findUnique({ where: { id } }).animal();
  }
}
