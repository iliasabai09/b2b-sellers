import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiPropertyOptional({ example: 'TARGAN TVL Updated' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/new-logo.png',
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional({
    example: 'г. Алматы, ул. Назарбаева 25',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: '+77001234567',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: '@targan_support',
  })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiPropertyOptional({
    example: '+77001234567',
  })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com/targan_updated',
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://tiktok.com/@targan_updated',
  })
  @IsOptional()
  @IsString()
  tiktok?: string;

  @ApiPropertyOptional({
    example: 'Пн-Сб 10:00-20:00',
  })
  @IsOptional()
  @IsString()
  workTime?: string;

  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @IsInt()
  cityId?: number;

  @ApiPropertyOptional({
    example: '43.256670',
    description: 'Широта (Decimal строкой)',
  })
  @IsOptional()
  @IsString()
  lat?: string;

  @ApiPropertyOptional({
    example: '76.928610',
    description: 'Долгота (Decimal строкой)',
  })
  @IsOptional()
  @IsString()
  lng?: string;
}
