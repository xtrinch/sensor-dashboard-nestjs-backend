import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { User } from '~modules/user/user.entity';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { PostgresErrorCode } from '~utils/postgres-error-codes.enum';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(user: User): Promise<UserAuthInterface> {
    user.lastSeenAt = new Date();
    const newUser = await User.save(user);

    const payload = { username: newUser.email, sub: newUser.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: newUser,
    };
  }

  public async register(userCreateDto: UserCreateDto): Promise<User> {
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

  public async validateUser(
    email: string,
    plaintextPass: string,
  ): Promise<User> {
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

  public async verifyIdToken(token: string): Promise<TokenPayload> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload: TokenPayload = ticket.getPayload();
    return payload;
  }
}
