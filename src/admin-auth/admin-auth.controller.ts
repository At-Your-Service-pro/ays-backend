import { Controller,Post,Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin-auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) {}
  
    @Post('create-admin')
    async createAdmin(
      @Body('email') email: string,
      @Body('password') password: string,
      @Body('superAdminKey') superAdminKey: string,
      @Body('firstname') firstname: string,
      @Body('lastname') lastname: string,
    ) {
      return this.adminAuthService.createAdmin(email, password, superAdminKey,firstname, lastname);
    }
  
    @Post('login-admin')
    async loginAdmin(@Body('email') email: string, @Body('password') password: string) {
      return this.adminAuthService.loginAdmin(email, password);
    }
  }
  
