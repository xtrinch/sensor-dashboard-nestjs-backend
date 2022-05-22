import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  public username: string; // named username because of passport's expectance

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  public password: string;
}
