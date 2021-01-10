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
import { deleteForwarder } from "context/ForwarderContext";
import { format } from "date-fns";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import ColorsEnum from "types/ColorsEnum";
import Forwarder from "types/Forwarder";
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

const ForwarderItem: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps<{}> & { forwarder: Forwarder }
> = (props) => {
  const { forwarder, classes } = props;

  const deleteWithConfirmation = (forwarder: Forwarder) => {
    const onConfirm = async () => {
      await deleteForwarder(forwarder.id);
    };
    openConfirmation(
      onConfirm,
      null,
      "Are you sure you want to delete forwarder?"
    );
  };

  return (
    <TableRow className={classes.root}>
      <TableCell>{forwarder.name}</TableCell>
      <TableCell>{forwarder.numForwarded}</TableCell>
      <TableCell>{format(forwarder.createdAt, DATETIME_REGEX)}</TableCell>
      <TableCell>
        {forwarder.lastSeenAt
          ? format(forwarder.lastSeenAt, DATETIME_REGEX)
          : "Never"}
      </TableCell>
      <TableCell style={{ width: "100px" }}>
        <Link to={`/forwarders/${forwarder.id}`}>
          <IconButton aria-label="add to favorites" size="small">
            <SettingsIcon />
          </IconButton>
        </Link>
        <IconButton
          aria-label="settings"
          size="small"
          onClick={() => deleteWithConfirmation(forwarder)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default withRouter(withStyles(styles)(ForwarderItem));
