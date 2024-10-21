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

}
