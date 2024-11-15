import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import * as otpGenerator from 'otp-generator';
import * as nodemailer from 'nodemailer';

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
  async createUser(firstname: string,lastname:string, email: string, password: string,phonenumber: string) {
    const hasedpassword  = await bcryptjs.hash(password, 10);
     await this.knex('users').insert({
      firstname,
      lastname,
      email,
      password: hasedpassword,    
      phonenumber
    });

    return {
      statusCode: 201,
      message: 'User created successfully'
    } 
  }

  async login(email:string,password:string){
    const user = await this.knex('users').where({email}).first();
    if(!user) return {statusCode: 401,message: "User no found"};

    const match = await bcryptjs.compare(password, user.password);
    if(match){
       // Generate the JWT token
       const payload = { email: user.email}; // You can include additional fields in the payload
       const token = this.jwtService.sign(payload);

       await this.knex('users')
       .where({ id: user.id }) // Select the user by ID
       .update({ token: token }); 
 
       return {
         statusCode: 200,
         message: 'Login successful',
         token: token, // Return the token to the client
       };

    } else {
      return {statusCode: 401,message: "Wrong credentials"};
    }

  }

   // Update user email and password
   async updateUser(
     email: string,
     password: string,
     firstname: string, 
     lastname: string,
     phonenumber: string
    ) {
      if (!email) {
        throw new Error('Email is required to update user');
      }
    
      const user = await this.knex('users').where({ email }).first();
      if (!user) {
        throw new Error('User not found');   
      }
    

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update the user's email and password
    await this.knex('users')
      .where({ email })
      .update({
        firstname, 
        lastname,
        email,
        password: hashedPassword,  
        phonenumber
      });

    return { message: 'User profile updated successfully' };
  }

  async requestOTP(email: string) {
    const otp = generateOTP();
    console.log(`otp generated: ${otp}`);
    await sendOTP(email, otp);
    storeOTP(email, otp);
  }

  async resendOTP(email: string) {
    // Check if an OTP already exists for this user
    const existingOtp = getStoredOTP(email);
  
    if (existingOtp) {
      // Delete the existing OTP
      deleteStoredOTP(email);
    }

    // Generate a new OTP
    const newOtp = generateOTP();
  
    // Send the new OTP to the user
    await sendOTP(email, newOtp);
  
    // Store the new OTP for this user
    storeOTP(email, newOtp);
  }

  async verifyOTP(email: string, otp: string) {
    const isOTpVerified = await verifyoTP(email, otp);
    if(isOTpVerified) {
      const payload = { email: email}; // You can include additional fields in the payload
      const token = this.jwtService.sign(payload);

      return {
        statusCode: 200,
        message: 'Login successful',
        token: token, // Return the token to the client
      };
    } else {
      return {statusCode: 401, message: "OTP verification failed"};
    }
  }

  async loginWithGoogle(user: any) {
    const payload = { email: user.email};
    return {
      token: this.jwtService.sign(payload),
    };
  }
  
}
 
const sendOTP = async (email: string, otp: string) => {
  console.log(`email: ${process.env.EMAIL_USER}`);
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
  const otp = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
  return otp.toString();
}

const otps = new Map<string, { otp: string; expires: Date }>();

const storeOTP = (email: string, otp: string) => {
  const expires = new Date(Date.now() + 1 * 60 * 1000); // OTP valid for 10 minutes
  otps.set(email.toLowerCase(), { otp, expires });
};

const getStoredOTP = (email: string) => {
  const stored = otps.get(email);
  console.log(`stored: ${stored}`);
  if (stored && stored.expires > new Date()) {
    return stored.otp;
  }
  return null;
};

const deleteStoredOTP = (email: string) => {
  // Assuming 'otps' is a Map object that stores OTPs with email as the key
  if (otps.has(email)) {
    otps.delete(email);
  }
};

const verifyoTP = (email: string, inputOtp: string) => {
  const storedOtp = getStoredOTP(email);
  console.log(`storedOtp: ${storedOtp}`);
  if (storedOtp === inputOtp) {
    // OTP is valid
    otps.delete(email); // Remove OTP after verification

    return true;
  }
  return false;
};

