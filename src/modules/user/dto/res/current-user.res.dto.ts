import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@modules/user/enums/user.enum';

export class CurrentUserResDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '+77009965396' })
  phone!: string;

  @ApiPropertyOptional({ example: 'Ilyas' })
  firstName?: string;

  @ApiPropertyOptional({ example: 'Abai' })
  lastName?: string;

  @ApiPropertyOptional({ example: 'Serikuly' })
  middleName?: string;

  @ApiPropertyOptional({ example: '2003-05-15T00:00:00.000Z' })
  birthDate?: Date;

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE })
  gender?: Gender;

  @ApiPropertyOptional({ example: 'https://cdn.site.com/photo.jpg' })
  photoUrl?: string;

  @ApiPropertyOptional({ example: 'Frontend developer' })
  about?: string;

  @ApiPropertyOptional({ example: '@ilyas_dev' })
  telegram?: string;

  @ApiPropertyOptional({ example: '+77001234567' })
  whatsapp?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/ilyas' })
  instagram?: string;

  @ApiPropertyOptional({ example: 'https://tiktok.com/@ilyas' })
  tiktok?: string;
}
