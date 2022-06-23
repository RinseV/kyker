import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../common/dto/page-info.object';
import { SpottingObject } from './spotting.object';

@ObjectType()
export class PaginatedSpottings {
  @Field(() => [SpottingObject])
  nodes: SpottingObject[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
