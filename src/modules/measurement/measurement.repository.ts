import { format } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import Measurement from '~modules/measurement/measurement.entity';
import { MeasurementAggregateInterface, MeasurementWhereInterface } from '~modules/measurement/measurement.interfaces';
import { RangeGroupByEnum } from '~utils/date.range';

@EntityRepository(Measurement)
export class MeasurementRepository extends Repository<Measurement> {
  public async groupBy(
    where: MeasurementWhereInterface,
  ): Promise<MeasurementAggregateInterface> {
    let timeFormat;

    switch (where.groupBy) {
      case RangeGroupByEnum.DAY:
        timeFormat = 'YYYY/MM/DD';
        break;
      case RangeGroupByEnum.MONTH:
        timeFormat = 'YYYY/MM';
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
        if (!acc[curr.sensorId]) {
          acc[curr.sensorId] = {};
        }

        if (!acc[curr.sensorId][curr.measurementType]) {
          acc[curr.sensorId][curr.measurementType] = [];
        }

        acc[curr.sensorId][curr.measurementType].push(curr);
        return acc;
      },
      {},
    );

    return res;
  }
}
