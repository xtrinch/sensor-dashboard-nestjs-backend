import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { User } from '~modules/user/user.entity';
import { UserService } from '~modules/user/user.service';

@Injectable()
export class JwtStrategyMock extends PassportStrategy(
  Strategy,
  'sensordashboard-jwt',
) {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req?.headers) return null;
        // actual user ID is passed in the header for tests
        const jwt = this.jwtService.sign({ sub: req.headers.authorization });
        return jwt;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: string; username: string }): Promise<User> {
    return this.userService.find({ id: payload.sub });
  }
}
