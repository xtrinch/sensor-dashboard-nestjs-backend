import {
  Collapse,
  createStyles,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LockIcon from "@material-ui/icons/Lock";
import SettingsIcon from "@material-ui/icons/Settings";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Link from "components/Link";
import { AccountContext } from "context/AccountContext";
import { drawerToggle } from "context/AppContext";
import { SensorContext, toggleSensorVisibility } from "context/SensorContext";
import { differenceInMinutes } from "date-fns";
import React, { Context, Fragment, useContext } from "react";
import ColorsEnum from "types/ColorsEnum";
import { IotDeviceInterface } from "types/IotDeviceInterface";
import Sensor from "types/Sensor";

interface SideMenuItemProps {
  item: IotDeviceInterface;
  visibility?: boolean;
  expandable?: boolean;
  type: "sensor" | "display" | "forwarder";
  context?: Context<any>;
}

const styles = () =>
  createStyles({
    active: {
      position: "relative",
      "&::before": {
        backgroundColor: `${ColorsEnum.OLIVE}`,
        height: "100%",
        width: "5px",
        position: "absolute",
        left: "0px",
        bottom: 0,
        content: '""',
        display: "block",
      },
    },
    private: {
      display: "inline-flex",
      color: ColorsEnum.GOLD,
      marginLeft: "-3px",
    },
    itemFab: {
      width: "30px",
      height: "30px",
      minHeight: "30px",
      maxHeight: "30px",
      color: "white",
      marginLeft: "10px",
    },
  });

const SideMenuItem: React.FunctionComponent<
  SideMenuItemProps & WithStyles<typeof styles>
> = (props) => {
  const { item, classes } = props;

  const [{ user }] = useContext(AccountContext);
  const [, dispatch] = useContext(SensorContext);

  const toggleVisibility = async (e: any, item: IotDeviceInterface) => {
    e.stopPropagation();

    if (!props.visibility) {
      return;
    }
    toggleSensorVisibility(item as Sensor);
  };

  const toggleExpand = async (e: any, item: IotDeviceInterface) => {
    e.stopPropagation();

    if (!props.expandable) {
      return;
    }

    item.expanded = !item.expanded;
    dispatch({
      type: "updateSensor",
      payload: item,
    });
  };

  const { visibility, expandable, type } = props;

  return (
    <Fragment>
      <ListItem
        divider
        button
        onClick={(e) => {
          toggleExpand(e, item as IotDeviceInterface);
        }}
        className={
          differenceInMinutes(item.lastSeenAt, new Date()) > -60
            ? classes.active
            : undefined
        }
      >
        {/* <WifiIcon /> */}
        {expandable && (
          <ListItemIcon>
            {item.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemIcon>
        )}
        <ListItemText>
          <Grid container spacing={2}>
            {item.private && (
              <Grid item className={classes.private}>
                <LockIcon fontSize="small" />
              </Grid>
            )}
            <Grid item>
              {item.name}, {item.location}
            </Grid>
          </Grid>
          {item.userId !== user?.id && <>({item.user?.username})</>}
        </ListItemText>
        {item.userId === user?.id && (
          <div onClick={(e) => e.stopPropagation()}>
            <Link to={`/${type}s/${item.id}`} onClick={drawerToggle}>
              <Fab color="secondary" size="small" className={classes.itemFab}>
                <SettingsIcon />
              </Fab>
            </Link>
          </div>
        )}
        {visibility && (
          <Fab
            color="secondary"
            size="small"
            className={classes.itemFab}
            onClick={(e) => {
              toggleVisibility(e, item);
            }}
          >
            {(item as IotDeviceInterface).visible ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </Fab>
        )}
        {/* <Fab
          color="secondary"
          size="small"
          className={classes.itemFab}
          onClick={() => removeIotDeviceInterface(item)}
        >
          <RemoveIcon />
        </Fab> */}
      </ListItem>
      {expandable && (
        <Collapse
          in={(item as IotDeviceInterface).expanded}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {(item as Sensor).measurementTypes.map((m, index) => (
              <ListItem button key={index}>
                <ListItemText primary={`${m}`} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
};

SideMenuItem.defaultProps = {};

export default withStyles(styles)(SideMenuItem);
