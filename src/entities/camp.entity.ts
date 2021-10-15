import { BaseEntity, Embedded, Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';
import { Location } from '.';
import { CampSize } from '../utils/campSize';

@ObjectType()
@Entity()
export class Camp extends BaseEntity<Camp, 'id'> {
    @Field(() => Int)
    @PrimaryKey()
    id: number;

    @Field(() => String)
    @Property({ type: 'text' })
    name: string;

    @Field(() => Location)
    @Embedded(() => Location)
    location: Location;

    @Field(() => CampSize)
    @Enum(() => CampSize)
    size: CampSize;

    @Field(() => Date)
    @Property({ type: 'date' })
    createdAt: Date = new Date();

    @Field(() => Date)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
