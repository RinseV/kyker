import { BaseEntity, Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';
import { Color } from '.';

@ObjectType()
@Entity()
export class Animal extends BaseEntity<Animal, 'id'> {
    @Field(() => Int)
    @PrimaryKey()
    id: number;

    @Field(() => String)
    @Property({ type: 'text' })
    name: string;

    @Field(() => Color)
    @Embedded(() => Color)
    color: Color;

    @Field(() => Boolean)
    @Property({ type: 'boolean', default: false })
    disabled: boolean;

    @Field(() => Date)
    @Property({ type: 'date' })
    createdAt: Date = new Date();

    @Field(() => Date)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
