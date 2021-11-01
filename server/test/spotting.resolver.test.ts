import { addHours, format, isAfter, subDays, subHours } from 'date-fns';
import faker from 'faker';
import supertest, { SuperTest, Test } from 'supertest';
import Application from '../src/application';
import { ISO_DATE_FORMAT } from '../src/constants';
import { Spotting } from '../src/entities';
import { clearDatabase } from '../src/utils/services/clearDatabase.service';
import { Fixtures, loadFixtures } from '../src/utils/services/loadFixtures.service';
import { Hours } from '../src/validators/hours.validator';

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

    test('Retrieve single spotting', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        const response = await retrieveSpotting(request, fixtures.spottings[0].id).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                spotting: expect.objectContaining({
                    id: fixtures.spottings[0].id,
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
            })
        );
    });

    test('Retrieve spottings success', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        // Get all spottings for today
        const today = format(new Date(), ISO_DATE_FORMAT);
        const response = await retrieveSpottings(request, undefined, undefined, today).expect(200);

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

    test('Retrieve spottings on certain date', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        // Get all spottings from yesterday (should be none)
        const yesterday = format(subDays(new Date(), 1), ISO_DATE_FORMAT);
        const response = await retrieveSpottings(request, undefined, undefined, yesterday).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                spottings: expect.arrayContaining([])
            })
        );
        // Should be none
        expect(response.body.data.spottings.length).toBe(0);
    });

    test('Retrieve spottings of disabled animal', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        // Make sure there is a spotting for animal 6 in the DB
        const dbSpotting = await application.orm.em.getRepository(Spotting).findOne({
            animal: fixtures.animals[5].id
        });
        expect(dbSpotting).toBeDefined();

        // Get all spottings from animal 6 (disabled)
        const response = await retrieveSpottings(request, [fixtures.animals[5].id]).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                spottings: expect.arrayContaining([])
            })
        );
        // Should be none
        expect(response.body.data.spottings.length).toBe(0);
    });

    test('Retrieve spottings in hour window', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        // Get all spottings between 2 hours ago and 2 hours from now (should be 2)
        const now = new Date();
        // Format 2 hours ago till 2 hours from now
        const start = format(subHours(now, 2), 'HH:mm');
        const end = format(addHours(now, 2), 'HH:mm');
        const response = await retrieveSpottings(request, undefined, undefined, undefined, { start, end }).expect(200);

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
        // Spottings are created ~1 hour apart, there should 2 spottings
        expect(response.body.data.spottings.length).toBe(2);
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

    test('Create spotting at earlier time', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        const userId = faker.random.alphaNumeric(20);
        const location = { lat: faker.datatype.number(50), lon: faker.datatype.number(50) };
        const description = faker.lorem.sentence();
        const now = new Date();
        const date = subHours(now, 1);
        const response = await createSpotting(
            request,
            userId,
            fixtures.animals[0].id,
            location,
            description,
            date
        ).expect(200);

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
                    description,
                    createdAt: date.getTime()
                })
            })
        );
        // updatedAt should reflect the time of creation
        expect(isAfter(response.body.data.createSpotting.updatedAt, now)).toBe(true);
    });

    test('Create spotting with bad word', async () => {
        if (!fixtures) {
            throw new Error('Fixtures not loaded');
        }

        const userId = faker.random.alphaNumeric(20);
        const location = { lat: faker.datatype.number(50), lon: faker.datatype.number(50) };
        // Should be filtered to ***** ******
        const description = 'fukin ash0le';
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
                    description: '***** ******'
                })
            })
        );
    });
});

const retrieveSpotting = (request: SuperTest<Test>, id: number) => {
    return request.post('/graphql').send({
        query: `query Spotting($id: Int!) {
            spotting(id: $id) {
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
            id
        }
    });
};

const retrieveSpottings = (
    request: SuperTest<Test>,
    animals?: number[],
    excludedAnimals?: number[],
    date?: string,
    hours?: Hours
) => {
    return request.post('/graphql').send({
        query: `query Spottings($animals: [Int!], $excludedAnimals: [Int!], $date: QueryDate, $hours: Hours) {
            spottings(
                animals: $animals
                excludedAnimals: $excludedAnimals
                date: $date,
                hours: $hours
            ) {
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
            excludedAnimals,
            date: date
                ? {
                      date
                  }
                : undefined,
            hours
        }
    });
};

const createSpotting = (
    request: SuperTest<Test>,
    userId: string,
    animalId: number,
    location: { lon: number; lat: number } = { lon: faker.datatype.number(100), lat: faker.datatype.number(80) },
    description = faker.lorem.word(),
    createdAt?: Date
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
                createdAt
                updatedAt
            }
        }`,
        variables: {
            id: userId,
            input: {
                animal: animalId,
                lat: location.lat,
                lon: location.lon,
                description,
                createdAt: createdAt ? createdAt.getTime() : undefined
            }
        }
    });
};
