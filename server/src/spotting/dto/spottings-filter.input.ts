import { Field, InputType } from '@nestjs/graphql';
import { IsISO8601, IsOptional, Matches } from 'class-validator';
import { format } from 'date-fns';
import { HOUR_PATTERN, ISO_DATE_FORMAT } from '../constants';

@InputType()
export class SpottingsFilter {
  @Field(() => [String], { nullable: true, defaultValue: [] })
  @IsOptional()
  animals?: string[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  @IsOptional()
  excludeAnimals?: string[];

  @Field(() => String, { defaultValue: format(new Date(), ISO_DATE_FORMAT) })
  @IsISO8601({}, { message: 'date must be in format yyyy-MM-dd' })
  date: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(HOUR_PATTERN, { message: 'startHour must be in format HH:mm' })
  startHour?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(HOUR_PATTERN, { message: 'endHour must be in format HH:mm' })
  endHour?: string;
}
