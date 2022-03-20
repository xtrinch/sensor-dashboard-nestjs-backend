import { plainToClass } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class BackupConfig {
  @IsString()
  @IsOptional()
  apiBase: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  filename: string;

  @IsOptional()
  @IsString()
  folder: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  removeOlderThan: string;
}

export const backupConfigFactory = () => {
  const env = process.env;

  const config = plainToClass(BackupConfig, {
    apiBase: env.KOOFR_API_BASE,
    email: env.KOOFR_EMAIL,
    filename: env.KOOFR_FILENAME,
    folder: env.KOOFR_FOLDER,
    password: env.KOOFR_PASSWORD,
    removeOlderThan: env.KOOFR_REMOVE_OLDER_THAN,
  });

  return config;
};