import { Injectable } from '@nestjs/common';
import { Animal, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

interface FindOneArgs {
  id: string;
  allowDisabled?: boolean;
}

@Injectable()
export class AnimalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Animal[]> {
    return this.prisma.animal.findMany({});
  }

  async findOne({ id, allowDisabled }: FindOneArgs): Promise<Animal | null> {
    const where: Prisma.AnimalWhereInput = {
      id,
      disabled: allowDisabled ? undefined : false
    };
    return this.prisma.animal.findFirst({ where });
  }
}
