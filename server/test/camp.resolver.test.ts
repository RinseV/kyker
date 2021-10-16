import supertest, { SuperTest, Test } from 'supertest';
import Application from '../src/application';
import { clearDatabase } from '../src/utils/services/clearDatabase.service';
import { Fixtures, loadFixtures } from '../src/utils/services/loadFixtures.service';

describe('Camp resolver tests', () => {
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

    test('Retrieve camps success', async () => {
        const response = await retrieveCamps(request).expect(200);

        expect(response.body.data).toStrictEqual(
            expect.objectContaining({
                camps: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        location: expect.objectContaining({
                            lon: expect.any(Number),
                            lat: expect.any(Number)
                        }),
                        size: expect.any(String)
                    })
                ])
            })
        );
        expect(response.body.data.camps.length).toBe(fixtures?.camps.length);
    });
});

const retrieveCamps = (request: SuperTest<Test>) => {
    return request.post('/graphql').send({
        query: `query Camps {
            camps {
                id
                name
                location {
                    lon
                    lat
                }
                size
            }
        }`
    });
};
