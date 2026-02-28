import { ApiProperty } from '@nestjs/swagger';

export class CurrentCompanyResDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'TARGAN TVL' })
  name!: string;

  @ApiProperty({ example: '+77009965396', nullable: true })
  phone!: string | null;

  @ApiProperty({
    example: 'https://cdn.domain.kz/logo.png',
    nullable: true,
  })
  logoUrl!: string | null;

  @ApiProperty({
    example: 'г. Алматы, ул. Абая 150',
    nullable: true,
  })
  address!: string | null;

  @ApiProperty({ example: '@targan_official', nullable: true })
  telegram!: string | null;

  @ApiProperty({ example: '+77001234567', nullable: true })
  whatsapp!: string | null;

  @ApiProperty({ example: 'targan_kz', nullable: true })
  instagram!: string | null;

  @ApiProperty({ example: 'targan_store', nullable: true })
  tiktok!: string | null;

  @ApiProperty({
    example: 'Пн-Пт 09:00-18:00',
    nullable: true,
  })
  workTime!: string | null;

  @ApiProperty({
    example: '43.238949',
    nullable: true,
    type: String,
  })
  lat!: string | null;

  @ApiProperty({
    example: '76.889709',
    nullable: true,
    type: String,
  })
  lng!: string | null;
}
