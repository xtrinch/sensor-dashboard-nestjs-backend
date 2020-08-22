import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { SensorService } from '~/modules/sensor/sensor.service';
import { SensorController } from '~modules/sensor/sensor.controller';
import { Sensor } from '~modules/sensor/sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor]), DefaultAdminModule],
  providers: [SensorService],
  exports: [SensorService, TypeOrmModule],
  controllers: [SensorController],
})
export class SensorModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    // Register the User entity under the "User" section
    adminSite.register('Sensor', Sensor);
  }
}
