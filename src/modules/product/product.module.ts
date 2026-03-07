import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from '@modules/product/product.controller';
import { FilesModule } from '@core/modules/file/files.module';

@Module({
  imports: [FilesModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
