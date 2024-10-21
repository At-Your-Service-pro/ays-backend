import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import {Knex} from 'knex';

@Injectable()
export class UserService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex,
  private readonly jwtService: JwtService) {}

  // Fetch all users
  async getAllUsers() {
    return await this.knex('users').select('*');
  }

  // Create a new user
  async createUser(username: string, email: string, password: string,phonenumber: string) {
    const hasedpassword  = await bcryptjs.hash(password, 10);
    return await this.knex('users').insert({
      username,
      email,
      password: hasedpassword,
      phonenumber
    });
  }

  async login(email:string,password:string){
    const user = await this.knex('users').where({email}).first();
    if(!user) return {statusCode: 401,message: "User no found"};

    const match = await bcryptjs.compare(password, user.password);
    if(match){
       // Generate the JWT token
       const payload = { email: user.email, sub: user.id }; // You can include additional fields in the payload
       const token = this.jwtService.sign(payload);
 
       return {
         statusCode: 200,
         message: 'Login successful',
         token: token, // Return the token to the client
       };

    } else {
      return {statusCode: 401,message: "Wrong credentials"};
    }

  }

  // Find a user by ID
  async getUserById(id: number) {
    return await this.knex('users').where({ id }).first();
  }
}
