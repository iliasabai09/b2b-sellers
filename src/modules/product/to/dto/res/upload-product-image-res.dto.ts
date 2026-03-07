import { ApiProperty } from '@nestjs/swagger';

export class UploadProductImageResDto {
  @ApiProperty({
    example: '/uploads/products/product-image-123.png',
  })
  url!: string;
}
