// modules/user/dto/update-user.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Gender } from '@modules/user/enums/user.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Ильяс' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Абай' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'Серикович' })
  @IsOptional()
  @IsString()
  middleName?: string;

  // проще принимать строкой ISO (Swagger норм показывает)
  @ApiPropertyOptional({ example: '2002-07-09' })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ example: 'https://cdn.site.com/u/123.png' })
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @ApiPropertyOptional({ example: 'Занимаюсь поставками и разработкой' })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiPropertyOptional({ example: '@ilyas_tg' })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiPropertyOptional({ example: '+77001234567' })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/ilyas' })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({ example: 'https://tiktok.com/@ilyas' })
  @IsOptional()
  @IsString()
  tiktok?: string;
}
