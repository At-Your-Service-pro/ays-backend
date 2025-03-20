import { Injectable,Inject,Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { hash, compare } from 'bcryptjs';
import { Knex } from 'knex';
import { categoryDto } from 'src/category/category.dto';

@Injectable()
export class AdminAuthService {
  private readonly SUPER_ADMIN_KEY = 'ekdejf'; // Default key for super admin creation

    constructor(@Inject('KnexConnection') private readonly knex: Knex,
    private readonly jwtService: JwtService) {}
  

  // Method to create a super admin
  async createAdmin(email: string, password: string, superAdminKey: string,firstname: string,lastname:string): Promise<any> {
    if (superAdminKey !== this.SUPER_ADMIN_KEY) {
      return {
        message: 'Invalid admin key',
        statusCode: 200
      }
    }

    const existingUser = await this.knex('admin').where({email}).first();
    if (existingUser) {
      return {
        message: 'Admin already exists',
        statusCode : 200
      }
    }

    const hashedPassword = await hash(password, 10);
    await this.knex('admin').insert({
      email,
      password: hashedPassword,
      admin_key: superAdminKey,
      role: 'admin',
      firstname: firstname,
      lastname: lastname,
    });

    return {
      message: 'Super admin created successfully',
      statusCode: 201
    };
  }

  async loginAdmin(email: string, password: string){
    const admin = await this.knex('admin').where({email}).first();

    if (!admin) {
      return {
        message: 'Admin does not exists',
        statusCode: 400
      }
    }

    const isPasswordValid = await compare(password, admin.password);
    if (!isPasswordValid) {
      return {
        message: 'Invalid password credentials',
        statusCode: 400
      }
    }

    const payload = { email: admin.email, role: admin.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Admin logged in successfully',
      admin,
      accessToken,
      statusCode: 200
    };
  }

  async getUsers() {
    const users = await this.knex('users');
  
    // Remove password field from each user
    const sanitizedUsers = users.map(({ password, ...user }) => user);
  
    return { users: sanitizedUsers };
  }

   async createCategory(data: categoryDto) {
          const {name} = data;
          await this.knex('category').insert({name});
  
          return {
              statusCode: 201,
              message: 'Category created successfully'
          }
      }
  
    async getAllCategories() {
          const categories = await this.knex('category').select('*');
          if(!categories) return {statusCode: 404, message: 'Categories not found'};
          return {statusCode: 200, data: categories};
      }
      
    async deleteCategory(data) {
      try{
        await this.knex('category').delete('category').where({id: data})
        return {
          statusCode: 200,
          message: 'category deleted successfully'
        }
      }catch(error){
        return {
          error
        }
      }
    }

    async updateCategory(id: number,category: string) {
      try{
        await this.knex('category')
        .where({ id }) // Find category by ID
        .update({ name: category }) // Update the category nam
        return {
          statusCode: 200,
          message: 'category updated successfully'
        }
      }catch(error){
        console.error(error);
      }
    }
}
