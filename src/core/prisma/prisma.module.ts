import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PrismaService } from './prisma.service';
import { PG_POOL } from './prisma.constants';

@Global()
@Module({
  providers: [
    {
      provide: PG_POOL,
      useFactory: () => {
        const url = process.env.DATABASE_URL;
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
