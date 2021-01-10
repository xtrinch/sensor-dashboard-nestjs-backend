import { Card, createStyles, Typography } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";
import TimeSeriesChart, { ChartPoint } from "components/TimeSeriesChart";
import { SensorContext } from "context/SensorContext";
import {
  addDays,
  addMonths,
  format,
  getDate,
  getDaysInMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { uniqBy } from "lodash";
import React, { useContext } from "react";
import { AxisDomain } from "recharts";
import ColorsEnum from "types/ColorsEnum";
import DomainTypeEnum from "types/DomainTypeEnum";
import Measurement from "types/Measurement";
import MeasurementTypeEnum, {
  MeasurementTypeLabelsEnum,
} from "types/MeasurementTypeEnum";
import Sensor from "types/Sensor";
import {
  DateRange,
  DateRangeEnum,
  DateRegex,
  DateRegexGroupsInterface,
} from "utils/date.range";
import { getSpacePaddedNumber, getZeroPaddedNumber } from "utils/number";

const styles = () =>
  createStyles({
    root: {
      borderBottom: `1px solid ${ColorsEnum.BGLIGHTER}`,
      boxShadow: "none",
      borderRadius: "0px",
      backgroundColor: ColorsEnum.BGDARK,
      padding: "15px",
      "& svg": {
        overflow: "visible",
      },
      "&:nth-of-type(2n + 1)": {
        borderRight: `1px solid ${ColorsEnum.BGLIGHTER}`,
      },
    },
    picker: {
      marginRight: "10px",
      marginBottom: "10px",
      width: "170px",
    },
    noResults: {
      width: "100%",
      height: "calc(100% - 110px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });

interface SensorCanvasProps {
  type: MeasurementTypeEnum;
  date: DateRegex;
  groupBy: DateRangeEnum;
  measurements: Measurement[];
  domain: DomainTypeEnum;
}

const SensorCanvas: React.FunctionComponent<
  SensorCanvasProps & WithStyles<typeof styles>
> = (props) => {
  const { type, classes, date, groupBy, measurements, domain } = props;
  const [{ sensors, mySensors }] = useContext(SensorContext);
  const allSensors = uniqBy(
    [...mySensors, ...sensors],
    (s: Sensor) => s.id
  ).filter((s) => s.visible);

  const groupByProperties = {
    [DateRangeEnum.hour]: {
      unit: "",
      tickFormatter: (d) => `${getSpacePaddedNumber(d)}`,
      ticks: Array.from({ length: 61 }, (data, i) => i),
      getTimeDomain: (params: DateRegexGroupsInterface) => params.minute,
    },
    [DateRangeEnum.day]: {
      unit: "h",
      tickFormatter: (d) => `${getZeroPaddedNumber(d - 1)}`,
      ticks: Array.from({ length: 25 }, (data, i) => i + 1),
      getTimeDomain: (params: DateRegexGroupsInterface) =>
        params.hour + params.minute / 60.0 + 1,
    },
    [DateRangeEnum.week]: {
      unit: "",
      tickFormatter: (d) => `${format(addDays(startOfWeek(d), d), "EE")}`,
      ticks: Array.from({ length: 8 }, (data, i) => i),
      getTimeDomain: (params: DateRegexGroupsInterface) => {
        const dateFrom = DateRange.parse(date).from;
        let dayInWeek = params.day - getDate(dateFrom) + params.hour / 24;

        // if week spans two different months
        if (dayInWeek < 0) {
          dayInWeek += getDaysInMonth(dateFrom);
        }
        return dayInWeek;
      },
    },
    [DateRangeEnum.month]: {
      unit: ".",
      tickFormatter: (d) => `${d}`,
      ticks: Array.from(
        { length: getDaysInMonth(DateRange.parse(date).from) },
        (data, i) => i + 1
      ),
      getTimeDomain: (params: DateRegexGroupsInterface) => params.day,
    },
    [DateRangeEnum.year]: {
      unit: "",
      tickFormatter: (d) =>
        `${format(addMonths(startOfYear(d), d - 1), "LLL")}`,
      ticks: Array.from({ length: 12 }, (data, i) => i + 1),
      getTimeDomain: (params: DateRegexGroupsInterface) =>
        params.month + params.day / getDaysInMonth(params.month),
    },
  };

  let chartData = allSensors.map((s, index) => ({
    name: `${s.id}`,
    sensorId: s.id,
    ordering: index,
    label: s.name,
  }));

  let data: ChartPoint[] = measurements.map((m: Measurement) => ({
    name: `${m.sensorId}`,
    time: groupByProperties[groupBy].getTimeDomain(
      DateRange.getRegexGroups(m.createdAt)
    ),
    labelTime: m.createdAt,
    [m.sensorId]: m.measurement,
  }));

  let newData: ChartPoint[] = [];
  for (let d of data) {
    const item = newData.find((dd) => dd.labelTime === d.labelTime);
    if (item) {
      item[d.name] = d[d.name];
    } else {
      newData.push(d);
    }
  }

  return (
    <>
      <Card className={classes.root}>
        <Typography variant="h6" style={{ marginBottom: "7px" }}>
          {MeasurementTypeLabelsEnum[type]}
        </Typography>
        {measurements && (
          <TimeSeriesChart
            data={newData}
            chartData={chartData}
            ticks={groupByProperties[groupBy].ticks}
            tickFormatter={groupByProperties[groupBy].tickFormatter}
            dotSize={
              groupBy === DateRangeEnum.month || groupBy === DateRangeEnum.hour
                ? 35
                : 10
            }
            domain={
              domain === DomainTypeEnum.FULL
                ? (Sensor.measurementTypeProperties[type].domain as [
                    AxisDomain,
                    AxisDomain
                  ])
                : ["auto", "auto"]
            }
            unit={{
              y: Sensor.measurementTypeProperties[type].unit,
              x: groupByProperties[groupBy].unit,
            }}
            nowX={DateRange.getNowDomain(date, groupBy)}
          />
        )}
      </Card>
    </>
  );
};

export default withStyles(styles)(SensorCanvas);
