import { Module } from '@nestjs/common';
import { S3FileService } from './s3-file.service';

@Module({
  providers: [S3FileService],
  exports: [S3FileService],
})
export class S3FileModule {}
