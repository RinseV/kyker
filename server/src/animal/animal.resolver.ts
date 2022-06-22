import { Query, Resolver } from '@nestjs/graphql';
import { AnimalService } from './animal.service';
import { AnimalObject } from './dto/animal.object';

@Resolver(() => AnimalObject)
export class AnimalResolver {
  constructor(private animalService: AnimalService) {}

  @Query(() => [AnimalObject])
  animals(): Promise<AnimalObject[]> {
    return this.animalService.findAll();
  }
}
