import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Http2ServerRequest } from 'http2';
import { User } from '~modules/user/user.entity';

export interface UserRequest extends Http2ServerRequest {
  user: User;
}

@Injectable()
export class UserGuard extends AuthGuard('sensordashboard-jwt') {}
