import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('Gate')
export class GateObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
