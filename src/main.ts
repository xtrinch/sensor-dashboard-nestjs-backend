import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { initPipes } from '~utils/app.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  initPipes(app);

  const options = new DocumentBuilder()
    .setTitle('Sensor dashboard backend')
    .setDescription('Sensor dashboard backend API description')
    .setVersion('1.0')
    .addTag('sensors')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001);
}
bootstrap();
