import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '@modules/auth/enums/role.enum';

export class MyCompanyResDto {
  @ApiProperty({ example: 'TARGAN TVL' })
  name!: string;

  @ApiProperty({
    example: 'Алматы, ул. Абая 25',
    required: false,
    nullable: true,
  })
  address!: string | null;

  @ApiProperty({ enum: ROLE, example: ROLE.OWNER })
  role!: ROLE;

  @ApiProperty({ example: true })
  isActive!: boolean;
}
