import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisplayService } from '~/modules/display/display.service';
import { DisplayController } from '~modules/display/display.controller';
import { Display } from '~modules/display/display.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Display])],
  providers: [DisplayService],
  exports: [DisplayService, TypeOrmModule],
  controllers: [DisplayController],
})
export class DisplayModule {}
