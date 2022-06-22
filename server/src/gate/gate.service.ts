import { Injectable } from '@nestjs/common';
import { Gate } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GateService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Gate[]> {
    return this.prisma.gate.findMany({});
  }
}
