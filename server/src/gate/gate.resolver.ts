import { Query, Resolver } from '@nestjs/graphql';
import { GateObject } from './dto/gate.object';
import { GateService } from './gate.service';

@Resolver(() => GateObject)
export class GateResolver {
  constructor(private gateService: GateService) {}

  @Query(() => [GateObject])
  gates(): Promise<GateObject[]> {
    return this.gateService.findAll();
  }
}
