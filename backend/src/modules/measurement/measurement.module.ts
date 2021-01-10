import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementController } from '~/modules/measurement/measurement.controller';
import { Measurement } from '~/modules/measurement/measurement.entity';
import { MeasurementService } from '~/modules/measurement/measurement.service';
import { DisplayModule } from '~modules/display/display.module';
import { ForwarderModule } from '~modules/forwarder/forwarder.module';
import { MeasurementRepository } from '~modules/measurement/measurement.repository';
import { SensorModule } from '~modules/sensor/sensor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Measurement, MeasurementRepository]),
    SensorModule,
    DisplayModule,
    ForwarderModule,
  ],
  providers: [MeasurementService],
  exports: [MeasurementService, TypeOrmModule],
  controllers: [MeasurementController],
})
export class MeasurementModule {}
