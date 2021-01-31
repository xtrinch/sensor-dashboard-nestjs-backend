import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Http2ServerRequest } from 'http2';
import { Observable } from 'rxjs';
import { User } from '~modules/user/user.entity';

export interface UserRequest extends Http2ServerRequest {
  user: User;
}

@Injectable()
export class JwtGuard extends AuthGuard('sensordashboard-jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
