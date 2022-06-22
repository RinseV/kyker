import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AnimalResolver } from './animal.resolver';
import { AnimalService } from './animal.service';

@Module({
  imports: [PrismaModule],
  providers: [AnimalResolver, AnimalService],
  exports: [AnimalService]
})
export class AnimalModule {}
