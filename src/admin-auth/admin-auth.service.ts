import { Injectable,Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { Knex } from 'knex';

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
      }
    }

    const existingUser = await this.knex('admin').where({email}).first();
    if (existingUser) {
      return {
        message: 'Admin already exists',
      }
    }

    const hashedPassword = await hash(password, 10);
    await this.knex('admin').insert({
      email,
      password: hashedPassword,
      admin_key: superAdminKey,
      role: 'super_admin',
      firstname: firstname,
      lastname: lastname,
    });

    return {
      message: 'Super admin created successfully'
    };
  }

  async loginAdmin(email: string, password: string){
    const user = await this.knex('admin').where({email}).first();

    if (!user || user.role !== 'super_admin') {
      return {
        message: 'Invalid credentials or not a super admin',
      }
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return {
        message: 'Invalid credentials',
      }
    }

    const payload = { email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Admin logged in successfully',
      accessToken,
      user
    };
  }

}
