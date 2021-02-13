import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementModule } from '~/modules/measurement/measurement.module';
import { SensorModule } from '~/modules/sensor/sensor.module';
import { UserModule } from '~/modules/user/user.module';
import { CategoryModule } from '~modules/category/category.module';
import { CommentModule } from '~modules/comment/comment.module';
import { DisplayModule } from '~modules/display/display.module';
import { ForwarderModule } from '~modules/forwarder/forwarder.module';
import { RadioModule } from '~modules/radio/radio.module';
import { TopicModule } from '~modules/topic/topic.module';
import { LoggerMiddleware } from '~utils/logger.middleware';
import { AppService } from './app.service';

@Module({
  imports: [
    SensorModule,
    MeasurementModule,
    UserModule,
    DisplayModule,
    ForwarderModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: process.env.TYPEORM_KEEP_CONNECTION_ALIVE === 'true',
    }),
    ScheduleModule.forRoot(),
    CategoryModule,
    TopicModule,
    CommentModule,
    RadioModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
