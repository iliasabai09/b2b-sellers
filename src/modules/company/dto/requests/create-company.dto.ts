// modules/company/dto/create-company.dto.ts
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'TARGAN TVL' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional({
    example: 'г. Алматы, ул. Абая 150',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: '+77009965396',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: '@targan_tvl',
  })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiPropertyOptional({
    example: '+77009965396',
  })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com/targan_tvl',
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://tiktok.com/@targan_tvl',
  })
  @IsOptional()
  @IsString()
  tiktok?: string;

  @ApiPropertyOptional({
    example: 'Пн-Пт 09:00-18:00',
  })
  @IsOptional()
  @IsString()
  workTime?: string;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @IsInt()
  cityId?: number;

  @ApiPropertyOptional({
    example: '43.238949',
    description: 'Широта (Decimal строкой)',
  })
  @IsOptional()
  @IsString()
  lat?: string;

  @ApiPropertyOptional({
    example: '76.889709',
    description: 'Долгота (Decimal строкой)',
  })
  @IsOptional()
  @IsString()
  lng?: string;
}
