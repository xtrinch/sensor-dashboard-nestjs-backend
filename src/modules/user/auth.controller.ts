import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '~modules/user/auth.service';
import { UserCreateDto } from '~modules/user/dto/user.create.dto';
import { UserDto } from '~modules/user/dto/user.dto';
import { UserLoginDto } from '~modules/user/dto/user.login.dto';
import { UserRequest } from '~modules/user/jwt.guard';
import { LocalGuard } from '~modules/user/local.guard';
import AuthGuard from './auth.decorator';
import { ChangePasswordDto } from './dto/change.password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AuthGuard()
  @Post('change-password')
  async changePassword(
    @Body() data: ChangePasswordDto,
    @Request() req: UserRequest,
  ): Promise<void> {
    await this.authService.changePassword(req.user, data);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() data: UserLoginDto,
    @Request() req: UserRequest,
    @Res() res: Response,
  ): Promise<void> {
    const { user } = await this.authService.login(req.user, res);

    res.send({
      user: UserDto.fromUser(user),
    });
  }

  @AuthGuard()
  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    await this.authService.login(null, res);
    res.send();
  }

  @Post('register')
  public async register(@Body() data: UserCreateDto): Promise<UserDto> {
    const user = await this.authService.register(data);
    return UserDto.fromUser(user);
  }
}
