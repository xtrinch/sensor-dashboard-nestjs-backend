/**
 * Global Config
 */

import { registerAs } from '@nestjs/config';
import { plainToClass, Type } from 'class-transformer';
import {
  IsBoolean,
  IsString,
  ValidateNested,
  validateOrReject,
} from 'class-validator';
import {
  BackupConfig,
  backupConfigFactory,
} from '~modules/backup/backup.config';
import { authConfigFactory, GoogleConfig } from '~modules/google/google.config';

export class Config {
  @ValidateNested()
  @Type(() => GoogleConfig)
  google: GoogleConfig;

  @ValidateNested()
  @Type(() => BackupConfig)
  backup: BackupConfig;

  @IsBoolean()
  isLocal: boolean;

  @IsString()
  feUrl: string;

  @IsString()
  domain: string;
}

export const appConfigFactory = registerAs('config', async () => {
  const config = plainToClass(Config, {
    isLocal: process.env.NODE_ENV !== 'production',
    feUrl: process.env.FE_URL,
    domain: process.env.DOMAIN,
    google: authConfigFactory(),
    backup: backupConfigFactory(),
  } as Config);

  try {
    await validateOrReject(config, {
      whitelist: true,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }

  return config;
});

export const CONFIG = appConfigFactory.KEY;
