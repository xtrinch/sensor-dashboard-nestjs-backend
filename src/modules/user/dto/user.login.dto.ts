import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  public username: string; // named username because of passport's expectance

  @IsString()
  @IsNotEmpty()
  public password: string;
}
