import { Controller,Post,Body,UseGuards,Get,UseInterceptors,Res,Param} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { JwtAuthGuard } from './admin.guard';
import {CookieInterceptor} from './cookie.interceptor';
import {Response} from 'express';
import { categoryDto } from 'src/category/category.dto';

@UseInterceptors(CookieInterceptor)
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

    @UseGuards(JwtAuthGuard)
    @Get('get-users')
    async getUsers(){
      return this.adminAuthService.getUsers();
    }

     @UseGuards(JwtAuthGuard)
      @Post('create-category')
        async createCategory(@Body() createCategoryDto: categoryDto) {
            return this.adminAuthService.createCategory(createCategoryDto);
        }
    
      @UseGuards(JwtAuthGuard)
      @Get('get-categories')
        async getAllCategories() {
          return this.adminAuthService.getAllCategories();
        }

     @UseGuards(JwtAuthGuard)
       @Get(':id')
       async findOne(@Param('id') id: string) {
         return this.adminAuthService.getCategoryById(Number(id)); // Convert to number
       }

      @UseGuards(JwtAuthGuard)
      @Post('delete-category')
        async deleteCategory(@Body('id') id: string) {
          return this.adminAuthService.deleteCategory(id);
        }

        @UseGuards(JwtAuthGuard)
        @Post('update-category')
          async updateCategory(@Body('id') id: number,@Body('category') category:string) {
            return this.adminAuthService.updateCategory(id,category);
          }  
       
    @Post('logout')
    async logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ message: 'Logged out successfully' });
  }
  }
  
