import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import {
  GoogleCallbackParameters,
  Profile,
  Strategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import { CONFIG, Config } from '~modules/config/config.factory';
import { User } from '~modules/user/user.entity';
import { UserService } from '~modules/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(CONFIG) private config: Config,
    private userService: UserService,
  ) {
    super(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl,
        scope: ['email', 'profile'],
        passReqToCallback: true,
      },
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        params: GoogleCallbackParameters,
        profile: Profile,
        done: VerifyCallback,
      ) => {
        // do not fail, because depending on request.user, client will be redirected to success or error page
        const email = profile.emails[0].value;
        let user: User;
        try {
          user = await this.userService.find({
            email,
          });
        } catch (e) {}
        if (!user) {
          user = await this.userService.create({
            email,
            username: email.split('@')[0],
            name: profile.name?.givenName || 'Unknown',
            password: undefined,
            surname: profile.name?.familyName || 'Unknown',
          });
        }
        done(null, user, { idToken: params.id_token, refreshToken });
      },
    );
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  authenticate(req: any, options: any) {
    super.authenticate(req, {
      ...options,
      state: Object.keys(req.query).length ? JSON.stringify(req.query) : null,
    });
  }
}
