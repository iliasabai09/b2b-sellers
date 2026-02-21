import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpVerifyDto {
  @ApiProperty({ example: '+77009965396' })
  @IsString()
  @Matches(/^(\+?7)?(7\d{9}|8\d{10})$/, { message: 'Invalid phone format' })
  phone!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Matches(/^\d{6}$/, { message: 'OTP must be 6 digits' })
  code!: string;
}
