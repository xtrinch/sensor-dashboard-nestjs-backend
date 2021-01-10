import { TableCell, TableRow } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { openConfirmation } from "context/ConfirmationContext";
import { deleteDisplay } from "context/DisplayContext";
import { format } from "date-fns";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import ColorsEnum from "types/ColorsEnum";
import Display from "types/Display";
import { DATETIME_REGEX } from "utils/date.range";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: "0px 0px",
      backgroundColor: ColorsEnum.BGLIGHT,
      borderRadius: 0,
      boxShadow: "none",
      borderBottom: `1px solid ${ColorsEnum.GRAYDARK}`,
    },
    action: {
      marginTop: "0px",
    },
    avatar: {
      backgroundColor: ColorsEnum.BLUE,
      color: "white",
    },
    cardHeader: {
      padding: "10px",
    },
  });

const DisplayItem: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps<{}> & { display: Display }
> = (props) => {
  const { display, classes } = props;

  const deleteWithConfirmation = (display: Display) => {
    const onConfirm = async () => {
      await deleteDisplay(display.id);
    };
    openConfirmation(
      onConfirm,
      null,
      "Are you sure you want to delete display?"
    );
  };

  return (
    <TableRow className={classes.root}>
      <TableCell>{display.name}</TableCell>
      <TableCell>{display.boardType}</TableCell>
      <TableCell>{format(display.createdAt, DATETIME_REGEX)}</TableCell>
      <TableCell>
        {display.lastSeenAt
          ? format(display.lastSeenAt, DATETIME_REGEX)
          : "Never"}
      </TableCell>
      <TableCell style={{ width: "100px" }}>
        <Link to={`/displays/${display.id}`}>
          <IconButton aria-label="add to favorites" size="small">
            <SettingsIcon />
          </IconButton>
        </Link>
        <IconButton
          aria-label="settings"
          size="small"
          onClick={() => deleteWithConfirmation(display)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default withRouter(withStyles(styles)(DisplayItem));
