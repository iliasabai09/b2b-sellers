import { Controller, Get } from '@nestjs/common';
import { OptionService } from '@modules/option/option.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  GET_OPTIONS,
  GET_OPTIONS_RES,
} from '@modules/option/constants/swagger.constants';
import { OptionResDto } from '@modules/option/dto/res/option-res.dto';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Get()
  @ApiOperation(GET_OPTIONS)
  @ApiResponse({ ...GET_OPTIONS_RES, type: [OptionResDto] })
  getOptions() {
    return this.optionService.getOptions();
  }
}
