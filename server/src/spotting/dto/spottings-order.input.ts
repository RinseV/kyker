import { Field, Float, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class SpottingsOrderNearby {
  @Field(() => Sort)
  nearby: Sort;

  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  latitude: number;
}

@InputType()
export class SpottingsOrderBy {
  @Field(() => Sort, { nullable: true })
  date?: Sort;

  @Field(() => SpottingsOrderNearby, { nullable: true })
  nearby?: SpottingsOrderNearby;
}

enum Sort {
  asc = 'asc',
  desc = 'desc'
}

registerEnumType(Sort, {
  name: 'Sort',
  description: 'Sort direction'
});
