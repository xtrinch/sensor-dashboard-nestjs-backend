import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { AuthService } from '~modules/user/auth.service';
import { UserRequest } from '~modules/user/jwt.guard';
import { User } from '~modules/user/user.entity';
import { UserService } from '~modules/user/user.service';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<UserRequest>();

    const idToken = request.headers.authorization;

    if (!idToken) {
      throw new BadRequestException();
    }

    const data = await this.authService.verifyIdToken(idToken);

    try {
      const user = await this.userService.find({ email: data.email });
      request.user = user;
      return true;
    } catch (e) {
      if (!(e instanceof NotFoundException)) {
        throw e;
      }
    }

    let user = new User();
    user.name = data.name;
    user.surname = data.family_name;
    user.email = data.email;
    user.username = data.email;
    user.sub = data.sub;
    user.imageUrl = data.picture;
    user = await User.save(user);

    request.user = user;

    return true;
  }
}
