import { Controller, Post, Body, UseGuards,Patch } from '@nestjs/common';
import { UserService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto: { firstname:string,lastname:string,phonenumber:string,email: string; password: string }) {
    const { email, password,firstname,lastname,phonenumber } = signupDto;
    return await this.userService.createUser( 
      firstname,
      lastname,
      email, 
      password,
      phonenumber 
    );
  }

  @Post('login')
  async loginUser(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    return await this.userService.login(email, password);
  }

  @Patch('update')
  async updateUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('phonenumber') phonenumber: string,
  ) {
    return this.userService.updateUser(email, password,firstname,lastname,phonenumber);
  }

  @Post('request-otp')
  async requestOtp(@Body('email') email: string) {
    return await this.userService.requestOTP(email);
  }

  @Post('resend-otp')
  async resendOtp(@Body('email') email: string) {
    await this.userService.resendOTP(email);
    return { message: 'OTP has been resent to your email.' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return await this.userService.verifyOTP(body.email, body.otp);
  }
}
