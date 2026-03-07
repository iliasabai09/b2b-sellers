import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductSpecDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  specId!: number;

  @ApiProperty({ example: 'Apple' })
  @IsString()
  value!: string;
}

export class CreateOfferDto {
  @ApiProperty({ example: 500000 })
  @IsInt()
  price!: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  stock?: number;
}

export class CreateVariantOptionValueDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  optionId!: number;

  @ApiProperty({ example: 'Красный' })
  @IsString()
  value!: string;
}

export class CreateProductVariantDto {
  @ApiProperty({
    type: [CreateVariantOptionValueDto],
    example: [
      { optionId: 1, value: 'Красный' },
      { optionId: 2, value: '128 GB' },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantOptionValueDto)
  optionValues!: CreateVariantOptionValueDto[];

  @ApiProperty({
    type: CreateOfferDto,
    example: {
      price: 500000,
      stock: 10,
    },
  })
  @ValidateNested()
  @Type(() => CreateOfferDto)
  offer!: CreateOfferDto;
}

export class CreateProductGroupWithOffersDto {
  @ApiProperty({ example: 'iPhone 15' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: ['image.png'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId!: number;

  @ApiPropertyOptional({ example: 'Смартфон Apple' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: [CreateProductSpecDto],
    example: [
      { specId: 1, value: 'Apple' },
      // { specId: 2, value: 'Смартфон' },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductSpecDto)
  specs?: CreateProductSpecDto[];

  @ApiProperty({
    type: [CreateProductVariantDto],
    example: [
      {
        optionValues: [
          { optionId: 1, value: 'Красный' },
          { optionId: 2, value: '128 GB' },
        ],
        offer: {
          price: 500000,
          stock: 10,
        },
      },
      {
        optionValues: [
          { optionId: 1, value: 'Синий' },
          { optionId: 2, value: '256 GB' },
        ],
        offer: {
          price: 540000,
          stock: 5,
        },
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants!: CreateProductVariantDto[];
}
