import {
  Button,
  ButtonGroup,
  createStyles,
  Grid,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import DateInput from "components/DateInput";
import TopBar from "components/TopBar";
import { AppContext, setDomain } from "context/AppContext";
import React, { useCallback, useContext } from "react";
import ColorsEnum from "types/ColorsEnum";
import DomainTypeEnum from "types/DomainTypeEnum";
import { DateRangeEnum } from "utils/date.range";
import TimeInput from "./TimeInput";

const styles = (theme) =>
  createStyles({
    dateButtonGroup: {
      backgroundColor: ColorsEnum.BGLIGHTER,
      "& button": {
        borderRadius: "0px",
        border: `1px solid ${ColorsEnum.GRAYDARK}`,
        "&:hover": {
          border: `1px solid ${ColorsEnum.GRAYDARK}`,
        },
        color: ColorsEnum.GRAY,
      },
      maxWidth: "calc(100vw - 40px)",
    },
    activeButton: {
      backgroundColor: ColorsEnum.BLUE,
      color: `${ColorsEnum.WHITE}!important`,
      border: `1px solid ${ColorsEnum.BLUE}`,
      "&:hover": {
        backgroundColor: ColorsEnum.BLUE,
      },
    },
    timePicker: {
      backgroundColor: ColorsEnum.BGLIGHT,
      padding: "13px 20px",
      [theme.breakpoints.up("md")]: {
        left: "270px",
      },
      boxShadow: "none",
    },
    dateGridItem: {
      [theme.breakpoints.down("sm")]: {
        marginRight: "0px",
        marginLeft: "auto",
      },
    },
  });

const TopMenu: React.FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const { classes } = props;

  const [{ groupBy, date, domain }, dispatch] = useContext(AppContext);

  const onChangeGroupBy = useCallback(
    (val) => {
      dispatch({
        type: "setGroupBy",
        payload: val,
      });
    },
    [dispatch]
  );

  const onChangeDate = useCallback(
    (val) => {
      dispatch({
        type: "setDate",
        payload: val,
      });
    },
    [dispatch]
  );

  return (
    <TopBar noGridItem>
      {/* <Grid container spacing={5}> */}
      <Grid item className={classes.dateGridItem}>
        <DateInput groupBy={groupBy} date={date} onChange={onChangeDate} />
      </Grid>
      <Grid item>
        <ButtonGroup
          disableElevation
          disableFocusRipple
          disableRipple
          color="secondary"
          size="large"
          className={classes.dateButtonGroup}
          //className={classes.datePickerGridItem}
        >
          {Object.values(DateRangeEnum)
            .filter((v) => v !== DateRangeEnum.minute)
            .map((val) => (
              <Button
                onClick={() => onChangeGroupBy(val)}
                className={groupBy === val ? classes.activeButton : undefined}
                key={val}
              >
                {val}
              </Button>
            ))}
        </ButtonGroup>
      </Grid>
      {groupBy === DateRangeEnum.hour && (
        <Grid item className={classes.dateGridItem}>
          <TimeInput date={date} onChange={onChangeDate} />
        </Grid>
      )}
      <Grid item className={classes.dateGridItem}>
        <ButtonGroup
          disableElevation
          disableFocusRipple
          disableRipple
          color="secondary"
          size="large"
          className={classes.dateButtonGroup}
        >
          <Button
            style={{
              borderWidth: "0px",
              cursor: "default",
              backgroundColor: ColorsEnum.BGLIGHT,
              textTransform: "capitalize",
            }}
          >
            Y Domain:
          </Button>
          <Button
            onClick={() => setDomain(DomainTypeEnum.FULL)}
            className={
              domain === DomainTypeEnum.FULL ? classes.activeButton : undefined
            }
          >
            FULL
          </Button>
          <Button
            onClick={() => setDomain(DomainTypeEnum.AUTO)}
            className={
              domain === DomainTypeEnum.AUTO ? classes.activeButton : undefined
            }
          >
            AUTO
          </Button>
        </ButtonGroup>
      </Grid>
      {/* </Grid> */}
    </TopBar>
  );
};

export default withStyles(styles)(TopMenu);
