import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    const { method, originalUrl: url } = req;
    const referer = req.get('referer') || '';

    res.on('close', () => {
      const { statusCode, statusMessage } = res;
      Logger.log(
        `"${method} ${url}" ${statusCode} ${statusMessage} "${referer}"`,
      );
    });

    next();
  }
}
