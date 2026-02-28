import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@core/modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule, // важно
    RedisModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
