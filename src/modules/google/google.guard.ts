import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  constructor() {
    super();
  }

  handleRequest<User>(
    err: Error,
    user: User,
    info: Record<string, any>,
    context: ExecutionContext,
  ): User {
    if (err) {
      return null;
    }

    return user;
  }
}
