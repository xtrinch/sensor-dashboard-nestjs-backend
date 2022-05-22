import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MinLength(2)
  public username: string;

  @IsString()
  @MinLength(2)
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(5)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public surname: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  public isGoogle: boolean;
}
