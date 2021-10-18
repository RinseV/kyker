import { Matches } from 'class-validator';
import { Field, InputType } from 'type-graphql';

const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

@InputType()
export class Hours {
    @Field(() => String)
    @Matches(pattern)
    start: string;

    @Field(() => String)
    @Matches(pattern)
    end: string;
}
