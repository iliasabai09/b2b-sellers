import { ApiProperty } from '@nestjs/swagger';

export class OtpVerifyResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc3MTY5NzEwMCwiZXhwIjoxNzcxNjk4MDAwfQ.WZKWbes5mbVv2HJ2m3Ttjm8Yfx7IKlJNSvViKYnZmSA',
  })
  accessToken!: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTc3MTY5ODQxMCwiZXhwIjoxNzc0MjkwNDEwfQ.tnE-4oeKzrbeCAE4gjMINBeWvv7x8Hm9eD8-wN9askM',
  })
  refreshToken!: string;
}
