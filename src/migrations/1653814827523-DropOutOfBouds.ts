import { MigrationInterface, QueryRunner } from 'typeorm';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

const measurementTypeProperties = {
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

export class DropOutOfBouds1653814827523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let cfg = measurementTypeProperties[MeasurementTypeEnum.TEMPERATURE];
    await queryRunner.query(
      `DELETE FROM "measurement" WHERE "measurementType" = '${MeasurementTypeEnum.TEMPERATURE}' AND ("measurement" < ${cfg.domain[0]} OR "measurement" > ${cfg.domain[1]})`,
    );

    cfg = measurementTypeProperties[MeasurementTypeEnum.HUMIDITY];
    await queryRunner.query(
      `DELETE FROM "measurement" WHERE "measurementType" = '${MeasurementTypeEnum.HUMIDITY}' AND ("measurement" < ${cfg.domain[0]} OR "measurement" > ${cfg.domain[1]})`,
    );

    cfg = measurementTypeProperties[MeasurementTypeEnum.PRESSURE];
    await queryRunner.query(
      `DELETE FROM "measurement" WHERE "measurementType" = '${MeasurementTypeEnum.PRESSURE}' AND ("measurement" < ${cfg.domain[0]} OR "measurement" > ${cfg.domain[1]})`,
    );

    cfg = measurementTypeProperties[MeasurementTypeEnum.BATTERY_VOLTAGE];
    await queryRunner.query(
      `DELETE FROM "measurement" WHERE "measurementType" = '${MeasurementTypeEnum.BATTERY_VOLTAGE}' AND ("measurement" < ${cfg.domain[0]} OR "measurement" > ${cfg.domain[1]})`,
    );

    cfg = measurementTypeProperties[MeasurementTypeEnum.RAW_BATTERY_VOLTAGE];
    await queryRunner.query(
      `DELETE FROM "measurement" WHERE "measurementType" = '${MeasurementTypeEnum.RAW_BATTERY_VOLTAGE}' AND ("measurement" < ${cfg.domain[0]} OR "measurement" > ${cfg.domain[1]})`,
    );

    cfg = measurementTypeProperties[MeasurementTypeEnum.GAS];
    await queryRunner.query(
      `DELETE FROM "measurement" WHERE "measurementType" = '${MeasurementTypeEnum.GAS}' AND ("measurement" < ${cfg.domain[0]} OR "measurement" > ${cfg.domain[1]})`,
    );

    cfg = measurementTypeProperties[MeasurementTypeEnum.ALTITUDE];
    await queryRunner.query(
      `DELETE FROM "measurement" WHERE "measurementType" = '${MeasurementTypeEnum.ALTITUDE}' AND ("measurement" < ${cfg.domain[0]} OR "measurement" > ${cfg.domain[1]})`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
