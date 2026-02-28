import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@core/guards/jwt-auth.guard';
import { CompanyService } from '@modules/company/company.service';
import { CreateCompanyDto } from '@modules/company/dto/requests/create-company.dto';
import { type UserReq } from '@shared/types/req-user.type';
import {
  ADD_MEMBER,
  ADD_MEMBER_RES,
  CREATE_COMPANY,
  CREATE_COMPANY_RES,
  GET_MY_COMPANIES,
  GET_MY_COMPANIES_RES,
  REMOVE_MEMBER,
  REMOVE_MEMBER_RES,
  UPDATE_COMPANY,
  UPDATE_COMPANY_RES,
} from '@modules/company/constants/swagger.constants';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@modules/auth/enums/role.enum';
import { RolesGuard } from '@core/guards/roles.guard';
import { UpdateCompanyDto } from '@modules/company/dto/requests/update-company.dto';
import { CreateCompanyResDto } from '@modules/company/dto/res/create-company-res.dto';
import { UpdateCompanyResDto } from '@modules/company/dto/res/update-company-res.dto';
import { AddCompanyMemberDto } from '@modules/company/dto/requests/add-company-member.dto';
import { AddCompanyMemberResDto } from '@modules/company/dto/res/add-company-member-res.dto';
import { MyCompanyResDto } from '@modules/company/dto/res/my-companies-res.dto';
import { RemoveCompanyMemberResDto } from '@modules/company/dto/res/remove-company-member-res.dto';

@Controller('company')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  @ApiOperation(CREATE_COMPANY)
  @ApiResponse({ ...CREATE_COMPANY_RES, type: CreateCompanyResDto })
  @ApiBody({ type: CreateCompanyDto })
  createCompany(@Body() dto: CreateCompanyDto, @Req() req: UserReq) {
    return this.companyService.createCompany(req.user.sub, dto);
  }

  @Put('update')
  @ApiOperation(UPDATE_COMPANY)
  @ApiResponse({ ...UPDATE_COMPANY_RES, type: UpdateCompanyResDto })
  @Roles(ROLE.OWNER)
  @UseGuards(RolesGuard)
  updateCompany(@Body() dto: UpdateCompanyDto, @Req() req: UserReq) {
    return this.companyService.updateCompany(+req.user.companyId, dto);
  }

  @Post('add-member')
  @ApiOperation(ADD_MEMBER)
  @ApiResponse({ ...ADD_MEMBER_RES, type: AddCompanyMemberResDto })
  @UseGuards(RolesGuard)
  @Roles(ROLE.OWNER)
  addMember(@Req() { user }: UserReq, @Body() dto: AddCompanyMemberDto) {
    return this.companyService.addMember(user, dto);
  }

  @Get('my-companies')
  @ApiOperation(GET_MY_COMPANIES)
  @ApiResponse({ ...GET_MY_COMPANIES_RES, type: [MyCompanyResDto] })
  getMyCompanies(@Req() req: UserReq) {
    const { sub, companyId } = req.user;
    return this.companyService.getMyCompanies(sub, companyId);
  }

  @UseGuards(RolesGuard)
  @ApiOperation(REMOVE_MEMBER)
  @ApiResponse({ ...REMOVE_MEMBER_RES, type: RemoveCompanyMemberResDto })
  @Roles(ROLE.OWNER)
  @Delete('members/:userId')
  removeMember(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: UserReq,
  ) {
    const { sub, companyId } = req.user;
    return this.companyService.removeMember(sub, companyId, userId);
  }
}
