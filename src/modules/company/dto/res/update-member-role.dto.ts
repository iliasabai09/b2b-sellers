// modules/company-members/dto/update-member-role.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { ROLE } from '@modules/auth/enums/role.enum';

export class UpdateMemberRoleDto {
  @ApiProperty({
    example: 12,
    description: 'ID пользователя, которому изменяется роль',
  })
  @IsInt()
  userId!: number;

  @ApiProperty({
    example: ROLE.ADMIN,
    enum: ROLE,
    description: 'Новая роль участника компании',
  })
  @IsEnum(ROLE)
  role!: ROLE;
}
