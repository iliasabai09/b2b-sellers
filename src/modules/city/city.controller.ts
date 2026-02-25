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
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { ROLE } from '@modules/auth/enums/role.enum';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import type { UserReq } from '@shared/types/req-user.type';

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
  @UseGuards(RolesGuard)
  test(@Req() req: UserReq) {
    console.log('req', req.user);
    return 'hajsdajklhflghsdajlfhjgldasgfikj';
  }
}
