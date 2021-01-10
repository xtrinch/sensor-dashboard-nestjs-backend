import MeasurementTypeEnum from "types/MeasurementTypeEnum";
import { SensorId } from "types/Sensor";

class Measurement {
  constructor(m?: Measurement) {
    this.createdAt = m?.createdAt || undefined;
    this.measurement = m?.measurement || 0;
    this.sensorId = m?.sensorId;
  }

  public createdAt: string; // partial date

  public measurement: number;

  public measurementType: MeasurementTypeEnum;

  public sensorId: SensorId;
}

export default Measurement;
