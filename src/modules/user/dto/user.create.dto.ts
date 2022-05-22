import {
  IsBoolean,
  IsEmail,
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
  @MinLength(2)
  public name: string;

  @IsString()
  @MinLength(2)
  public surname: string;

  @IsBoolean()
  // TODO: for some reason this throws a TypeError: Reflect.getMetadata is not a function
  // @Type(() => Boolean)
  @IsOptional()
  public isGoogle: boolean;
}
