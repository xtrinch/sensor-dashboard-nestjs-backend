import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { MeasurementModule } from '~/modules/measurement/measurement.module';
import { SensorModule } from '~/modules/sensor/sensor.module';
import { UserModule } from '~/modules/user/user.module';
import { BackupModule } from '~modules/backup/backup.module';
import { BoardModule } from '~modules/board/board.module';
import { CategoryModule } from '~modules/category/category.module';
import { CommentModule } from '~modules/comment/comment.module';
import { ConfigModule } from '~modules/config/config.module';
import { DisplayModule } from '~modules/display/display.module';
import { ForwarderModule } from '~modules/forwarder/forwarder.module';
import { GoogleModule } from '~modules/google/google.module';
import { RadioModule } from '~modules/radio/radio.module';
import { TopicModule } from '~modules/topic/topic.module';
import { LoggerMiddleware } from '~utils/logger.middleware';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    GoogleModule,
    BackupModule,
    SensorModule,
    MeasurementModule,
    UserModule,
    DisplayModule,
    ForwarderModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: process.env.TYPEORM_KEEP_CONNECTION_ALIVE === 'true',
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    CategoryModule,
    TopicModule,
    CommentModule,
    RadioModule,
    BoardModule,
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DSN,
      debug: false,
      environment: 'dev',
      release: null, // must create a release in sentry.io dashboard
      logLevels: ['error'],
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
