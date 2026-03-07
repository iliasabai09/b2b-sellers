import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadProductImageResDto } from '@modules/product/to/dto/res/upload-product-image-res.dto';
import { UPLOAD_PRODUCT_IMAGE_SCHEMA } from '@modules/product/to/dto/schema/swagger.schema';
import { UploadProductImageDto } from '@modules/product/to/dto/request/upload-product-image.dto';
import { ProductService } from '@modules/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @Post('image')
  @ApiOperation({ summary: 'Загрузка изображения товара' })
  @ApiResponse({
    status: 200,
    description: 'Изображение успешно загружено',
    type: UploadProductImageResDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody(UPLOAD_PRODUCT_IMAGE_SCHEMA)
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadProductImageDto,
  ) {
    return this.productService.uploadProductImage(file, dto.oldUrl);
  }
}
