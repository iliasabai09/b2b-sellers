import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyResDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'TARGAN TVL' })
  name!: string;

  @ApiProperty({ example: 'PENDING' })
  status!: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
  })
  logoUrl?: string;

  @ApiPropertyOptional({
    example: 'г. Алматы, ул. Абая 150',
  })
  address?: string;

  @ApiPropertyOptional({
    example: '+77009965396',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: '@targan_tvl',
  })
  telegram?: string;

  @ApiPropertyOptional({
    example: '+77009965396',
  })
  whatsapp?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com/targan_tvl',
  })
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://tiktok.com/@targan_tvl',
  })
  tiktok?: string;

  @ApiPropertyOptional({
    example: 'Пн-Пт 09:00-18:00',
  })
  workTime?: string;

  @ApiPropertyOptional({ example: 1 })
  cityId?: number;

  @ApiPropertyOptional({
    example: '43.238949',
    description: 'Широта',
  })
  lat?: string;

  @ApiPropertyOptional({
    example: '76.889709',
    description: 'Долгота',
  })
  lng?: string;

  @ApiProperty({ example: '2026-02-28T18:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-02-28T18:00:00.000Z' })
  updatedAt!: Date;
}
