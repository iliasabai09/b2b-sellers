import { Module } from '@nestjs/common';
import { FileService } from '@core/modules/file/file.service';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class FilesModule {}
