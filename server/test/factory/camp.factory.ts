import { faker } from '@faker-js/faker';
import { Camp, CampSize } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';

export abstract class CampFactory {
  public static async create(prisma: PrismaService): Promise<Camp> {
    return prisma.camp.create({
      data: {
        name: faker.lorem.word(),
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
        size: CampSize.REST
      }
    });
  }
}
