import { ApiProperty } from '@nestjs/swagger';
import { OptionType } from '@shared/enums/option.enum';

export class OptionResDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ enum: OptionType, example: OptionType.COLOR })
  type!: OptionType;

  @ApiProperty({ example: 'Цвет' })
  name!: string;
}
