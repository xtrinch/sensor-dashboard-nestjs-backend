import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(5)
  public newPassword: string;

  @IsString()
  @MinLength(5)
  public repeatNewPassword: string;
}
