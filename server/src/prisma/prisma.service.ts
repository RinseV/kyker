import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [{ emit: 'event', level: 'query' }]
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('query' as any, async (e: any) => {
      this.logger.debug(`(${e.duration}ms) ${e.query}`);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async truncate() {
    const records = await this.$queryRawUnsafe<Array<any>>(`SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'`);
    records.forEach((record) => this.truncateTable(record['tablename']));
  }

  async truncateTable(tablename: string) {
    if (tablename === undefined || tablename === '_prisma_migrations') {
      return;
    }
    try {
      await this.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
    } catch (error) {
      console.log({ error });
    }
  }
}
