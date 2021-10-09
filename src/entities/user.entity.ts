import { BaseEntity, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from 'type-graphql';
import { Pin } from './pin.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity<User, 'id'> {
    @Field(() => ID)
    @PrimaryKey({ type: 'text', unique: true })
    id: string;

    @Field(() => [Pin])
    @OneToMany(() => Pin, (p: Pin) => p.user)
    pins = new Collection<Pin>(this);

    @Field(() => Date)
    @Property({ type: 'date' })
    createdAt: Date = new Date();

    @Field(() => Date)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
