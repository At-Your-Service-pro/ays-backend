import { Controller, Post, Body, UseGuards,Patch,Get } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { userDto,loginDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto: userDto) {
    const { email, password,firstname,lastname,phonenumber } = signupDto;
    return await this.userService.createUser( 
      firstname,
      lastname,
      email, 
      password,
      phonenumber 
    );
  }

  @Get('get-user')
  async getUser(@Body() email: {email: string}) {
    return await this.userService.getUser(email);
  }

  @Post('verify-user')
  async verifyUser(@Body() signupDto: { firstname:string,lastname:string,phonenumber:string,email: string; password: string }) {
    const { email, password,firstname,lastname,phonenumber } = signupDto;
    return await this.userService.verifyUser( 
      firstname,
      lastname,
      email, 
      password,
      phonenumber 
    );
  }


  @Post('login')
  async loginUser(@Body() loginDTO: loginDto) {
    const { email, password } = loginDTO;
    return await this.userService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateUser(@Body() userDTO: userDto) {
    const {email,password,firstname,lastname,phonenumber} = userDTO;
    return this.userService.updateUser(email, password,firstname,lastname,phonenumber);
  }

  @Post('request-otp')
  async requestOtp(@Body('email') email: string) {
    return await this.userService.requestOTP(email); 
  }

  // @Post('resend-otp')
  // async resendOtp(@Body('email') email: string) {
  //   await this.userService.resendOTP(email);
  //   return { message: 'OTP has been resent to your email.' };
  // }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return await this.userService.verifyOTP(body.email, body.otp);
  }

  @Post('update-password')
  async updatePassword(@Body() body: {email: string,password: string}){
    return await this.userService.updatePassword(body.email,body.password);
  }
}
