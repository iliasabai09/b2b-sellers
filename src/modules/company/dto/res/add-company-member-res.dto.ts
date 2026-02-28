import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '@modules/auth/enums/role.enum';

export class AddCompanyMemberResDto {
  @ApiProperty({ example: 15 })
  id!: number;

  @ApiProperty({ example: 3 })
  userId!: number;

  @ApiProperty({ example: 1 })
  companyId!: number;

  @ApiProperty({ example: '+77009965396' })
  phone!: string;

  @ApiProperty({ enum: ROLE, example: ROLE.VIEWER })
  role!: ROLE;
}
