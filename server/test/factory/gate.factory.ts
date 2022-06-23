import { faker } from '@faker-js/faker';
import { Gate } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';

export abstract class GateFactory {
  public static async create(prisma: PrismaService): Promise<Gate> {
    return prisma.gate.create({
      data: {
        name: faker.lorem.word(),
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude())
      }
    });
  }
}
