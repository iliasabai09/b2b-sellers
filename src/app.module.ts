import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [PrismaModule, RegionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
