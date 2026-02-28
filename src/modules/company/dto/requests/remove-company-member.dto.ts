import { IsInt } from 'class-validator';

export class RemoveCompanyMemberDto {
  @IsInt()
  userId!: number;
}
