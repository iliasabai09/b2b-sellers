// modules/company/dto/company-employee.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CompanyEmployeeDto {
  @ApiProperty({ example: 12 })
  userId!: number;

  @ApiProperty({ example: '+77009965396' })
  phone!: string;

  @ApiProperty({ example: 'Ильяс' })
  firstName!: string | null;

  @ApiProperty({ example: 'Абай' })
  lastName!: string | null;

  @ApiProperty({ example: 'OWNER', enum: ['OWNER', 'ADMIN', 'HELPER'] })
  role!: string;
}
