import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AnimalObject } from '../animal/dto/animal.object';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSpottingInput } from './dto/create-spotting.input';
import { SpottingObject } from './dto/spotting.object';
import { SpottingsFilter } from './dto/spottings-filter.input';
import { SpottingService } from './spotting.service';

@Resolver(() => SpottingObject)
export class SpottingResolver {
  constructor(private readonly spottingService: SpottingService, private readonly prisma: PrismaService) {}

  @Query(() => [SpottingObject])
  async spottings(@Args('filter', { type: () => SpottingsFilter }) filter: SpottingsFilter): Promise<SpottingObject[]> {
    return this.spottingService.getSpottings(filter);
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
