import { Max, Min } from 'class-validator';
import { Field, Float, InputType } from 'type-graphql';
import { Animal } from '../utils/animals';

@InputType()
export class PinValidator {
    @Field(() => Animal)
    animal: Animal;

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
}
