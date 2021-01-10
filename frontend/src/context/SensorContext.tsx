import { AccountContext, AccountContextState } from "context/AccountContext";
import { addToast } from "context/ToastContext";
import React, {
  Context,
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import SensorService from "services/SensorService";
import Sensor, { SensorId } from "types/Sensor";
import { Toast } from "types/Toast";

export const clearMySensors = () => {
  SensorContext.dispatch({
    type: "mySensorsReady",
    payload: [],
  });
};

export const reloadSensors = async (accountContext: AccountContextState) => {
  try {
    let resp = await SensorService.listSensors({ page: 1, limit: 1000 });
    let sensorData = resp.items;
    if (accountContext.loginState === "LOGGED_IN") {
      sensorData.map((s) => {
        s.visible = false;
        if (s.userId === accountContext.user?.id) {
          s.visible = true;
        }
        return s;
      });
    }

    SensorContext.dispatch({
      type: "sensorsReady",
      payload: sensorData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const reloadMySensors = async () => {
  const resp = await SensorService.listMySensors();
  resp.items.map((s) => {
    s.visible = true;
    return s;
  });
  const mySensorData = resp.items;

  SensorContext.dispatch({
    type: "mySensorsReady",
    payload: mySensorData,
  });
};

export const addSensor = async (sensor: Partial<Sensor>): Promise<Sensor> => {
  const s = await SensorService.addSensor(sensor);

  SensorContext.dispatch({
    type: "addSensor",
    payload: s,
  });

  addToast(
    new Toast({ message: "Successfully added a sensor", type: "success" })
  );

  return s;
};

export const updateSensor = async (
  id: SensorId,
  sensor: Partial<Sensor>
): Promise<Sensor> => {
  const s = await SensorService.updateSensor(id, sensor);

  SensorContext.dispatch({
    type: "updateSensor",
    payload: s,
  });

  addToast(
    new Toast({ message: "Successfully updated the sensor", type: "success" })
  );

  return s;
};

export const toggleSensorVisibility = async (sensor: Sensor) => {
  sensor.visible = !sensor.visible;
  if (!sensor.visible) {
    sensor.expanded = false;
  }
  SensorContext.dispatch({
    type: "updateSensor",
    payload: sensor,
  });
};

export const deleteSensor = async (id: SensorId): Promise<boolean> => {
  await SensorService.deleteSensor(id);

  SensorContext.dispatch({
    type: "deleteSensor",
    payload: id,
  });

  addToast(
    new Toast({ message: "Successfully deleted the sensor", type: "success" })
  );

  return true;
};

type SensorContextState = {
  sensorsLoaded: boolean;
  mySensorsLoaded: boolean;
  sensors: Sensor[];
  mySensors: Sensor[];
};

const initialState: SensorContextState = {
  sensors: [],
  mySensors: [],
  sensorsLoaded: false,
  mySensorsLoaded: false,
};

export type SensorActionTypes =
  | { type: "sensorsReady"; payload: Sensor[] }
  | { type: "updateSensor"; payload: Sensor }
  | { type: "addSensor"; payload: Sensor }
  | { type: "deleteSensor"; payload: SensorId }
  | { type: "mySensorsReady"; payload: Sensor[] };

const SensorContext = createContext<[SensorContextState, React.Dispatch<any>]>(
  null
) as Context<[SensorContextState, Dispatch<any>]> & {
  dispatch: React.Dispatch<any>;
};

let reducer = (
  state: SensorContextState,
  action: SensorActionTypes
): SensorContextState => {
  switch (action.type) {
    case "sensorsReady":
      return { ...state, sensors: action.payload, sensorsLoaded: true };
    case "mySensorsReady":
      return { ...state, mySensors: action.payload, mySensorsLoaded: true };
    case "updateSensor":
      const sensors = state.mySensors;
      const sensorIndex = sensors.findIndex((s) => s.id === action.payload.id);
      sensors[sensorIndex] = action.payload;
      return { ...state, mySensors: [...sensors] };
    case "deleteSensor":
      const deleteMySensorIndex = state.mySensors.findIndex(
        (s) => s.id === action.payload
      );
      state.mySensors.splice(deleteMySensorIndex, 1);
      const deleteSensorIndex = state.sensors.findIndex(
        (s) => s.id === action.payload
      );
      state.sensors.splice(deleteSensorIndex, 1);
      return { ...state };
    case "addSensor":
      return { ...state, mySensors: [...state.mySensors, action.payload] };
    default: {
      return { ...state, sensors: [] };
    }
  }
};

function SensorContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);
  let [accountContext] = useContext(AccountContext);

  useEffect(() => {
    if (!state.sensorsLoaded) {
      reloadSensors(accountContext);
      if (accountContext.loginState === "LOGGED_IN") {
        reloadMySensors();
      }
    }
  }, [state, accountContext]); // The empty array causes this effect to only run on mount

  return (
    <SensorContext.Provider value={[state, dispatch]}>
      {props.children}
    </SensorContext.Provider>
  );
}

export { SensorContext, SensorContextProvider };
