import { ApiProperty } from '@nestjs/swagger';

export class RemoveCompanyMemberResDto {
  @ApiProperty({ example: true })
  success!: boolean;
}
