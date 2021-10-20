import { IsDate, IsString, Max, MaxLength, Min } from 'class-validator';
import { Field, Float, InputType, Int } from 'type-graphql';

@InputType()
export class SpottingValidator {
    // Animal ID
    @Field(() => Int)
    animal: number;

    // Latitude is always between -90 and 90
    // TODO: limit to Kruger Park?
    @Field(() => Float)
    @Min(-90)
    @Max(90)
    lat: number;

    // Longitude is always between -180 and 180
    // TODO: limit to Kruger Park?
    @Field(() => Float)
    @Min(-180)
    @Max(180)
    lon: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @MaxLength(255)
    description?: string;

    @Field(() => Date, { nullable: true })
    @IsDate()
    createdAt?: Date;
}
