import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Http2ServerRequest = context.switchToHttp().getRequest();
    if (
      (request.headers.authorization &&
        request.headers.authorization === process.env.ADMIN_TOKEN) ||
      process.env.ENVIRONMENT === 'test'
    ) {
      return true;
    }

    return false;
  }
}
