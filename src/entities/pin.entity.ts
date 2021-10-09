import { BaseEntity, Embedded, Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';
import { Animal } from '../utils/animals';
import { Location } from './location.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Pin extends BaseEntity<Pin, 'id'> {
    @Field(() => Int)
    @PrimaryKey()
    id: number;

    @Field(() => User)
    @ManyToOne(() => User)
    user: User;

    @Field(() => Animal)
    @Enum(() => Animal)
    animal: Animal;

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
