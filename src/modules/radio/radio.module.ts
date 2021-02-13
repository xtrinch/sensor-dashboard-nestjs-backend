import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadioService } from '~/modules/radio/radio.service';
import { RadioController } from '~modules/radio/radio.controller';
import { Radio } from '~modules/radio/radio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Radio]),
    ClientsModule.register([
      { name: 'MQTT_CLIENT', transport: Transport.MQTT },
    ]),
  ],
  providers: [RadioService],
  exports: [RadioService, TypeOrmModule],
  controllers: [RadioController],
})
export class RadioModule {}
