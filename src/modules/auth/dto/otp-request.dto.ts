import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpRequestDto {
  @ApiProperty({ example: '+77009965396' })
  @IsString()
  @Matches(/^(\+?7)?(7\d{9}|8\d{10})$/, { message: 'Invalid phone format' })
  phone!: string;
}
