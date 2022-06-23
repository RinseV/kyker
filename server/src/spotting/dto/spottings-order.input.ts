import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class SpottingsOrderBy {
  @Field(() => Sort, { nullable: true })
  date?: Sort;
}

enum Sort {
  asc = 'asc',
  desc = 'desc'
}

registerEnumType(Sort, {
  name: 'Sort',
  description: 'Sort direction'
});
