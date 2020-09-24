import { IsNotEmpty, IsString } from 'class-validator';

export class ForwarderCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public location: string;
}
