import { EntityRepository, Repository } from 'typeorm';
import { format } from 'date-fns';
import { RangeGroupByEnum } from '~utils/date.range';
import Measurement from '~modules/measurement/measurement.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorId } from '~modules/sensor/sensor.entity';

export interface MeasurementWhereInterface {
  from: Date;
  to: Date;
  measurementTypes: MeasurementTypeEnum[];
  groupBy?: RangeGroupByEnum;
  sensorIds: SensorId[];
}

@EntityRepository(Measurement)
export class MeasurementRepository extends Repository<Measurement> {
  public async groupBy(
    where: MeasurementWhereInterface,
  ): Promise<{ [key: string]: Measurement[] }> {
    let timeFormat;
    // TODO: eventually require sensor ids and use the sensor timezone
    const timezone = 'Europe/Ljubljana';

    switch (where.groupBy) {
      case RangeGroupByEnum.DAY:
        timeFormat = 'YYYY/MM/DD';
        break;
      case RangeGroupByEnum.MONTH:
        timeFormat = 'YYYY/MM';
        break;
      default:
        timeFormat = 'YYYY/MM/DD/HH24/MI';
        break;
    }

    const r = await this.manager.query(
      `
      SELECT 
        "measurementType", 
        to_char("createdAt", '${timeFormat}') AS aggregate, 
        ROUND(AVG("measurement")::numeric, 2) as "measurement",
        to_char(MIN("createdAt"), '${timeFormat}') as "createdAt"
      FROM (
        SELECT 
          "measurement"."createdAt"::timestamptz AT TIME ZONE "timezone" as "createdAt", 
          "measurement"."measurementType", 
          "measurement"."measurement"::numeric,
          "sensor"."timezone"
        FROM "measurement"
        LEFT JOIN "sensor" on "sensor".id = "measurement"."sensorId"
        WHERE "sensor"."id" = ANY ($1)
      ) as sq
      WHERE "measurementType" = ANY ($2)  
        AND "createdAt" BETWEEN 
        '${format(where.from, 'yyyy-MM-dd HH:mm:ss')}'
        AND '${format(where.to, 'yyyy-MM-dd HH:mm:ss')}'
      GROUP BY "measurementType", "aggregate"
      ORDER BY "createdAt" DESC
    `,
      [where.sensorIds, where.measurementTypes],
    );

    const res = r.reduce(
      (acc: { [key: string]: Measurement[] }, curr: Measurement) => {
        if (!acc[curr.measurementType]) {
          acc[curr.measurementType] = [];
        }
        acc[curr.measurementType].push(curr);
        return acc;
      },
      {},
    );

    return res;
  }
}
