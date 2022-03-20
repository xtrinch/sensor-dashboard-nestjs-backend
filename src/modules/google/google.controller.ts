import {
  Controller,
  Get,
  Inject,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { encode } from 'querystring';
import { CONFIG, Config } from '~modules/config/config.factory';
import { AuthService } from '~modules/user/auth.service';
import { UserRequest } from '~modules/user/jwt.guard';
import { GoogleGuard } from './google.guard';

@Controller('google')
export class GoogleController {
  constructor(
    @Inject(CONFIG) private config: Config,
    private authService: AuthService,
  ) {}

  @Get('redirect')
  @UseGuards(GoogleGuard)
  public async googleCallback(
    @Req() req: UserRequest,
    @Res() res: Response,
    @Query() query: { state?: string },
  ): Promise<void> {
    await this.authService.login(req.user, res);

    if (req.user) {
      const { state: queryState } = query;
      const state = queryState ? JSON.parse(queryState) : null;
      res.redirect(
        `${this.config.feUrl}/login?success=true${
          state ? `&${encode(state)}` : ''
        }`,
      );
    } else {
      res.redirect(`${this.config.feUrl}/login?success=false`);
    }
  }
}
