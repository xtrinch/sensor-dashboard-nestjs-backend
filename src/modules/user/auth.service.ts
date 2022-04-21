import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CONFIG, Config } from '~modules/config/config.factory';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { User } from '~modules/user/user.entity';
import { UserAuthInterface } from '~modules/user/user.interfaces';
import { PostgresErrorCode } from '~utils/postgres-error-codes.enum';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject(CONFIG) private config: Config,
  ) {}

  public async login(user: User, res: Response): Promise<UserAuthInterface> {
    if (!user) {
      res?.cookie('access-token', 'none', {
        maxAge: -1,
        domain: this.config.domain,
      });
      res?.cookie('refresh-token', 'none', {
        maxAge: -1,
        domain: this.config.domain,
      });

      return;
    }

    user.lastSeenAt = new Date();
    const newUser = await User.save(user);

    const payload = { username: newUser.email, sub: newUser.id };
    const accessToken = this.jwtService.sign(payload);

    res?.cookie('access-token', accessToken, {
      secure: !this.config.isLocal,
      httpOnly: true,
      expires: new Date(8640000000000000),
      // expires: new Date(Date.now() + 3600000),
      domain: this.config.domain,
    });

    // TODO: actual refresh token
    res?.cookie('refresh-token', accessToken, {
      secure: !this.config.isLocal,
      expires: new Date(8640000000000000),
      // expires: new Date(Date.now() + 3600000 * 24 * 180),
      httpOnly: true,
      domain: this.config.domain,
    });

    return {
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
}
