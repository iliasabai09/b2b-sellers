import { ApiProperty } from '@nestjs/swagger';

export class RegionDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Алматинская область' })
  name: string;
}
