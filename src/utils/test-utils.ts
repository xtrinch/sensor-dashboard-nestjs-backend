import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '~app.module';
import { JwtStrategy } from '~modules/user/jwt.strategy';
import { JwtStrategyMock } from '~modules/user/mock/jwt.strategy.mock';

export const createTestingApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(JwtStrategy)
    .useClass(JwtStrategyMock)
    .compile();

  const app = moduleFixture.createNestApplication();
  return app;
};
