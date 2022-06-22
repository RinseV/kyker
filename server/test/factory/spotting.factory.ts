import { Spotting } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';

export abstract class SpottingFactory {
  public static async create(
    prisma: PrismaService,
    userIdentifier: string,
    animalId: string,
    createdAt?: Date
  ): Promise<Spotting> {
    return prisma.spotting.create({
      data: {
        user: {
          connect: {
            identifier: userIdentifier
          }
        },
        animal: {
          connect: {
            id: animalId
          }
        },
        latitude: parseFloat(faker.address.latitude(-22, -26)),
        longitude: parseFloat(faker.address.longitude(32, 30)),
        description: faker.lorem.sentence(),
        traffic: faker.datatype.number({ min: 1, max: 3 }),
        visibility: faker.datatype.number({ min: 1, max: 3 }),
        createdAt: createdAt || new Date()
      }
    });
  }
}
