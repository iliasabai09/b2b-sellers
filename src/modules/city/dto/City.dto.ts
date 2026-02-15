import { ApiProperty } from '@nestjs/swagger';

export class CityDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Алматы' })
  name: string;

  @ApiProperty({ example: 1 })
  regionId: number;
}
