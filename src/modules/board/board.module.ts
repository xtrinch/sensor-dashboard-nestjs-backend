import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorModule } from '~modules/sensor/sensor.module';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Global()
@Module({
  providers: [BoardService],
  exports: [BoardService],
  imports: [TypeOrmModule.forFeature([Board]), SensorModule],
  controllers: [BoardController],
})
export class BoardModule {}
