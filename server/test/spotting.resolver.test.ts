import { MikroORM } from '@mikro-orm/core';
import faker from 'faker';
import { Animal, Camp, Color, Gate, Location, User } from '../src/entities';
import { CampSize } from '../src/utils/campSize';

export interface Fixtures {
    animals: Animal[];
    camps: Camp[];
    gates: Gate[];
    users: User[];
}

export const AMOUNT_OF_FIXTURES = 5;

export const loadFixtures = async (orm: MikroORM): Promise<Fixtures | undefined> => {
    let fixtures: Fixtures;

    try {
        const animals = [...Array(AMOUNT_OF_FIXTURES)].map(() => {
            const animal = orm.em.create(Animal, {
                name: faker.vehicle.manufacturer(),
                color: new Color(faker.commerce.color(), faker.commerce.color()),
                createdAt: new Date(),
                updatedAt: new Date()
            });

            orm.em.persist(animal);

            return animal;
        });

        await orm.em.flush();

        const camps = [...Array(AMOUNT_OF_FIXTURES)].map(() => {
            const camp = orm.em.create(Camp, {
                name: faker.commerce.department(),
                location: new Location(faker.datatype.float(5), faker.datatype.float(5)),
                size: CampSize.BUSH,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            orm.em.persist(camp);

            return camp;
        });

        await orm.em.flush();

        const gates = [...Array(AMOUNT_OF_FIXTURES)].map(() => {
            const gate = orm.em.create(Gate, {
                name: faker.commerce.productName(),
                location: new Location(faker.datatype.float(5), faker.datatype.float(5)),
                createdAt: new Date(),
                updatedAt: new Date()
            });

            orm.em.persist(gate);

            return gate;
        });

        await orm.em.flush();

        const users = [...Array(AMOUNT_OF_FIXTURES)].map((_, userIndex) => {
            const user = orm.em.create(User, {
                id: userIndex.toString(),
                name: faker.name.firstName(),
                createdAt: new Date(),
                updatedAt: new Date()
            });

            orm.em.persist(user);

            return user;
        });

        fixtures = { animals, camps, gates, users };

        return fixtures;
    } catch (error) {
        console.error('Could not load fixtures', error);
    }
};
