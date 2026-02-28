import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS } from '@core/modules/redis/constants/redis.constants';
import { RedisService } from '@core/modules/redis/redis.service';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: REDIS,
      useFactory: () => {
        const url = process.env.REDIS_URL;
        if (!url) throw new Error('REDIS_URL is not set');

        // Если будут проблемы с public proxy — можно добавить lazyConnect / connectTimeout
        return new Redis(url, {
          maxRetriesPerRequest: null,
          enableReadyCheck: true,
        });
      },
    },
  ],
  exports: [REDIS, RedisService],
})
export class RedisModule {}
