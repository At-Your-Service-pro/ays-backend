import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // console.log('🔍 Extracting Token from Cookie:', request.cookies); // Debugging
          return request?.cookies?.access_token || null; // Ensure the correct cookie name
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true, // 👈 Required to access request object
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload) {
      return {
        message: 'Invalid token'
      }
      // throw new UnauthorizedException('Invalid token');
    }
    // console.log('✅ JWT Payload:', payload);
    return { userId: payload.sub, username: payload.username };
  }
}