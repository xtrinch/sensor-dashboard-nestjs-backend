import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorService } from '~/modules/sensor/sensor.service';
import { MeasurementModule } from '~modules/measurement/measurement.module';
import { SensorController } from '~modules/sensor/sensor.controller';
import { Sensor } from '~modules/sensor/sensor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sensor]),
    forwardRef(() => MeasurementModule),
  ],
  providers: [SensorService],
  exports: [SensorService, TypeOrmModule],
  controllers: [SensorController],
})
export class SensorModule {}
