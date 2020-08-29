import {
  endOfDay,
  endOfHour,
  endOfMonth,
  endOfWeek,
  endOfYear,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  getWeek,
  getYear,
  setDate,
  setHours,
  setMonth,
  setWeek,
  setYear,
  startOfDay,
  startOfHour,
  startOfMonth,
  startOfWeek,
  startOfYear
} from "date-fns";

export interface DateRegexGroupsInterface {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  week?: number;
}

export interface DateRangeInterface {
  from?: Date;
  to?: Date;
  groupBy?: RangeGroupByEnum;
}

export enum RangeGroupByEnum {
  MONTH = 'month',
  DAY = 'day',
  HOUR = 'hour',
}

export enum DateRangeEnum {
  year = "year",
  month = "month",
  week = "week",
  day = "day",
  hour = "hour",
  minute = "minute",
}

export type DateRegex = string;

export const DATETIME_REGEX = "MMMM d, yyyy HH:mm"; // August 31, 2020
export const DATE_REGEX = "MMMM d, yyyy"; // August 31, 2020
export const MONTH_YEAR_REGEX = "MMMM yyyy"; // August 31, 2020

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

  public static getRegexGroups(input: DateRegex): DateRegexGroupsInterface {
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
      groupBy = RangeGroupByEnum.DAY;
    } else if (range.week) {
      groupBy = RangeGroupByEnum.HOUR;
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

    if (range.hour) {
      start = setHours(start, range.hour);
      start = setDate(start, range.day);
      start = setMonth(start, range.month - 1);
      start = setYear(start, range.year);
      from = startOfHour(start);
      to = endOfHour(start);
    } else if (range.day) {
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
      start = setYear(start, range.year);
      from = startOfYear(start);
      to = endOfYear(start);
    }

    return {
      from,
      to,
    };
  }

  public static getDateString(date: Date, groupBy: DateRangeEnum): string {
    let dateString = '';

    switch (groupBy) {
      case DateRangeEnum.month:
        dateString = `${getYear(date)}/${getMonth(date) + 1}`;
        break;
      case DateRangeEnum.year:
        dateString = `${getYear(date)}`;
        break;
      case DateRangeEnum.day:
        dateString = `${getYear(date)}/${getMonth(date) + 1}/${getDate(date)}`;
        break;
      case DateRangeEnum.hour:
        dateString = `${getYear(date)}/${getMonth(date) + 1}/${getDate(
          date
        )} ${getHours(date)}`;
        break;
      case DateRangeEnum.minute:
        dateString = `${getYear(date)}/${getMonth(date) + 1}/${getDate(
          date
        )} ${getHours(date)}:${getMinutes(date)}`;
        break;
      case DateRangeEnum.week:
        dateString = `${getYear(date)}/w${getWeek(date)}`;
        break;
      default:
        break;
    }

    return dateString;
  }

  public static getNowDomain(date: DateRegex, groupBy: DateRangeEnum): number {
    const groups = this.getRegexGroups(date);
    const now = new Date();
    const nowGroups = this.getRegexGroups(
      this.getDateString(now, DateRangeEnum.minute)
    );
    const nowWeekGroups = this.getRegexGroups(
      this.getDateString(now, DateRangeEnum.week)
    );

    switch (groupBy) {
      case DateRangeEnum.hour:
        if (
          nowGroups.hour === groups.hour &&
          nowGroups.day === groups.day &&
          nowGroups.month === groups.month &&
          nowGroups.year === groups.year
        ) {
          return nowGroups.minute;
        }
        break;
      case DateRangeEnum.day:
        if (
          nowGroups.day === groups.day &&
          nowGroups.month === groups.month &&
          nowGroups.year === groups.year
        ) {
          return nowGroups.hour + nowGroups.minute / 60.0 + 1;
        }
        break;
      case DateRangeEnum.month:
        if (
          nowGroups.month === groups.month &&
          nowGroups.year === groups.year
        ) {
          return nowGroups.day;
        }
        break;
      case DateRangeEnum.week:
        if (
          nowWeekGroups.week === groups.week &&
          nowWeekGroups.year === groups.year
        ) {
          return getDay(now) + 1;
        }
        break;
      case DateRangeEnum.year:
        if (nowGroups.year === groups.year) {
          return nowGroups.month;
        }
        break;
      default:
        return undefined;
    }

    return undefined;
  }
}
