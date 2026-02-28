import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@core/prisma/prisma.module';
import { RegionsModule } from '@modules/regions/regions.module';
import { CityModule } from '@modules/city/city.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppJwtModule } from '@core/modules/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RegionsModule,
    CityModule,
    AuthModule,
    AppJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
