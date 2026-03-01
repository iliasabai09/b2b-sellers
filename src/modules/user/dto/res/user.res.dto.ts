// modules/user/dto/user.res.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@modules/user/enums/user.enum';

export class UserResDto {
  @ApiProperty({ example: 12 })
  id!: number;

  @ApiProperty({ example: '+77009965396' })
  phone!: string;

  @ApiPropertyOptional({ example: 'Ильяс' })
  firstName?: string | null;

  @ApiPropertyOptional({ example: 'Абай' })
  lastName?: string | null;

  @ApiPropertyOptional({ example: 'Серикович' })
  middleName?: string | null;

  @ApiPropertyOptional({ example: '2002-07-09T00:00:00.000Z' })
  birthDate?: string | null;

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE })
  gender?: Gender | null;

  @ApiPropertyOptional({ example: 'https://cdn.site.com/u/123.png' })
  photoUrl?: string | null;

  @ApiPropertyOptional({ example: 'Занимаюсь поставками и разработкой' })
  about?: string | null;

  @ApiPropertyOptional({ example: '@ilyas_tg' })
  telegram?: string | null;

  @ApiPropertyOptional({ example: '+77001234567' })
  whatsapp?: string | null;

  @ApiPropertyOptional({ example: 'https://instagram.com/ilyas' })
  instagram?: string | null;

  @ApiPropertyOptional({ example: 'https://tiktok.com/@ilyas' })
  tiktok?: string | null;
}
