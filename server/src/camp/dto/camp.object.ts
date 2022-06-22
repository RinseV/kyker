import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CampSize } from '@prisma/client';

@ObjectType('Camp')
export class CampObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => CampSize)
  size: CampSize;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

registerEnumType(CampSize, {
  name: 'CampSize'
});
