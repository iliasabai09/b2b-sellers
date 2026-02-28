import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CityService } from '@modules/city/city.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FIND_ALL,
  FIND_ALL_RES,
} from '@modules/city/constants/swagger.constants';
import { CityDto } from '@modules/city/dto/City.dto';

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
}
