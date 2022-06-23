import { INestApplication } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

const gql = '/graphql';

const animalsQuery = `query Animals {
  animals {
    id
    name
    disabled
    lightColor
    darkColor
  }
}`;

describe('Animal (e2e)', () => {
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
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('animals', () => {
    it('should succeed', async () => {
      const appRequest = request(app.getHttpServer());
      const { status, body } = await appRequest.post(gql).send({ query: animalsQuery });

      expect(status).toBe(200);
      expect(body.data).toEqual({
        animals: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            disabled: expect.any(Boolean),
            lightColor: expect.any(String),
            darkColor: expect.any(String)
          })
        ])
      });
    });
  });
});
