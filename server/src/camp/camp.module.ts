import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CampResolver } from './camp.resolver';
import { CampService } from './camp.service';

@Module({
  imports: [PrismaModule],
  providers: [CampResolver, CampService]
})
export class CampModule {}
