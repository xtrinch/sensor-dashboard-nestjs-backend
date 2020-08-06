import { MeasurementDto } from "~modules/measurement/dto/measurement.dto";
import { MeasurementTypeEnum } from "~modules/measurement/enum/measurement-type.enum";
import Measurement from "~modules/measurement/measurement.entity";
import { SensorId } from "~modules/sensor/sensor.entity";
import { RangeGroupByEnum } from "~utils/date.range";

export interface MeasurementWhereInterface {
  from: Date;
  to: Date;
  measurementTypes: MeasurementTypeEnum[];
  groupBy?: RangeGroupByEnum;
  sensorIds: SensorId[];
}

export interface MeasurementAggregateDto {
  [SensorId: string]: { 
    [MeasurementTypeEnum: string] : MeasurementDto[] 
  }
}

export interface MeasurementAggregateInterface {
  [SensorId: string]: { 
    [MeasurementTypeEnum: string] : Measurement[] 
  }
}