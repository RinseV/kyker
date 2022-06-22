import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Animal')
export class AnimalObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => String)
  lightColor: string;

  @Field(() => String)
  darkColor: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
