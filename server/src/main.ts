import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const configService = app.get<ConfigService>(ConfigService);

  const prismaService = app.get<PrismaService>(PrismaService);
  prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('port'), '0.0.0.0');
  Logger.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
