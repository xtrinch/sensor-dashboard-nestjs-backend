import { DisplayMeasurementAggregateInterface } from '../measurement.interfaces';
import { MeasurementDisplayDto } from './measurement.display.dto';

export class DisplayMeasurementAggregateDto {
  [SensorId: string]: {
    info: {
      displayName: string;
    };
    measurements: {
      [MeasurementTypeEnum: string]: MeasurementDisplayDto;
    };
  };

  public static fromDisplayMeasurementAggregateInterface(
    items: DisplayMeasurementAggregateInterface,
  ): DisplayMeasurementAggregateDto {
    const response: DisplayMeasurementAggregateDto = {};
    Object.assign(response, items);

    // map the measurements to a DTO
    Object.keys(items).map((sensorIdKey) => {
      const measurementTypes = items[sensorIdKey].measurements;

      Object.keys(measurementTypes).map((measurementTypeKey) => {
        response[sensorIdKey].measurements[measurementTypeKey] =
          MeasurementDisplayDto.fromMeasurement(
            measurementTypes[measurementTypeKey],
          );
      });
    });

    return response;
  }
}
