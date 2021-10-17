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

    @Field(() => String, { nullable: true })
    @Property({ type: 'text', nullable: true })
    colorScheme?: string;

    constructor(light: string, dark: string, colorScheme?: string) {
        this.light = light;
        this.dark = dark;
        this.colorScheme = colorScheme;
    }
}
