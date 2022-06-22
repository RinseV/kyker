import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Min, Max, IsOptional, MaxLength, IsDate } from 'class-validator';
import { validationConstants } from '../constants';

@InputType()
export class CreateSpottingInput {
  @Field(() => String)
  userIdentifier: string;

  @Field(() => String)
  animalId: string;

  @Field(() => Float)
  @Min(-26, { message: 'Spotting must be in the park (latitude between -26 and -22)' })
  @Max(-22, { message: 'Spotting must be in the park (latitude between -26 and -22)' })
  latitude: number;

  @Field(() => Float)
  @Min(30, { message: 'Spotting must be in the park (longitude between 30 and 32)' })
  @Max(32, { message: 'Spotting must be in the park (longitude between 30 and 32)' })
  longitude: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(validationConstants.maxDescriptionLength)
  description?: string;

  @Field(() => Int)
  @Min(1)
  @Max(3)
  visibility: number;

  @Field(() => Int)
  @Min(1)
  @Max(3)
  traffic: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
