import { INestApplication } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { GateFactory } from './factory/gate.factory';

const gql = '/graphql';

const gatesQuery = `query Gates {
  gates {
    id
    name
    latitude
    longitude
  }
}`;

describe('Gate (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useLogger(null);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    await GateFactory.create(prisma);
    await GateFactory.create(prisma);
  });

  afterAll(async () => {
    await prisma.truncate();
    await prisma.$disconnect();
    await app.close();
  });

  describe('gates', () => {
    it('should succeed', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({ query: gatesQuery });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        gates: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            latitude: expect.any(Number),
            longitude: expect.any(Number)
          })
        ])
      });
    });
  });
});
