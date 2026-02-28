import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyResDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'TARGAN TVL Updated' })
  name!: string;

  @ApiProperty({ example: 'APPROVED' })
  status!: string;

  @ApiPropertyOptional({
    example: 'https://example.com/new-logo.png',
  })
  logoUrl?: string;

  @ApiPropertyOptional({
    example: 'г. Алматы, ул. Назарбаева 25',
  })
  address?: string;

  @ApiPropertyOptional({
    example: '+77001234567',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: '@targan_support',
  })
  telegram?: string;

  @ApiPropertyOptional({
    example: '+77001234567',
  })
  whatsapp?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com/targan_updated',
  })
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://tiktok.com/@targan_updated',
  })
  tiktok?: string;

  @ApiPropertyOptional({
    example: 'Пн-Сб 10:00-20:00',
  })
  workTime?: string;

  @ApiPropertyOptional({ example: 2 })
  cityId?: number;

  @ApiPropertyOptional({
    example: '43.256670',
  })
  lat?: string;

  @ApiPropertyOptional({
    example: '76.928610',
  })
  lng?: string;

  @ApiProperty({ example: '2026-02-28T18:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-02-28T19:10:00.000Z' })
  updatedAt!: Date;
}
