import Measurement from "types/Measurement";
import { getHeaders, getUrl, processResponse } from "utils/http";

export default class MeasurementService {
  public static listMeasurements = async (queryParams) => {
    const url = getUrl("/measurements", queryParams);

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    for (const measureType of Object.keys(result)) {
      result[measureType] = result[measureType].map((m) => new Measurement(m));
    }

    return result;
  };
}
