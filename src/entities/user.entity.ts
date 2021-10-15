import { BaseEntity, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from 'type-graphql';
import { Spotting } from './spotting.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity<User, 'id'> {
    @Field(() => ID)
    @PrimaryKey({ type: 'text', unique: true })
    id: string;

    @Field(() => [Spotting])
    @OneToMany(() => Spotting, (p: Spotting) => p.user)
    spottings = new Collection<Spotting>(this);

    @Field(() => Date)
    @Property({ type: 'date' })
    createdAt: Date = new Date();

    @Field(() => Date)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
