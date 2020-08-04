import {
  startOfDay,
  endOfDay,
  endOfMonth,
  startOfMonth,
  startOfYear,
  endOfYear,
  setDate,
  setMonth,
  setYear,
  setWeek,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

export interface DateRegexGroupsInterface {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  week?: number;
}

export interface DateRangeInterface {
  from: Date;
  to: Date;
  groupBy?: RangeGroupByEnum;
}

export enum RangeGroupByEnum {
  MONTH = 'month',
  DAY = 'day',
}

export type DateRegex = string;

export class DateRange {
  public static regex = /^(?<year>[0-9]{4})(\/((?<month>[0-9]{1,2})|(w(?<week>[0-9]{1,2})))(\/(?<day>[0-9]{1,2})( (?<hour>[0-9]{1,2})(:(?<minute>[0-9]{1,2}))?)?)?)?$/;

  public static parse(input: string): DateRangeInterface {
    const ranges = this.getRegexGroups(input);

    const groupBy = this.getGroupBy(ranges);
    const { from, to } = this.getFromTo(ranges);

    return {
      groupBy,
      from,
      to,
    };
  }

  public static getRegexGroups(input: string): DateRegexGroupsInterface {
    const match = this.regex.exec(input);
    if (!match) {
      return {};
    }
    const { month, day, year, hour, minute, week } = match.groups;

    const ranges: DateRegexGroupsInterface = {
      year: year ? parseInt(year, 10) : undefined,
      month: month ? parseInt(month, 10) : undefined,
      day: day ? parseInt(day, 10) : undefined,
      hour: hour ? parseInt(hour, 10) : undefined,
      minute: minute ? parseInt(minute, 10) : undefined,
      week: week ? parseInt(week, 10) : undefined,
    };

    return ranges;
  }

  public static getGroupBy(
    range: DateRegexGroupsInterface,
  ): RangeGroupByEnum | null {
    let groupBy: RangeGroupByEnum = null;
    if (!range.month && !range.week) {
      groupBy = RangeGroupByEnum.MONTH;
    } else if (!range.day) {
      groupBy = RangeGroupByEnum.DAY;
    }
    return groupBy;
  }

  public static getFromTo(
    range: DateRegexGroupsInterface,
  ): {
    from: Date;
    to: Date;
  } {
    let from: Date;
    let to: Date;
    let start: Date = new Date();

    if (range.day) {
      start = setDate(start, range.day);
      start = setMonth(start, range.month - 1);
      start = setYear(start, range.year);
      from = startOfDay(start);
      to = endOfDay(start);
    } else if (range.month) {
      start = setMonth(start, range.month - 1);
      start = setYear(start, range.year);
      from = startOfMonth(start);
      to = endOfMonth(start);
    } else if (range.week) {
      start = setYear(start, range.year);
      start = setWeek(start, range.week);
      from = startOfWeek(start);
      to = endOfWeek(start);
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
