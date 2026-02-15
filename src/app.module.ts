import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@core/prisma/prisma.module';
import { RegionsModule } from '@modules/regions/regions.module';
import { CityModule } from './modules/city/city.module';

@Module({
  imports: [PrismaModule, RegionsModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
