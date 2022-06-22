import { Module } from '@nestjs/common';
import { AnimalModule } from '../animal/animal.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { SpottingService } from './spotting.service';
import { SpottingResolver } from './spotting.resolver';

@Module({
  imports: [PrismaModule, UserModule, AnimalModule],
  providers: [SpottingService, SpottingResolver]
})
export class SpottingModule {}
