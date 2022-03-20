import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import 'reflect-metadata';
import { initPipes } from '~utils/app.utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.DISABLE_MQTT !== 'true') {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.MQTT,
      options: {
        url: process.env.MQTT_BROKER_URL,
      },
    });
  }
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

  if (process.env.DISABLE_MQTT !== 'true') {
    await app.startAllMicroservicesAsync();
  }

  app.use(cookieParser());

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
