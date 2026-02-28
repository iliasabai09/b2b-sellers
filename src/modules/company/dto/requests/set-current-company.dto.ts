import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetCurrentCompanyDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  companyId!: number;
}
