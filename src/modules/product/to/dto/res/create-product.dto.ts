import { ApiProperty } from '@nestjs/swagger';

export class CreateProductWithOfferResDto {
  @ApiProperty({ example: 101 })
  productId!: number;

  @ApiProperty({ example: 205 })
  offerId!: number;
}
