import { MikroORM } from '@mikro-orm/core';
import faker from 'faker';
import { Animal, Camp, Gate, User, Color, Location, Spotting } from '../../entities';
import { CampSize } from '../campSize';

export interface Fixtures {
    animals: Animal[];
    camps: Camp[];
    gates: Gate[];
    spottings: Spotting[];
}

export const AMOUNT_OF_FIXTURES = 5;

export const loadFixtures = async (orm: MikroORM): Promise<Fixtures | undefined> => {
    let fixtures: Fixtures;

    try {
        const animals = [...Array(AMOUNT_OF_FIXTURES)].map(() => {
            const animal = orm.em.create(Animal, {
                name: faker.vehicle.manufacturer(),
                color: new Color(faker.commerce.color(), faker.commerce.color())
            });

            orm.em.persist(animal);

            return animal;
        });

        await orm.em.flush();

        const camps = [...Array(AMOUNT_OF_FIXTURES)].map(() => {
            const camp = orm.em.create(Camp, {
                name: faker.commerce.department(),
                location: new Location(faker.datatype.number(80), faker.datatype.number(100)),
                size: CampSize.BUSH
            });

            orm.em.persist(camp);

            return camp;
        });

        await orm.em.flush();

        const gates = [...Array(AMOUNT_OF_FIXTURES)].map(() => {
            const gate = orm.em.create(Gate, {
                name: faker.commerce.productName(),
                location: new Location(faker.datatype.number(80), faker.datatype.number(100))
            });

            orm.em.persist(gate);

            return gate;
        });

        const spottings = [...Array(AMOUNT_OF_FIXTURES)].map((_, spottingIndex) => {
            // Create user for spotting
            const user = orm.em.create(User, {
                id: faker.random.alphaNumeric(20)
            });

            orm.em.persist(user);

            const spotting = orm.em.create(Spotting, {
                user: user,
                location: new Location(faker.datatype.number(80), faker.datatype.number(100)),
                animal: animals[spottingIndex].id,
                description: faker.lorem.sentence()
            });

            orm.em.persist(spotting);

            return spotting;
        });

        await orm.em.flush();

        fixtures = { animals, camps, gates, spottings };

        return fixtures;
    } catch (error) {
        console.error('Could not load fixtures', error);
    }

    return undefined;
};
