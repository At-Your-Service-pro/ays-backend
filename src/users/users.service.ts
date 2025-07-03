import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
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
  async getUser(_email: {email: string}){
    const {email} = _email;
    const user = await this.knex('users').where({email}).first();
    return {
      statusCode: 200,
      user
    }
  }

  async getUserById(id: number){
    const rest = await this.knex('users').where({ id }).first();
    return {
      rest
    } 
  }

  async verifyUser(firstname:string,lastname:string,email:string,password:string,phonenumber:string){
    const checkIfEmailExists = await this.knex('users').where({email}).first();
    const checkIfPhoneNumberExists = await this.knex('users').where({phonenumber}).first();
    if(checkIfEmailExists || checkIfPhoneNumberExists) {
      return {statusCode: 400, message: "User already exists"};
    } else {
      return {
        statusCode: 201,
        message: "User verified successfully"
      }
    }
  }

  // Create a new user
  async createUser(firstname: string,lastname:string, email: string, password: string,phonenumber: string) {
    try {
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
    }catch(err){
      return {
        message: "failed to fetch",
        statusCode: 400
      }
    }
  }

  async login(email:string,password:string){
    const user = await this.knex('users').where({email}).first();
    if(!user) return {statusCode: 401,message: "User not found"};

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
       return {
        message: "Email is required"
       }
      }
    
      const user = await this.knex('users').where({ email }).first();
      if (!user) {
        return {
          message: "User not found"
        } 
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

  async updatePassword(email:string,password: string){
    try {
      const user = await this.knex('users').where({ email }).first();
      if(!user) return {statusCode: 404, message: "User not found"};
      const hashedPassword = await bcryptjs.hash(password,10);
      await this.knex('users').where({email}).update({password:hashedPassword});
      return {
        statusCode: 200,
        message: 'password updated successfully'
      }
      
    }catch(err: any){
      return {
        statusCode: 500,
        message: err.message
      }
    }
  }

  async requestOTP(email: string) {
    const otp = generateOTP();
    await sendOTP(email, otp);
    storeOTP(email, otp);

    return {
      statusCode: 200,
      message: 'OTP sent successfully',
    }
  }

  // async resendOTP(email: string) {
  //   // Check if an OTP already exists for this user
  //   const existingOtp = getStoredOTP(email);
  
  //   if (existingOtp) {
  //     // Delete the existing OTP
  //     deleteStoredOTP(email);
  //   }

  //   // Generate a new OTP
  //   const newOtp = generateOTP();
  
  //   // Send the new OTP to the user
  //   await sendOTP(email, newOtp);
  
  //   // Store the new OTP for this user
  //   storeOTP(email, newOtp);
  // }

  async verifyOTP(email: string, otp: string) {
    const isOTpVerified = await verifyoTP(email, otp);
    if(isOTpVerified) {
      const payload = { email: email}; // You can include additional fields in the payload
      const token = this.jwtService.sign(payload);

      const user = await this.knex('users').where({email}).first();
      if(user){
        await this.knex('users')
          .where({email})
          .update({token});
      }

      return {
        statusCode: 200,
        message: 'Login successful',
        token: token
      };
    } else {
      return {statusCode: 401, message: "OTP verification failed"};
    }
  }

  async loginWithGoogle(user: any) {
    const payload = { email: user.email};
    return {
      token: this.jwtService.sign(payload)
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
  const otp = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
  return otp.toString();
}

const otps = new Map<string, { otp: string; expires: Date }>();

const storeOTP = (email: string, otp: string) => {
  const expires = new Date(Date.now() + 1 * 60 * 1000); // OTP valid for 1 minutes
  otps.set(email.toLowerCase(), { otp, expires });
  console.log(`Stored OTP for ${email}: ${JSON.stringify(otps.get(email))}`);
};

const getStoredOTP = (email: string) => {
  const stored = otps.get(email);
  console.log(`stored: ${JSON.stringify(stored)}`);
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
  if (storedOtp === inputOtp) {
    // OTP is valid
    otps.delete(email); // Remove OTP after verification

    return true;
  }
  return false;
};

