import { format } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import { Measurement } from '~modules/measurement/measurement.entity';
import {
  DisplayMeasurementAggregateInterface,
  MeasurementAggregateInterface,
  MeasurementWhereInterface
} from '~modules/measurement/measurement.interfaces';
import { Sensor } from '~modules/sensor/sensor.entity';
import { RangeGroupByEnum } from '~utils/date.range';

@EntityRepository(Measurement)
export class MeasurementRepository extends Repository<Measurement> {
  public async getLatest(
    where: MeasurementWhereInterface,
  ): Promise<DisplayMeasurementAggregateInterface> {
    const r = await this.manager.query(
      `
      SELECT DISTINCT ON ("sensorId", "measurementType")
        last_value("measurement"."createdAt") OVER w as "createdAt",
        last_value("measurement") OVER w as "measurement",
        last_value("sensorId") OVER w as "sensorId",
        last_value("measurementType") OVER w as "measurementType",
        last_value("displayName") OVER w as "displayName"
        FROM "measurement"
        LEFT JOIN "sensor" on "sensor".id = "measurement"."sensorId"
        WHERE "measurementType" = ANY ($2) AND "sensorId" = ANY ($1)
        WINDOW w AS (
          PARTITION BY "sensorId", "measurementType" ORDER BY "measurement"."createdAt" DESC
          ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
        );
    `,
      [where.sensorIds, where.measurementTypes],
    );

    const res = r.reduce(
      (
        acc: DisplayMeasurementAggregateInterface,
        curr: Measurement & Sensor,
      ) => {
        if (!acc[curr.sensorId]) {
          acc[curr.sensorId] = {
            info: {
              displayName: curr.displayName,
            },
            measurements: {},
          };
        }

        acc[curr.sensorId].measurements[curr.measurementType] = curr;
        return acc;
      },
      {},
    );

    return res;
  }

  public async groupBy(
    where: MeasurementWhereInterface,
  ): Promise<MeasurementAggregateInterface> {
    let timeFormat: string;

    switch (where.groupBy) {
      case RangeGroupByEnum.DAY:
        timeFormat = 'YYYY/MM/DD';
        break;
      case RangeGroupByEnum.MONTH:
        timeFormat = 'YYYY/MM';
        break;
      case RangeGroupByEnum.HOUR:
        timeFormat = 'YYYY/MM/DD HH24';
        break;
      default:
        timeFormat = 'YYYY/MM/DD HH24:MI';
        break;
    }

    const r = await this.manager.query(
      `
      SELECT 
        "measurementType", 
        to_char("createdAt", '${timeFormat}') AS aggregate, 
        ROUND(AVG("measurement")::numeric, 2) as "measurement",
        to_char(MIN("createdAt"), '${timeFormat}') as "createdAt",
        "sensorId"
      FROM (
        SELECT 
          "measurement"."createdAt"::timestamptz AT TIME ZONE "timezone" as "createdAt", 
          "measurement"."measurementType", 
          "measurement"."measurement"::numeric,
          "sensor"."timezone",
          "measurement"."sensorId"
        FROM "measurement"
        LEFT JOIN "sensor" on "sensor".id = "measurement"."sensorId"
        WHERE "sensor"."id" = ANY ($1)
      ) as sq
      WHERE "measurementType" = ANY ($2)  
        AND "createdAt" BETWEEN 
        '${format(where.from, 'yyyy-MM-dd HH:mm:ss')}'
        AND '${format(where.to, 'yyyy-MM-dd HH:mm:ss')}'
      GROUP BY "measurementType", "aggregate", "sensorId"
      ORDER BY "createdAt" DESC
    `,
      [where.sensorIds, where.measurementTypes],
    );

    const res = r.reduce(
      (acc: MeasurementAggregateInterface, curr: Measurement) => {
        if (!acc[curr.measurementType]) {
          acc[curr.measurementType] = [];
        }

        // if (!acc[curr.measurementType][curr.sensorId]) {
        //   acc[curr.measurementType][curr.sensorId] = [];
        // }

        //acc[curr.measurementType][curr.sensorId].push(curr);
        acc[curr.measurementType].push(curr);

        return acc;
      },
      {},
    );

    return res;
  }
}
