import DateFnsUtils from "@date-io/date-fns";
import { createStyles, Grid, IconButton } from "@material-ui/core";
import withStyles, {
  CSSProperties,
  WithStyles,
} from "@material-ui/core/styles/withStyles";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import {
  DatePicker,
  DatePickerView,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import clsx from "clsx";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  isValid,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import React, { useCallback, useEffect } from "react";
import ColorsEnum from "types/ColorsEnum";
import {
  DateRange,
  DateRangeEnum,
  DateRegex,
  DATE_REGEX,
  MONTH_YEAR_REGEX,
} from "utils/date.range";

const styles = (theme) =>
  createStyles({
    datepicker: {
      "& fieldset": {},
      "& input": {
        textAlign: "center",
        cursor: "pointer",
        paddingTop: "11px",
        paddingBottom: "10px",
      },
      backgroundColor: ColorsEnum.BGLIGHTER,
      border: `1px solid ${ColorsEnum.GRAYDARK}`,
      borderRadius: "0px",
      "&:hover:before": {
        borderBottom: "0px",
      },
      "&:before": {
        borderBottom: "0px",
      },
    },
    dayWrapper: {
      position: "relative",
    },
    day: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: "0 2px",
      color: "inherit",
    },
    customDayHighlight: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "2px",
      right: "2px",
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "50%",
    },
    nonCurrentMonthDay: {
      color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
      color: "#676767",
    },
    highlight: {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    firstHighlight: {
      extend: "highlight",
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    },
    endHighlight: {
      extend: "highlight",
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    },
  });
export interface DateInputProps {
  style?: CSSProperties;
  label?: string;
  disabled?: boolean;
  onChange?: (e: string) => void;
  date?: DateRegex;
  groupBy?: DateRangeEnum; // date selector input state
}

const DateInput: React.FunctionComponent<
  DateInputProps & WithStyles<typeof styles>
> = (props) => {
  const { groupBy, onChange, date, classes } = props;

  const onChangeDate = useCallback(
    (d: Date) => {
      const date = new Date(d);
      let dateString = DateRange.getDateString(date, groupBy);

      onChange(dateString);
    },
    [groupBy, onChange]
  );

  useEffect(() => {
    // reset date on group change
    onChangeDate(new Date());
  }, [groupBy, onChangeDate]);

  const renderLabel = (date, invalidLabel) => {
    if (!isValid(date)) {
      return invalidLabel;
    }

    switch (props.groupBy) {
      case DateRangeEnum.day:
      case DateRangeEnum.hour:
        return `${format(date, DATE_REGEX)}`;
      case DateRangeEnum.month:
        return `${format(startOfMonth(date), MONTH_YEAR_REGEX)}`;
      case DateRangeEnum.week:
        return `Week of ${format(startOfWeek(date), DATE_REGEX)}`;
      case DateRangeEnum.year:
        return `${format(startOfYear(date), "yyyy")}`;
      default:
        return "";
    }
  };

  const renderDate = (date, selectedDate, dayInCurrentMonth) => {
    const dateClone = new Date(date);
    const selectedDateClone = new Date(selectedDate);
    let start;
    let end;

    switch (props.groupBy) {
      case DateRangeEnum.hour:
      case DateRangeEnum.day:
      case DateRangeEnum.month:
      case DateRangeEnum.year:
        start = selectedDateClone;
        end = selectedDateClone;
        break;
      case DateRangeEnum.week:
        start = startOfWeek(selectedDateClone);
        end = endOfWeek(selectedDateClone);
        break;
      default:
        break;
    }

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(dateClone, "d")} </span>
        </IconButton>
      </div>
    );
  };

  const getView = (): DatePickerView[] => {
    switch (props.groupBy) {
      case DateRangeEnum.day:
      case DateRangeEnum.hour:
        return ["year", "month", "date"];
      case DateRangeEnum.month:
        return ["month", "year"];
      case DateRangeEnum.week:
        return ["year", "month", "date"];
      case DateRangeEnum.year:
        return ["year"];
      default:
        return ["year", "month", "date"];
    }
  };

  const changeDate = (multiplier: number) => {
    let func: Function;

    let d = DateRange.parse(date).from;
    switch (props.groupBy) {
      case DateRangeEnum.day:
      case DateRangeEnum.hour:
        func = addDays;
        break;
      case DateRangeEnum.month:
        func = addMonths;
        break;
      case DateRangeEnum.week:
        func = addWeeks;
        break;
      case DateRangeEnum.year:
        func = addYears;
        break;
      default:
        break;
    }

    d = func(d, multiplier * 1);
    if (!isFuture(d)) {
      onChangeDate(d);
    }
  };

  return (
    <div style={{ ...props.style }}>
      <Grid
        container
        alignItems="center"
        spacing={4}
        style={{ flexWrap: "nowrap" }}
      >
        <Grid item>
          <IconButton size="small" onClick={() => changeDate(-1)}>
            <ArrowBack style={{ cursor: "pointer" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              size="small"
              style={{ maxWidth: "170px", flex: "1" }}
              views={getView()}
              label=""
              format="MM/dd/yyyy"
              value={DateRange.parse(date).from}
              onChange={(e: Date) => onChangeDate(e)}
              inputVariant="filled"
              disabled={props.disabled ? props.disabled : false}
              InputProps={{
                className: classes.datepicker,
              }}
              renderDay={renderDate}
              labelFunc={renderLabel}
              margin={"none"}
              disableFuture={true}
              autoOk
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={() => changeDate(1)}>
            <ArrowForward style={{ cursor: "pointer" }} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(DateInput);
