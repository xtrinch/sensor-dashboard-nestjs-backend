import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '~modules/user/auth.controller';
import { AuthService } from '~modules/user/auth.service';
import { JwtStrategy } from '~modules/user/jwt.strategy';
import { LocalStrategy } from '~modules/user/local.strategy';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  providers: [UserService, AuthService, JwtStrategy, LocalStrategy],
  exports: [
    UserService,
    AuthService,
    JwtModule, // export it here and import this module in tests
    PassportModule,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController, AuthController],
})
export class UserModule {}
