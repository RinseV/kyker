import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Spotting')
export class SpottingObject {
  @Field(() => String)
  id: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  visibility: number;

  @Field(() => Int, { nullable: true })
  traffic: number;

  @Field(() => Float, { nullable: true })
  distance: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
