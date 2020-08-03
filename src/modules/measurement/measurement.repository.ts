import { EntityRepository, Repository } from 'typeorm';
import { format } from 'date-fns';
import { RangeGroupByEnum } from '~utils/date.range';
import Measurement from '~modules/measurement/measurement.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

export interface MeasurementWhereInterface {
  from?: Date;
  to?: Date;
  measurementTypes?: MeasurementTypeEnum[];
  groupBy?: RangeGroupByEnum;
}

@EntityRepository(Measurement)
export class MeasurementRepository extends Repository<Measurement> {
  public async groupBy(
    where: MeasurementWhereInterface,
  ): Promise<{ [key: string]: Measurement[] }> {
    let timeFormat;
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
          "createdAt"::timestamptz AT TIME ZONE '${timezone}' as "createdAt", 
          "measurementType", 
          "measurement"::numeric 
        FROM "measurement"
      ) as sq
      ${
        where.measurementTypes?.length || (where.from && where.to)
          ? ' WHERE '
          : ''
      }
      ${where.measurementTypes?.length ? `"measurementType" = ANY ($1)` : ''}
      ${where.measurementTypes?.length && where.from && where.to ? ' AND ' : ''}
      ${
        where.from && where.to
          ? `"createdAt" BETWEEN 
      '${format(where.from, 'yyyy-MM-dd HH:mm:ss')}'
      AND '${format(where.to, 'yyyy-MM-dd HH:mm:ss')}'`
          : ''
      }
      GROUP BY "measurementType", "aggregate"
      ORDER BY "createdAt" DESC
    `,
      where.measurementTypes?.length ? [where.measurementTypes] : [],
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
