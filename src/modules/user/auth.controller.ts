import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '~modules/user/auth.service';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserGuard } from '~modules/user/user.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UserGuard)
  @Post('login')
  async login(
    @Request() req,
  ): Promise<{
    accessToken: string;
    user: UserDto;
  }> {
    const loginData = await this.authService.login(req.user);

    return {
      accessToken: loginData.accessToken,
      user: UserDto.fromUser(loginData.user),
    };
  }

  @Post('register')
  public async register(@Body() data: UserCreateDto): Promise<UserDto> {
    const user = await this.authService.register(data);
    return UserDto.fromUser(user);
  }
}
