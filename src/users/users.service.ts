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
    return await this.knex('customers').select('*');
  }

  // Create a new user
  async createUser(firstname: string,lastname:string, email: string, password: string,phonenumber: string) {
    const hasedpassword  = await bcryptjs.hash(password, 10);
     await this.knex('customers').insert({
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
    const user = await this.knex('customers').where({email}).first();
    if(!user) return {statusCode: 401,message: "User no found"};

    const match = await bcryptjs.compare(password, user.password);
    if(match){
       // Generate the JWT token
       const payload = { email: user.email}; // You can include additional fields in the payload
       const token = this.jwtService.sign(payload);

       await this.knex('customers')
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
      newPassword: string,
      firstname: string,
      lastname: string,
      phonenumber: string
    ) {
    // Fetch the user by the current email
    const user = await this.knex('customers').where({ email }).first();
    if (!user) {
      throw new Error('User not found');
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update the user's email and password
    await this.knex('customers')
      .where({ email })
      .update({
        email,
        firstname,
        lastname,
        phonenumber,
        password: hashedPassword,
      });

    return { message: 'User email and password updated successfully' };
  }

  async requestOTP(email: string) {
    const otp = generateOTP();
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
    const isOTpVerified = await verifyOTP(email, otp);
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
  const expires = new Date(Date.now() + 1 * 60 * 1000); // OTP valid for 10 minutes
  otps.set(email, { otp, expires });
};

const getStoredOTP = (email: string) => {
  const stored = otps.get(email);
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

const verifyOTP = (email: string, inputOtp: string) => {
  const storedOtp = getStoredOTP(email);
  if (storedOtp === inputOtp) {
    // OTP is valid
    otps.delete(email); // Remove OTP after verification

    return true;
  }
  return false;
};

