import { faker } from '@faker-js/faker';
import { Animal } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';

export abstract class AnimalFactory {
  public static async create(prisma: PrismaService): Promise<Animal> {
    return prisma.animal.create({
      data: {
        name: faker.lorem.word(),
        disabled: false,
        lightColor: `#${faker.random.alphaNumeric(6)}`,
        darkColor: `#${faker.random.alphaNumeric(6)}`
      }
    });
  }
}
