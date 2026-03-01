import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@core/guards/jwt-auth.guard';
import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_RES,
} from '@modules/user/constants/swagger.constants';
import { type UserReq } from '@shared/types/req-user.type';
import { UserService } from '@modules/user/user.service';
import { CurrentUserResDto } from '@modules/user/dto/res/current-user.res.dto';

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
}
