import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Check if token exists in cookies
    const token = request.cookies?.access_token; // ✅ Read from cookies
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    return super.canActivate(context);
  }
}
