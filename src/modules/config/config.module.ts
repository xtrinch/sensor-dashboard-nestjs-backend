import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';
import { appConfigFactory } from './config.factory';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      load: [appConfigFactory],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
