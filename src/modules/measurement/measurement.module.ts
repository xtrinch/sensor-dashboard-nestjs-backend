import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { MeasurementController } from '~/modules/measurement/measurement.controller';
import { Measurement } from '~/modules/measurement/measurement.entity';
import { MeasurementService } from '~/modules/measurement/measurement.service';
import { MeasurementRepository } from '~modules/measurement/measurement.repository';
import { SensorModule } from '~modules/sensor/sensor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Measurement, MeasurementRepository]),
    DefaultAdminModule,
    SensorModule,
  ],
  providers: [MeasurementService],
  exports: [MeasurementService, TypeOrmModule],
  controllers: [MeasurementController],
})
export class MeasurementModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('Measurement', Measurement);
  }
}
