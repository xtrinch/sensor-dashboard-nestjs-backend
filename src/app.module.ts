import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from '~/modules/sensor/sensor.module';
import { DefaultAdminModule } from 'nestjs-admin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementModule } from '~/modules/measurement/measurement.module';

@Module({
  imports: [
    SensorModule,
    MeasurementModule,
    DefaultAdminModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
