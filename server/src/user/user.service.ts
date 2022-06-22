import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

interface FindOneArgs {
  identifier: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreate({ identifier }: FindOneArgs): Promise<User> {
    const user = await this.findOne({ identifier });
    if (user) {
      return user;
    }
    return this.create({ identifier });
  }

  async create({ identifier }: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        identifier
      }
    });
  }

  async findOne({ identifier }: FindOneArgs): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { identifier } });
    return user;
  }
}
