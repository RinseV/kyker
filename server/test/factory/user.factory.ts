import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';

export abstract class UserFactory {
  public static async create(prisma: PrismaService, identifier?: string): Promise<User> {
    return prisma.user.create({
      data: {
        identifier: identifier || faker.random.alphaNumeric(20)
      }
    });
  }
}
