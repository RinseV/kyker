import { Injectable } from '@nestjs/common';
import { Camp } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CampService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Camp[]> {
    return this.prisma.camp.findMany({});
  }
}
