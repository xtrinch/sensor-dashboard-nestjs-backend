import { DisplayMeasurementAggregateDto } from '~modules/measurement/dto/display.measurement.aggregate.dto';
import { DisplayMeasurementAggregateInterface } from '~modules/measurement/measurement.interfaces';
import { BoardObjectInterface } from '../display.interfaces';

export interface BoardObjectDto {
  height: number;
  width: number;
  left: number;
  top: number;
  type: 'rect' | 'i-text' | 'group';
  subType: 'temperature' | 'humidity';
  angle: number;
}

export class DisplayCanvasDto {
  public objects: BoardObjectDto[];
  public measurements: DisplayMeasurementAggregateDto;

  public static fromStateAndMeasurements(
    objects: BoardObjectInterface[],
    measurements: DisplayMeasurementAggregateInterface,
  ): DisplayCanvasDto {
    const dto = {} as DisplayCanvasDto;

    const measurementsDto =
      DisplayMeasurementAggregateDto.fromDisplayMeasurementAggregateInterface(
        measurements,
      );

    dto.measurements = measurementsDto;
    dto.objects = objects.map((o) => ({
      angle: o.angle,
      height: o.height,
      width: o.width,
      top: o.top,
      left: o.left,
      type: o.type,
      subType: o.subType,
    }));
    return dto;
  }
}
