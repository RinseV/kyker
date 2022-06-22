import { Query, Resolver } from '@nestjs/graphql';
import { CampService } from './camp.service';
import { CampObject } from './dto/camp.object';

@Resolver(() => CampObject)
export class CampResolver {
  constructor(private campService: CampService) {}

  @Query(() => [CampObject])
  camps(): Promise<CampObject[]> {
    return this.campService.findAll();
  }
}
