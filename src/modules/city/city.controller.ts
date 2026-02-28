import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CityService } from '@modules/city/city.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FIND_ALL,
  FIND_ALL_RES,
} from '@modules/city/constants/swagger.constants';
import { CityDto } from '@modules/city/dto/City.dto';
import type { UserReq } from '@shared/types/req-user.type';
import { ROLE } from '@modules/auth/enums/role.enum';
import { AuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { Roles } from '@core/decorators/roles.decorator';

@ApiTags('Города')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation(FIND_ALL)
  @ApiResponse({ ...FIND_ALL_RES, type: CityDto })
  findAll() {
    return this.cityService.findAll();
  }

  @Get('testAuth')
  @Roles(ROLE.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  test(@Req() req: UserReq) {
    console.log('req', req.user);
    return 'hajsdajklhflghsdajlfhjgldasgfikj';
  }
}
