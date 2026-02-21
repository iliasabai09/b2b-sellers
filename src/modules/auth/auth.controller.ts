import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpRequestDto } from './dto/otp-request.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  REQUEST_OTP,
  REQUEST_OTP_RES,
  VERIFY_OTP,
  VERIFY_OTP_RES,
} from '@modules/auth/constants/swagger.constants';
import { OtpVerifyResponseDto } from '@modules/auth/dto/response/otp-verify.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('request')
  @ApiOperation(REQUEST_OTP)
  @ApiResponse({ ...REQUEST_OTP_RES })
  @ApiBody({ type: OtpRequestDto })
  request(@Body() dto: OtpRequestDto) {
    return this.auth.requestOtp(dto);
  }

  @Post('verify')
  @ApiOperation(VERIFY_OTP)
  @ApiBody({ type: OtpVerifyDto })
  @ApiResponse({ ...VERIFY_OTP_RES, type: OtpVerifyResponseDto })
  verify(@Body() dto: OtpVerifyDto) {
    return this.auth.verifyOtp(dto);
  }
}
