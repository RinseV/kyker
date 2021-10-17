import { Embeddable, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Embeddable()
export class Color {
    @Field(() => String)
    @Property({ type: 'text' })
    light: string;

    @Field(() => String)
    @Property({ type: 'text' })
    dark: string;

    constructor(light: string, dark: string) {
        this.light = light;
        this.dark = dark;
    }
}
