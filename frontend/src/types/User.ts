import { IsEmail, IsString, MinLength } from "class-validator";
import { AbstractEntity } from "types/AbstractEntity";

export type UserId = number;

class User extends AbstractEntity {
  constructor(s?: User) {
    super(s);

    this.username = s?.username || "";
    this.email = s?.email || "";
    this.id = s?.id;
    this.name = s?.name;
    this.surname = s?.surname;
  }

  public id: UserId;

  @IsString()
  @MinLength(2)
  public username: string;

  @IsString()
  @IsEmail()
  public email: string;

  public name: string;

  public surname: string;
}

export default User;
