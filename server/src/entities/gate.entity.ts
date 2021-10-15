import { BaseEntity, Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';
import { Location } from '.';

@ObjectType()
@Entity()
export class Gate extends BaseEntity<Gate, 'id'> {
    @Field(() => Int)
    @PrimaryKey()
    id: number;

    @Field(() => String)
    @Property({ type: 'text' })
    name: string;

    @Field(() => Location)
    @Embedded(() => Location)
    location: Location;

    @Field(() => Date)
    @Property({ type: 'date' })
    createdAt: Date = new Date();

    @Field(() => Date)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
