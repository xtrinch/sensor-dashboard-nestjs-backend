import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '~modules/user/user.entity';
import { UserService } from '~modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'sensordashboard-jwt',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: number; username: string }): Promise<User> {
    return this.userService.find({ id: payload.sub });
  }
}
