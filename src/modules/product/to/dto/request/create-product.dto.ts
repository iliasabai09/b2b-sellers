import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductSpecDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  specId!: number;

  @ApiProperty({ example: 'Xiaomi' })
  @IsString()
  value!: string;
}

export class CreateProductOptionValueDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  optionId!: number;

  @ApiProperty({ example: 'Серый' })
  @IsString()
  value!: string;
}

export class CreateOfferDto {
  @ApiProperty({ example: 2500 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ example: 'шт' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateProductWithOfferDto {
  @ApiProperty({ example: 'Контейнер для круп' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Описание товара' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ example: 'container-dlya-krup' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'group-123' })
  @IsOptional()
  @IsString()
  groupId?: string;

  @ApiPropertyOptional({ example: ['image.png'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos: string[];

  @ApiPropertyOptional({ type: [CreateProductSpecDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductSpecDto)
  specs: CreateProductSpecDto[];

  @ApiPropertyOptional({ type: [CreateProductOptionValueDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionValueDto)
  optionValues?: CreateProductOptionValueDto[];

  @ApiProperty({ type: CreateOfferDto })
  @ValidateNested()
  @Type(() => CreateOfferDto)
  offer!: CreateOfferDto;
}
