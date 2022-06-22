import { Module } from '@nestjs/common';
import { GateService } from './gate.service';
import { GateResolver } from './gate.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GateResolver, GateService]
})
export class GateModule {}
