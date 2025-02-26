import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token; // Extract JWT from cookies
        }
      ]),
      secretOrKey: process.env.JWT_SECRET, // Set this in your .env file
    });
  }

  async validate(payload: any) {
    return { email: payload.email, role: payload.role };
  }
}
