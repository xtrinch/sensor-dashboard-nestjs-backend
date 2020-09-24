import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForwarderService } from '~/modules/forwarder/forwarder.service';
import { ForwarderController } from '~modules/forwarder/forwarder.controller';
import { Forwarder } from '~modules/forwarder/forwarder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forwarder])],
  providers: [ForwarderService],
  exports: [ForwarderService, TypeOrmModule],
  controllers: [ForwarderController],
})
export class ForwarderModule {}
