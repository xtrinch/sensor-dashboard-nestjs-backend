import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { initPipes } from '~utils/app.utils';
import { AppModule } from './app.module';

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

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
