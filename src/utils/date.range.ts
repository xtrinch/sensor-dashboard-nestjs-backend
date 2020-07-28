import {
  startOfDay,
  endOfDay,
  endOfMonth,
  startOfMonth,
  startOfYear,
  endOfYear,
  setDate,
  setMonth,
} from 'date-fns';

export interface DateRegexInterface {
  year: number;
  month?: number;
  day?: number;
}

export interface DateRangeInterface {
  from?: Date;
  to?: Date;
  groupBy?: RangeGroupByEnum;
}

export enum RangeGroupByEnum {
  MONTH = 'month',
  DAY = 'day',
}

export class DateRange {
  public static regex = /^(?<year>[0-9]{4})(\/((?<month>[0-9]{1,2}(\/(?<day>[0-9]{1,2}))?)))?$/;

  public static parse(input: string): DateRangeInterface {
    const match = this.regex.exec(input);
    if (!match) {
      return {};
    }
    const { month, day, year } = match.groups;

    const ranges: DateRegexInterface = {
      year: year ? parseInt(year, 10) : undefined,
      month: month ? parseInt(month, 10) : undefined,
      day: day ? parseInt(day, 10) : undefined,
    };

    const groupBy = this.getGroupBy(ranges);
    const { from, to } = this.getFromTo(ranges);

    return {
      groupBy,
      from,
      to,
    };
  }

  public static getGroupBy(range: DateRegexInterface): RangeGroupByEnum | null {
    let groupBy: RangeGroupByEnum = null;
    if (!range.month) {
      groupBy = RangeGroupByEnum.MONTH;
    } else if (!range.day) {
      groupBy = RangeGroupByEnum.DAY;
    }
    return groupBy;
  }

  public static getFromTo(
    range: DateRegexInterface,
  ): {
    from: Date;
    to: Date;
  } {
    let from: Date;
    let to: Date;
    let start: Date = new Date();

    if (range.day) {
      start = setDate(new Date(), range.day);
      from = startOfDay(start);
      to = endOfDay(start);
    } else if (range.month) {
      start = setMonth(start, range.month - 1);
      from = startOfMonth(start);
      to = endOfMonth(start);
    } else {
      from = startOfYear(start);
      to = endOfYear(start);
    }

    return {
      from,
      to,
    };
  }
}
