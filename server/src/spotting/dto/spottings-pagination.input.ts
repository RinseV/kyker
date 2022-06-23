import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';
import { paginationConstants } from '../constants';

@InputType()
export class SpottingsPaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: paginationConstants.defaultOffset })
  @IsOptional()
  @Min(0)
  offset?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  limit?: number;
}
