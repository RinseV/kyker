import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { TestingModule, Test } from '@nestjs/testing';
import { Animal, Spotting, User } from '@prisma/client';
import { useContainer } from 'class-validator';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SpottingFactory } from './factory/spotting.factory';
import request from 'supertest';
import each from 'jest-each';
import { UserFactory } from './factory/user.factory';
import { validationConstants } from '../src/spotting/constants';
import { faker } from '@faker-js/faker';
import { addDays, format, setHours } from 'date-fns';

const gql = '/graphql';

const badUserInputObject = expect.arrayContaining([
  expect.objectContaining({
    extensions: expect.objectContaining({
      code: 'BAD_USER_INPUT'
    })
  })
]);

const spottingQuery = `query Spotting($id:String!) {
  spotting(id:$id) {
    id
    animal {
      id
      name
    }
    latitude
    longitude
    description
    visibility
    traffic
  }
}`;

const spottingsQuery = `query Spottings($filter:SpottingsFilter!) {
  spottings(filter:$filter) {
    id
    animal {
      id
      name
    }
    latitude
    longitude
    visibility
    traffic
    createdAt
  }
}`;

const createSpottingMutation = `mutation CreateSpotting($input:CreateSpottingInput!) {
  createSpotting(input:$input) {
    id
    animal {
      id
      name
    }
    latitude
    longitude
    visibility
    traffic
    createdAt
  }
}`;

describe('Animal (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let user: User;
  let spotting: Spotting;
  let spotting2: Spotting;
  let spotting3: Spotting;
  let spotting4: Spotting;
  let spotting5: Spotting;
  let animals: Animal[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe());
    app.useLogger(null);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    user = await UserFactory.create(prisma);
    animals = await prisma.animal.findMany({});
    const now = new Date();
    const yesterday = addDays(now, -1);
    spotting = await SpottingFactory.create(prisma, user.identifier, animals[0].id, now);
    // Spotting2 was yesterday for filter test
    spotting2 = await SpottingFactory.create(prisma, user.identifier, animals[1].id, yesterday);
    // Spotting3 was with animals[2] for filter test
    spotting3 = await SpottingFactory.create(prisma, user.identifier, animals[2].id, now);
    // Spotting4 was made at 6 for filter test
    spotting4 = await SpottingFactory.create(prisma, user.identifier, animals[0].id, setHours(now, 6));
    // Spotting5 was made at 20 for filter test
    spotting5 = await SpottingFactory.create(prisma, user.identifier, animals[0].id, setHours(now, 20));
  });

  afterAll(async () => {
    await prisma.truncate();
    await prisma.$disconnect();
    await app.close();
  });

  describe('spotting', () => {
    it('should succeed', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest
        .post(gql)
        .send({ query: spottingQuery, variables: { id: spotting.id } });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spotting: expect.objectContaining({
          id: spotting.id,
          animal: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String)
          }),
          latitude: spotting.latitude,
          longitude: spotting.longitude,
          description: spotting.description,
          visibility: spotting.visibility,
          traffic: spotting.traffic
        })
      });
    });

    it('should fail, spotting does not exist', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({ query: spottingQuery, variables: { id: '123' } });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spotting: null
      });
    });
  });

  describe('spottings', () => {
    it('should succeed', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({ query: spottingsQuery, variables: { filter: {} } });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spottings: expect.arrayContaining([
          expect.objectContaining({
            id: spotting.id,
            animal: expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String)
            }),
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            visibility: expect.any(Number),
            traffic: expect.any(Number),
            createdAt: expect.any(String)
          })
        ])
      });
    });

    it('should succeed, with date filter (yesterday)', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            date: format(addDays(new Date(), -1), 'yyyy-MM-dd')
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spottings: expect.arrayContaining([
          expect.objectContaining({
            id: spotting2.id,
            animal: expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String)
            }),
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            visibility: expect.any(Number),
            traffic: expect.any(Number),
            createdAt: expect.any(String)
          })
        ])
      });
    });

    it('should succeed, with date filter (tomorrow)', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            date: format(addDays(new Date(), 1), 'yyyy-MM-dd')
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spottings: []
      });
    });

    it('should succeed, with animals filter', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            animals: [animals[0].id]
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spottings: expect.not.arrayContaining([
          expect.objectContaining({
            id: spotting3.id
          })
        ])
      });
    });

    it('should succeed, with excluded animals filter', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            excludeAnimals: [animals[0].id]
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spottings: expect.not.arrayContaining([
          expect.objectContaining({
            id: spotting.id
          })
        ])
      });
    });

    it('should succeed, with startHour filter', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            startHour: '07:00'
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spottings: expect.not.arrayContaining([
          expect.objectContaining({
            id: spotting4.id
          })
        ])
      });
    });

    it('should succeed, with endHour filter', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            endHour: '19:00'
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        spottings: expect.not.arrayContaining([
          expect.objectContaining({
            id: spotting5.id
          })
        ])
      });
    });

    it('should fail, invalid date format in filter', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            date: 'invalid'
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(expect.objectContaining(null));
      expect(body.errors).toStrictEqual(badUserInputObject);
    });

    it('should fail, invalid startHour format in filter', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            startHour: 'invalid'
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(expect.objectContaining(null));
      expect(body.errors).toStrictEqual(badUserInputObject);
    });

    it('should fail, invalid endHour format in filter', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: spottingsQuery,
        variables: {
          filter: {
            endHour: 'invalid'
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(expect.objectContaining(null));
      expect(body.errors).toStrictEqual(badUserInputObject);
    });
  });

  describe('createSpotting', () => {
    it('should succeed', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: createSpottingMutation,
        variables: {
          input: {
            userIdentifier: user.identifier,
            animalId: animals[0].id,
            latitude: -24,
            longitude: 31,
            description: null,
            visibility: 3,
            traffic: 3
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        createSpotting: expect.objectContaining({
          id: expect.any(String),
          animal: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String)
          }),
          latitude: expect.any(Number),
          longitude: expect.any(Number),
          visibility: expect.any(Number),
          traffic: expect.any(Number),
          createdAt: expect.any(String)
        })
      });
    });

    it('should succeed, custom createdAt date', async () => {
      const date = faker.date.past();
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: createSpottingMutation,
        variables: {
          input: {
            userIdentifier: user.identifier,
            animalId: animals[0].id,
            latitude: -24,
            longitude: 31,
            description: null,
            visibility: 3,
            traffic: 3,
            createdAt: date
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        createSpotting: expect.objectContaining({
          id: expect.any(String),
          animal: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String)
          }),
          latitude: expect.any(Number),
          longitude: expect.any(Number),
          visibility: expect.any(Number),
          traffic: expect.any(Number),
          createdAt: date.toISOString()
        })
      });
    });

    each([-28, -27, -26.1, -21.9, -21, -20]).it('should fail, invalid latitude: %s', async (latitude: number) => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: createSpottingMutation,
        variables: {
          input: {
            userIdentifier: user.identifier,
            animalId: animals[0].id,
            latitude,
            longitude: -31,
            description: null,
            visibility: 3,
            traffic: 3
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(expect.objectContaining(null));
      expect(body.errors).toStrictEqual(badUserInputObject);
    });

    each([28, 29, 29.9, 32.1, 33, 34]).it('should fail, invalid longitude: %s', async (longitude: number) => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: createSpottingMutation,
        variables: {
          input: {
            userIdentifier: user.identifier,
            animalId: animals[0].id,
            latitude: -24,
            longitude,
            description: null,
            visibility: 3,
            traffic: 3
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(expect.objectContaining(null));
      expect(body.errors).toStrictEqual(badUserInputObject);
    });

    it('should fail, invalid description length', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({
        query: createSpottingMutation,
        variables: {
          input: {
            userIdentifier: user.identifier,
            animalId: animals[0].id,
            latitude: -24,
            longitude: 31,
            description: 'a'.repeat(validationConstants.maxDescriptionLength + 1),
            visibility: 3,
            traffic: 3
          }
        }
      });

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(expect.objectContaining(null));
      expect(body.errors).toStrictEqual(badUserInputObject);
    });
  });
});
