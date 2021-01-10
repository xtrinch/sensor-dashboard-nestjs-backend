import DateFnsUtils from "@date-io/date-fns";
import { createStyles, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import withStyles, {
  CSSProperties,
  WithStyles,
} from "@material-ui/core/styles/withStyles";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import "date-fns";
import { addHours, getHours, isFuture } from "date-fns";
import React from "react";
import ColorsEnum from "types/ColorsEnum";
import { DateRange, DateRangeEnum, DateRegex } from "utils/date.range";
import { getZeroPaddedNumber } from "utils/number";

const styles = (theme) =>
  createStyles({
    timepicker: {
      "& input": {
        textAlign: "center",
        backgroundColor: ColorsEnum.BGLIGHTER,
        width: "100px",
      },
    },
  });

interface TimeInputProps {
  date: DateRegex;
  onChange: (date: string) => void;
  style?: CSSProperties;
  label?: string;
}

const TimeInput: React.FunctionComponent<
  TimeInputProps & WithStyles<typeof styles>
> = (props) => {
  const { label, date, onChange, classes } = props;

  const onChangeDate = (d: Date) => {
    let dateString = DateRange.getDateString(d, DateRangeEnum.hour);

    onChange(dateString);
  };

  const changeDate = (multiplier: number) => {
    let d = DateRange.parse(date).from;
    d = addHours(d, multiplier * 1);

    if (!isFuture(d)) {
      onChangeDate(d);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container alignItems="center" spacing={4}>
        <Grid item>
          <IconButton size="small" onClick={() => changeDate(-1)}>
            <ArrowBack style={{ cursor: "pointer" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <TimePicker
            className={classes.timepicker}
            margin="none"
            id="time-picker"
            label={label}
            value={DateRange.parse(date).from}
            onChange={onChangeDate}
            inputVariant="outlined"
            ampm={false}
            size="small"
            views={["hours"]}
            labelFunc={(date) =>
              `${getZeroPaddedNumber(
                getHours(date)
              )}:00 - ${getZeroPaddedNumber(getHours(date) + 1)}:00`
            }
            autoOk
          />
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={() => changeDate(1)}>
            <ArrowForward style={{ cursor: "pointer" }} />
          </IconButton>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(TimeInput);
