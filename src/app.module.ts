import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementModule } from '~/modules/measurement/measurement.module';
import { SensorModule } from '~/modules/sensor/sensor.module';
import { UserModule } from '~/modules/user/user.module';
import { DisplayModule } from '~modules/display/display.module';
import { ForwarderModule } from '~modules/forwarder/forwarder.module';
import { LoggerMiddleware } from '~utils/logger.middleware';
import { AppService } from './app.service';

@Module({
  imports: [
    SensorModule,
    MeasurementModule,
    UserModule,
    DisplayModule,
    ForwarderModule,
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
