import { plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';

export class GoogleConfig {
  @IsString()
  clientId: string;

  @IsString()
  clientSecret: string;

  @IsString()
  callbackUrl: string;
}

export const authConfigFactory = () => {
  const env = process.env;

  const config = plainToClass(GoogleConfig, {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_SECRET,
    callbackUrl: env.GOOGLE_CALLBACK_URL,
  });

  return config;
};
