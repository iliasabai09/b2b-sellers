import { ApiProperty } from '@nestjs/swagger';
import { RegionDto } from '@modules/regions/dto/Region.dto';

export class RegionWithCityDto extends RegionDto {
  @ApiProperty({ example: [{ id: 1, name: 'Алматы' }] })
  cities: { id: number; name: string }[];
}
