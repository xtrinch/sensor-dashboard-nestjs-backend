import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { initPipes } from '~utils/app.utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_BROKER_URL,
    },
  });
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

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
