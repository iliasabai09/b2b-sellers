import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaService } from './prisma.service';
import { PG_POOL } from './prisma.constants';

@Global()
@Module({
  imports: [ConfigModule], // важно
  providers: [
    {
      provide: PG_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        if (!url) throw new Error('DATABASE_URL is not set');

        return new Pool({
          connectionString: url,
          ssl: { rejectUnauthorized: false },
        });
      },
    },
    PrismaService,
  ],
  exports: [PrismaService, PG_POOL],
})
export class PrismaModule {}
