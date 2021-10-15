import { MikroORM } from '@mikro-orm/core';
import faker from 'faker';
import { Animal, Camp, Gate, User, Color, Location, Spotting } from '../../entities';
import { CampSize } from '../campSize';

export interface Fixtures {
    animals: Animal[];
    camps: Camp[];
    gates: Gate[];
    users: User[];
    spottings: Spotting[];
}

export const AMOUNT_OF_FIXTURES = 5;

export const loadFixtures = async (orm: MikroORM): Promise<Fixtures | undefined> => {
    let fixtures: Fixtures;

    try {
        const animals = [...Array(AMOUNT_OF_FIXTURES)].map((_, animalIndex) =>
            orm.em.create(Animal, {
                id: animalIndex + 1,
                name: faker.vehicle.manufacturer(),
                color: new Color(faker.commerce.color(), faker.commerce.color()),
                createdAt: new Date(),
                updatedAt: new Date()
            })
        );
        orm.em.persist(animals);

        const camps = [...Array(AMOUNT_OF_FIXTURES)].map((_, campIndex) =>
            orm.em.create(Camp, {
                id: campIndex + 1,
                name: faker.commerce.department(),
                location: new Location(faker.datatype.float(5), faker.datatype.float(5)),
                size: CampSize.BUSH,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        );
        orm.em.persist(camps);

        const gates = [...Array(AMOUNT_OF_FIXTURES)].map((_, gateIndex) =>
            orm.em.create(Gate, {
                id: gateIndex + 1,
                name: faker.commerce.productName(),
                location: new Location(faker.datatype.float(5), faker.datatype.float(5)),
                createdAt: new Date(),
                updatedAt: new Date()
            })
        );
        orm.em.persist(gates);

        await orm.em.flush();

        const users = [...Array(AMOUNT_OF_FIXTURES)].map((_, userIndex) =>
            orm.em.create(User, {
                id: (userIndex + 1).toString(),
                name: faker.name.firstName(),
                createdAt: new Date(),
                updatedAt: new Date()
            })
        );
        await orm.em.persistAndFlush(users);

        const spottings = [...Array(AMOUNT_OF_FIXTURES)].map((_, spottingIndex) =>
            orm.em.create(Spotting, {
                id: spottingIndex + 1,
                user: users[spottingIndex].id,
                location: new Location(faker.datatype.float(5), faker.datatype.float(5)),
                animal: animals[spottingIndex].id,
                description: faker.lorem.sentence(),
                createdAt: new Date(),
                updatedAt: new Date()
            })
        );
        await orm.em.persistAndFlush(spottings);

        fixtures = { animals, camps, gates, users, spottings };

        return fixtures;
    } catch (error) {
        console.error('Could not load fixtures', error);
    }
};
