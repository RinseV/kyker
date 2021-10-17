import { Embeddable, Property } from '@mikro-orm/core';
import { Field, Float, ObjectType } from 'type-graphql';

@ObjectType()
@Embeddable()
export class Location {
    @Field(() => Float)
    @Property({ type: 'float' })
    lat: number;

    @Field(() => Float)
    @Property({ type: 'float' })
    lon: number;

    constructor(lat: number, lon: number) {
        this.lat = lat;
        this.lon = lon;
    }
}
