import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import * as otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
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
       const payload = { email: user.email}; // You can include additional fields in the payload
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

  async requestOTP(email: string) {
    const otp = generateOTP();
    await sendOTP(email, otp);
    storeOTP(email, otp);
  }

  async verifyOTP(email: string, otp: string) {
    return verifyOTP(email, otp);
  }
  
}

const sendOTP = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

const generateOTP = () => {
  const otp = otpGenerator.generate(5, { upperCase: false, specialChars: false });
  return otp;
}

const otps = new Map<string, { otp: string; expires: Date }>();

const storeOTP = (email: string, otp: string) => {
  const expires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  otps.set(email, { otp, expires });
};

const getStoredOTP = (email: string) => {
  const stored = otps.get(email);
  if (stored && stored.expires > new Date()) {
    return stored.otp;
  }
  return null;
};

const verifyOTP = (email: string, inputOtp: string) => {
  const storedOtp = getStoredOTP(email);
  if (storedOtp === inputOtp) {
    // OTP is valid
    otps.delete(email); // Remove OTP after verification

    return true;
  }
  return false;
};


