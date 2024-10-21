import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('login')
  loginUser(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    return this.userService.login(email, password);
  }

  @Post('request-otp')
  async requestOtp(@Body('email') email: string) {
    return this.userService.requestOTP(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    const isValid = await this.userService.verifyOTP(body.email, body.otp);
    if (isValid) {
      return { message: 'OTP verified successfully!' };
    } else {
      return { message: 'Invalid or expired OTP.' };
    }
  }

}
