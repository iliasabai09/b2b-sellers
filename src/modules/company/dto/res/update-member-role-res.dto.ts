import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ROLE } from '@modules/auth/enums/role.enum';

export class UpdateMemberRoleResDto {
  @ApiProperty({
    example: ROLE.ADMIN,
    enum: ROLE,
    description: 'Новая роль участника компании',
  })
  @IsEnum(ROLE)
  role!: ROLE;
}
