import { ValidationPipe, BadRequestException, INestApplication } from "@nestjs/common";
import { ValidationError } from "class-validator";

export function initPipes(app: INestApplication) {
  // use class-validator to validate query and body in controllers
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
}
