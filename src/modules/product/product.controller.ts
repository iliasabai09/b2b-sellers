import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadProductImageResDto } from '@modules/product/to/dto/res/upload-product-image-res.dto';
import { UPLOAD_PRODUCT_IMAGE_SCHEMA } from '@modules/product/to/dto/schema/swagger.schema';
import { UploadProductImageDto } from '@modules/product/to/dto/request/upload-product-image.dto';
import { ProductService } from '@modules/product/product.service';
import { AuthGuard } from '@core/guards/jwt-auth.guard';
import { type UserReq } from '@shared/types/req-user.type';
import { CreateProductWithOfferDto } from '@modules/product/to/dto/request/create-product.dto';
import { CreateProductGroupWithOffersDto } from '@modules/product/to/dto/request/create-product-group.dto';

@Controller('product')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
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

  @Post('with-offer')
  createProductWithOffer(
    @Req() req: UserReq,
    @Body() dto: CreateProductWithOfferDto,
  ) {
    return this.productService.createProductWithOffer(req, dto);
  }

  @Post('group-with-offer')
  createProductGroupWithOffer(
    @Req() req: UserReq,
    @Body() dto: CreateProductGroupWithOffersDto,
  ) {
    return this.productService.createProductGroupWithOffers(req, dto);
  }

  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @Get('supplier')
  getProductsBySupplier(
    @Req() req: UserReq,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: number,
  ) {
    return this.productService.getProductsBySupplier(
      req.user.companyId,
      categoryId,
      search,
    );
  }
}
