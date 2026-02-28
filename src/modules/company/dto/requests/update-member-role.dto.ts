import { IsEnum, IsInt } from 'class-validator';
import { ROLE } from '@modules/auth/enums/role.enum';

export class UpdateMemberRoleDto {
  @IsInt()
  userId!: number; // кому меняем роль

  @IsEnum(ROLE)
  role!: ROLE; // на какую роль
}
