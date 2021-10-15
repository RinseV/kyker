import Application from '../src/application';
import supertest, { SuperTest, Test } from 'supertest';
import { Fixtures, loadFixtures } from '../src/utils/services/loadFixtures.service';
import { clearDatabase } from '../src/utils/services/clearDatabase.service';

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
        expect(response.body.data.spottings.length).toBe(fixtures.spottings.length);
    });

    test.todo('Retrieve spottings with animal filter');

    test.todo('Retrieve spottings with animals exclude filter');

    test.todo('Create spotting');
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
