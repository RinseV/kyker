import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { AnimalModule } from './animal/animal.module';
import { CampModule } from './camp/camp.module';
import { CommonModule } from './common/common.module';
import { GqlThrottlerGuard } from './common/decorators/throttle-gql.decorator';
import configuration from './config/configuration';
import { GateModule } from './gate/gate.module';
import { PrismaModule } from './prisma/prisma.module';
import { SpottingModule } from './spotting/spotting.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    CommonModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ request, reply }) => ({ request, reply }),
      cors: {
        origin: process.env.CORS_ORIGIN
      }
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60
    }),
    AnimalModule,
    CampModule,
    GateModule,
    SpottingModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard
    }
  ]
})
export class AppModule {}
