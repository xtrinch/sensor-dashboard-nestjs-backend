import Sensor, { SensorId } from "types/Sensor";
import { getHeaders, getUrl, processResponse } from "utils/http";

export default class SensorService {
  public static listSensors = async (where: { [key: string]: any }) => {
    const url = getUrl("/sensors", where);

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    const sensors: Sensor[] = [];
    for (const item of result.items) {
      sensors.push(new Sensor(item));
    }

    return {
      meta: result.meta,
      items: sensors,
    };
  };

  public static listMySensors = async () => {
    const url = getUrl("/sensors/my");

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    const sensors: Sensor[] = [];
    for (const item of result.items) {
      sensors.push(new Sensor(item));
    }

    return {
      meta: result.meta,
      items: sensors,
    };
  };

  public static addSensor = async (
    sensor: Partial<Sensor>
  ): Promise<Sensor> => {
    const url = getUrl("/sensors");

    const resp = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
      body: JSON.stringify(sensor),
    });

    const result = await processResponse(resp);
    const s = new Sensor(result);
    return s;
  };

  public static updateSensor = async (
    id: SensorId,
    sensor: Partial<Sensor>
  ): Promise<Sensor> => {
    const url = getUrl(`/sensors/${id}`);

    const resp = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
      body: JSON.stringify(sensor),
    });

    const result = await processResponse(resp);
    const s = new Sensor(result);
    return s;
  };

  public static deleteSensor = async (
    id: SensorId
  ): Promise<{ success: string }> => {
    const url = getUrl(`/sensors/${id}`);

    const resp = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    return result;
  };

  public static getSensor = async (id: SensorId): Promise<Sensor> => {
    const url = getUrl(`/sensors/${id}`);

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    const s = new Sensor(result);
    return s;
  };
}
