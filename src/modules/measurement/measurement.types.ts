import { MeasurementTypeEnum } from './enum/measurement-type.enum';

// also check BE, should match
export const measurementTypeProperties = {
  [MeasurementTypeEnum.ALTITUDE]: {
    domain: [0, 2000],
    unit: 'm',
    decimalPlaces: 0,
  },
  [MeasurementTypeEnum.GAS]: {
    domain: [0, 30],
    unit: 'kΩ',
    decimalPlaces: 0,
  },
  [MeasurementTypeEnum.HUMIDITY]: {
    domain: [0, 100],
    unit: '%',
    decimalPlaces: 1,
  },
  [MeasurementTypeEnum.PRESSURE]: {
    domain: [90000, 105000],
    unit: 'Pa',
    decimalPlaces: 0,
  },
  [MeasurementTypeEnum.TEMPERATURE]: {
    domain: [-20, 40],
    unit: '°C',
    decimalPlaces: 1,
  },
  [MeasurementTypeEnum.BATTERY_VOLTAGE]: {
    domain: [2.8, 4.4],
    unit: 'V',
    decimalPlaces: 2,
  },
  [MeasurementTypeEnum.RAW_BATTERY_VOLTAGE]: {
    domain: [0, 8192], // 13 bit ADC
    unit: '',
    decimalPlaces: 0,
  },
};
