import { IsISO8601 } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class QueryDate {
    @Field(() => String)
    @IsISO8601()
    date: string;
}
