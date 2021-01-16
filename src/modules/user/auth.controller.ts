import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '~modules/user/auth.service';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserLoginDto } from '~modules/user/dto/user.login.dto';
import { GoogleAuthGuard } from '~modules/user/google.guard';
import { UserRequest } from '~modules/user/jwt.guard';
import { LocalGuard } from '~modules/user/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() data: UserLoginDto,
    @Request() req: UserRequest,
  ): Promise<{
    accessToken: string;
    user: UserDto;
  }> {
    const { accessToken, user } = await this.authService.login(req.user);

    return {
      accessToken,
      user: UserDto.fromUser(user),
    };
  }

  @UseGuards(GoogleAuthGuard)
  @Post('google-login')
  async loginWithGoogle(
    @Request() req: UserRequest,
  ): Promise<{
    accessToken: string;
    user: UserDto;
  }> {
    const { accessToken, user } = await this.authService.login(req.user);

    return {
      accessToken,
      user: UserDto.fromUser(user),
    };
  }

  @Post('register')
  public async register(@Body() data: UserCreateDto): Promise<UserDto> {
    const user = await this.authService.register(data);
    return UserDto.fromUser(user);
  }
}
