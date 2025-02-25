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
    const user = await this.knex('admin').where({email}).first();

    if (!user) {
      return {
        message: 'Admin does not exists',
        statusCode: 400
      }
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return {
        message: 'Invalid password credentials',
        statusCode: 400
      }
    }

    const payload = { email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    await this.knex('admin')
    .where({ email })
    .update({ token: accessToken });

    return {
      message: 'Admin logged in successfully',
      accessToken,
      user,
      statusCode: 200
    };
  }
}
