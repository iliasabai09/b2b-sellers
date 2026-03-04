import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryResDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Смартфоны' })
  name!: string;

  @ApiProperty({ example: 'smartfony' })
  slug!: string;

  @ApiProperty({ example: 1 })
  level!: number;

  @ApiPropertyOptional({ example: null })
  parentId?: number | null;

  @ApiPropertyOptional({ example: null })
  iconUrl?: string | null;

  @ApiPropertyOptional({ example: null })
  imageUrl?: string | null;

  @ApiProperty({ example: 0 })
  sort!: number;

  @ApiPropertyOptional({
    type: () => CategoryResDto,
    isArray: true,
    example: [],
  })
  children?: CategoryResDto[];
}
