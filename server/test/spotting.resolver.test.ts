import faker from 'faker';
import supertest, { SuperTest, Test } from 'supertest';
import Application from '../src/application';
import { clearDatabase } from '../src/utils/services/clearDatabase.service';
import { Fixtures, loadFixtures } from '../src/utils/services/loadFixtures.service';

describe('Spotting resolver tests', () => {
    let application: Application;
    let request: SuperTest<Test>;
    let fixtures: Fixtures | undefined;

    beforeAll(async () => {
        application = new Application();
        await application.connect();
        await application.init();

        application.orm.em.fork();

        request = supertest(application.host.server);
    });

    beforeEach(async () => {
        await clearDatabase(application.orm);
        fixtures = await loadFixtures(application.orm);
    });

    afterAll(async () => {
        application.host.server.close();
        await application.orm.close();
        await application.redis.quit();
    });

    test('Retrieve spottings success', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        // Get all spottings
        const response = await retrieveSpottings(request).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                spottings: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        user: expect.objectContaining({
                            id: expect.any(String)
                        }),
                        animal: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        }),
                        location: expect.objectContaining({
                            lon: expect.any(Number),
                            lat: expect.any(Number)
                        }),
                        description: expect.any(String)
                    })
                ])
            })
        );
        // Should be the same number of spottings as in the fixtures
        expect(response.body.data.spottings.length).toBe(fixtures.spottings.length);
    });

    test('Retrieve spottings with animal filter', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        // Get only spottings from animal 1
        const response = await retrieveSpottings(request, [fixtures.animals[0].id]).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                spottings: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        user: expect.objectContaining({
                            id: expect.any(String)
                        }),
                        animal: expect.objectContaining({
                            id: fixtures.animals[0].id,
                            name: expect.any(String)
                        }),
                        location: expect.objectContaining({
                            lon: expect.any(Number),
                            lat: expect.any(Number)
                        }),
                        description: expect.any(String)
                    })
                ])
            })
        );
        // Should be only 1
        expect(response.body.data.spottings.length).toBe(1);
    });

    test('Retrieve spottings with animals exclude filter', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        // Get all spottings except animals 1, 2, 3 and 4 (so only 5)
        const response = await retrieveSpottings(request, undefined, [
            fixtures.animals[0].id,
            fixtures.animals[1].id,
            fixtures.animals[2].id,
            fixtures.animals[3].id
        ]).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                spottings: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        user: expect.objectContaining({
                            id: expect.any(String)
                        }),
                        animal: expect.objectContaining({
                            id: fixtures.animals[4].id,
                            name: expect.any(String)
                        }),
                        location: expect.objectContaining({
                            lon: expect.any(Number),
                            lat: expect.any(Number)
                        }),
                        description: expect.any(String)
                    })
                ])
            })
        );
        // Should be only one
        expect(response.body.data.spottings.length).toBe(1);
    });

    test('Retrieve spottings with animal include and exclude filters', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        // Get all spottings from animals 1 and 2, but exclude spottings from 2 (so only get 1)
        const response = await retrieveSpottings(
            request,
            [fixtures.animals[0].id, fixtures.animals[1].id],
            [fixtures.animals[1].id]
        ).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                spottings: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        user: expect.objectContaining({
                            id: expect.any(String)
                        }),
                        animal: expect.objectContaining({
                            id: fixtures.animals[0].id,
                            name: expect.any(String)
                        }),
                        location: expect.objectContaining({
                            lon: expect.any(Number),
                            lat: expect.any(Number)
                        }),

                        description: expect.any(String)
                    })
                ])
            })
        );
        // Should be only one
        expect(response.body.data.spottings.length).toBe(1);
    });

    test('Create spotting', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        const userId = faker.random.alphaNumeric(20);
        const location = { lat: faker.datatype.number(50), lon: faker.datatype.number(50) };
        const description = faker.lorem.sentence();
        const response = await createSpotting(request, userId, fixtures.animals[0].id, location, description).expect(
            200
        );

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                createSpotting: expect.objectContaining({
                    id: expect.any(Number),
                    user: expect.objectContaining({
                        id: userId
                    }),
                    animal: expect.objectContaining({
                        id: fixtures.animals[0].id,
                        name: expect.any(String)
                    }),
                    location,
                    description
                })
            })
        );
    });
});

const retrieveSpottings = (request: SuperTest<Test>, animals?: number[], excludedAnimals?: number[]) => {
    return request.post('/graphql').send({
        query: `query Spottings($animals: [Int!], $excludedAnimals: [Int!]) {
                spottings(animals: $animals, excludedAnimals: $excludedAnimals) {
                    id
                    user {
                        id
                    }
                    animal {
                        id
                        name
                    }
                    location {
                        lon
                        lat
                    }
                    description
                }
            }`,
        variables: {
            animals,
            excludedAnimals
        }
    });
};

const createSpotting = (
    request: SuperTest<Test>,
    userId: string,
    animalId: number,
    location: { lon: number; lat: number } = { lon: faker.datatype.number(100), lat: faker.datatype.number(80) },
    description = faker.lorem.word()
) => {
    return request.post('/graphql').send({
        query: `mutation CreateSpotting($id: String!, $input: SpottingValidator!) {
            createSpotting(id: $id, input: $input) {
                id
                animal {
                    id
                    name
                }
                location {
                    lon
                    lat
                }
                description
                user {
                    id
                }
            }
        }`,
        variables: {
            id: userId,
            input: {
                animal: animalId,
                lat: location.lat,
                lon: location.lon,
                description
            }
        }
    });
};