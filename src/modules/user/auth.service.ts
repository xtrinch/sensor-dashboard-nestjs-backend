import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { User } from '~modules/user/user.entity';
import { PostgresErrorCode } from '~utils/postgres-error-codes.enum';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: user,
    };
  }

  public async register(userCreateDto: UserCreateDto) {
    const hashedPassword = await bcrypt.hash(userCreateDto.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...userCreateDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException(
          'User with that email or username already exists',
        );
      }
      throw error;
    }
  }

  async validateUser(email: string, plaintextPass: string): Promise<any> {
    const user = await this.usersService.find({ email });

    const isPasswordMatching = await bcrypt.compare(
      plaintextPass,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }

    user.password = undefined;
    return user;
  }
}
