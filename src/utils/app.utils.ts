import {
  BadRequestException,
  INestApplication,
  ValidationPipe
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { transform } from '~utils/validation';

export function initPipes(app: INestApplication): void {
  // use class-validator to validate query and body in controllers
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(transform(validationErrors));
      },
    }),
  );
}
