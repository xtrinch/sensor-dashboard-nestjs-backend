import { parseISO } from "date-fns";
import { AbstractEntity } from "types/AbstractEntity";
import BoardTypeEnum from "types/BoardTypeEnum";
import { IotDeviceInterface } from "types/IotDeviceInterface";
import MeasurementTypeEnum from "types/MeasurementTypeEnum";
import SensorTypeEnum from "types/SensorTypeEnum";
import User, { UserId } from "types/User";

export type SensorId = number;

class Sensor extends AbstractEntity implements IotDeviceInterface {
  constructor(s) {
    super(s);

    this.name = s?.name || "";
    this.displayName = s?.displayName || "";
    this.type = s?.type || undefined;
    this.visible = s?.visible || true;
    this.expanded = false;
    this.id = s?.id;
    this.measurementTypes = s?.measurementTypes || [];
    this.userId = s?.userId;
    this.user = s?.user ? new User(s.user) : null;
    this.timezone = s?.timezone;
    this.boardType = s?.boardType;
    this.location = s?.location;
    this.accessToken = s?.accessToken;
    this.lastSeenAt = s?.lastSeenAt ? parseISO(s.lastSeenAt) : null;
    this.private = s?.private;
    this.sensorTypes = s?.sensorTypes;
  }

  public id: SensorId;

  public name: string;

  public displayName: string; // eslint-disable-line

  public type: MeasurementTypeEnum;

  public visible: boolean;

  public expanded: boolean;

  public measurementTypes: MeasurementTypeEnum[];

  public userId: UserId;

  public user: User;

  public location: string;

  public boardType: BoardTypeEnum;

  public sensorTypes: SensorTypeEnum[];

  public timezone: string;

  public accessToken: string;

  public lastSeenAt: Date;

  public private: boolean;

  public static measurementTypeProperties = {
    [MeasurementTypeEnum.ALTITUDE]: {
      domain: [0, 2000],
      unit: "m",
    },
    [MeasurementTypeEnum.GAS]: {
      domain: [0, 30],
      unit: "kΩ",
    },
    [MeasurementTypeEnum.HUMIDITY]: {
      domain: [0, 100],
      unit: "%",
    },
    [MeasurementTypeEnum.PRESSURE]: {
      domain: [900, 1050],
      unit: "hPa",
    },
    [MeasurementTypeEnum.TEMPERATURE]: {
      domain: [-20, 40],
      unit: "°C",
    },
  };
}

export default Sensor;
