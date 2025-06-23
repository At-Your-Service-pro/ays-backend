import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // ✅ Extract token from Authorization header
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // Store token in request so Passport can use it
    request.cookies = request.cookies || {};
    request.cookies.access_token = token;

    return super.canActivate(context);
  }
}
