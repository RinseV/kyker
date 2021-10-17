import { BaseEntity, Embedded, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';
import { Animal } from '.';
import { Location } from './location.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Spotting extends BaseEntity<Spotting, 'id'> {
    @Field(() => Int)
    @PrimaryKey()
    id: number;

    @Field(() => User)
    @ManyToOne(() => User)
    user: User;

    @Field(() => Location)
    @Embedded(() => Location)
    location: Location;

    @Field(() => Animal)
    @ManyToOne(() => Animal)
    animal: Animal;

    @Field(() => String, { nullable: true })
    @Property({ type: 'text', nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    @Property({ type: 'text', nullable: true })
    imageId?: string;

    @Field(() => Date)
    @Property({ type: 'date' })
    createdAt: Date = new Date();

    @Field(() => Date)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
