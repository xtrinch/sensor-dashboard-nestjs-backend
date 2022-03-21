import { plainToClass } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class BackupConfig {
  @IsString()
  @IsOptional()
  apiBase: string;

  @IsString()
  @ValidateIf((o) => !!o.apiBase)
  email: string;

  @ValidateIf((o) => !!o.apiBase)
  @IsString()
  filename: string;

  @ValidateIf((o) => !!o.apiBase)
  @IsString()
  folder: string;

  @ValidateIf((o) => !!o.apiBase)
  @IsString()
  password: string;

  @ValidateIf((o) => !!o.apiBase)
  @IsNumber()
  removeOlderThan: number;
}

export const backupConfigFactory = () => {
  const env = process.env;

  const config = plainToClass(BackupConfig, {
    apiBase: env.KOOFR_API_BASE,
    email: env.KOOFR_EMAIL,
    filename: env.KOOFR_FILENAME,
    folder: env.KOOFR_FOLDER,
    password: env.KOOFR_PASSWORD,
    removeOlderThan: parseInt(env.KOOFR_REMOVE_OLDER_THAN),
  });

  return config;
};
