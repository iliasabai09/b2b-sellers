import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@core/guards/jwt-auth.guard';
import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_RES,
  UPDATE_ME,
  UPDATE_ME_RES,
} from '@modules/user/constants/swagger.constants';
import { type UserReq } from '@shared/types/req-user.type';
import { UserService } from '@modules/user/user.service';
import { CurrentUserResDto } from '@modules/user/dto/res/current-user.res.dto';
import { UserResDto } from '@modules/user/dto/res/user.res.dto';
import { UpdateUserDto } from '@modules/user/dto/requests/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UPDATE_USER_SCHEMA } from '@modules/user/dto/schema/update-user.schema';

@Controller('user')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation(GET_CURRENT_USER)
  @ApiResponse({ ...GET_CURRENT_USER_RES, type: CurrentUserResDto })
  getMe(@Req() req: UserReq) {
    const { sub } = req.user;
    return this.userService.getCurrentUser(sub);
  }

  @Patch('me')
  @ApiOperation(UPDATE_ME)
  @ApiResponse({ ...UPDATE_ME_RES, type: UserResDto })
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody(UPDATE_USER_SCHEMA)
  updateMe(
    @Req() req: UserReq,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.userService.updateMe(req.user.sub, dto, file);
  }
}
