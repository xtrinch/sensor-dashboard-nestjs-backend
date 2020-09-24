import { MeasurementDto } from '~modules/measurement/dto/measurement.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { Measurement } from '~modules/measurement/measurement.entity';
import { SensorId } from '~modules/sensor/sensor.entity';
import { RangeGroupByEnum } from '~utils/date.range';

export interface MeasurementWhereInterface {
  from?: Date;
  to?: Date;
  measurementTypes: MeasurementTypeEnum[];
  groupBy?: RangeGroupByEnum;
  sensorIds: SensorId[];
}

export interface MeasurementAggregateInterface {
  [MeasurementTypeEnum: string]: {
    [SensorId: string]: Measurement[];
  };
}

export interface MeasurementAggregateDto {
  [MeasurementTypeEnum: string]: {
    [SensorId: string]: MeasurementDto[];
  };
}

export interface DisplayMeasurementAggregateInterface {
  [SensorId: string]: {
    info: {
      displayName: string;
    };
    measurements: {
      [MeasurementTypeEnum: string]: Measurement;
    };
  };
}

export interface DisplayMeasurementAggregateDto {
  [SensorId: string]: {
    info: {
      displayName: string;
    };
    measurements: {
      [MeasurementTypeEnum: string]: MeasurementDto;
    };
  };
}
