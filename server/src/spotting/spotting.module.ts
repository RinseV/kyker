import { Module } from '@nestjs/common';
import { AnimalModule } from '../animal/animal.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { SpottingService } from './spotting.service';
import { SpottingResolver } from './spotting.resolver';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [PrismaModule, UserModule, AnimalModule, CommonModule],
  providers: [SpottingService, SpottingResolver]
})
export class SpottingModule {}
