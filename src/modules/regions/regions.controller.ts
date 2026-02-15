import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import {
  FIND_ALL,
  FIND_ALL_RES,
  FIND_ALL_WITH_CITIES,
  FIND_ALL_WITH_CITIES_RES,
} from './constants/swagger.constants';
import { RegionDto } from './dto/Region.dto';
import { RegionWithCityDto } from '@modules/regions/dto/RegionWithCity.dto';

@ApiTags('Регионы')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  @ApiOperation(FIND_ALL)
  @ApiResponse({ ...FIND_ALL_RES, type: RegionDto })
  findAll() {
    return this.regionsService.findAll();
  }

  @Get('with-cities')
  @ApiOperation(FIND_ALL_WITH_CITIES)
  @ApiResponse({ ...FIND_ALL_WITH_CITIES_RES, type: RegionWithCityDto })
  findAllWithCities() {
    return this.regionsService.findAllWithCities();
  }
}
