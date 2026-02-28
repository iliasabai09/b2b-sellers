import { IsEnum, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '@modules/auth/enums/role.enum';

export class AddCompanyMemberDto {
  @ApiProperty({ example: '+77009965396' })
  @IsString()
  @Matches(/^(\+?7)?(7\d{9}|8\d{10})$/, { message: 'Invalid phone format' })
  phone!: string;

  @ApiProperty({ enum: ROLE, example: ROLE.VIEWER })
  @IsEnum(ROLE)
  role!: ROLE;
}
