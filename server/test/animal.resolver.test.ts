import supertest, { SuperTest, Test } from 'supertest';
import Application from '../src/application';
import { clearDatabase } from '../src/utils/services/clearDatabase.service';
import { Fixtures, loadFixtures } from '../src/utils/services/loadFixtures.service';

describe('Animal resolver tests', () => {
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

    test('Retrieve animals success', async () => {
        const response = await retrieveAnimals(request).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                animals: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    })
                ])
            })
        );
        expect(response.body.data.animals.length).toBe(fixtures?.animals.length);
    });
});

const retrieveAnimals = (request: SuperTest<Test>) => {
    return request.post('/graphql').send({
        query: `query Animals {
            animals {
                id
                name
            }
        }`
    });
};
