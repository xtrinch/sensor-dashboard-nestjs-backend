import { Module } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { CONFIG, Config } from '~modules/config/config.factory';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [],
  controllers: [GoogleController],
  providers: [
    {
      provide: 'OAuth2Client',
      inject: [CONFIG],
      useFactory: (config: Config): OAuth2Client =>
        new OAuth2Client({
          clientId: config.google.clientId,
          clientSecret: config.google.clientSecret,
        }),
    },
    GoogleStrategy,
  ],
})
export class GoogleModule {}
