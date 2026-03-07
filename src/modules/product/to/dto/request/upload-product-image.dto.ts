import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadProductImageDto {
  @ApiPropertyOptional({
    example: '/uploads/products/old-image.png',
    description: 'Старая ссылка на изображение, если нужно заменить файл',
  })
  @IsOptional()
  @IsString()
  oldUrl?: string;
}
