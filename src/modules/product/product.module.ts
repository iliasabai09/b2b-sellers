import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from '@modules/product/product.controller';
import { FilesModule } from '@core/modules/file/files.module';
import { S3FileModule } from '@core/modules/s3-file/s3-file.module';

@Module({
  imports: [FilesModule, S3FileModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
