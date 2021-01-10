import {
  AppBar,
  createStyles,
  Grid,
  IconButton,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AppContext } from "context/AppContext";
import React, { useContext } from "react";
import ColorsEnum from "types/ColorsEnum";

const styles = (theme) =>
  createStyles({
    root: {
      backgroundColor: ColorsEnum.BGLIGHT,
      padding: "13px 20px",
      [theme.breakpoints.up("md")]: {
        left: "270px",
      },
      boxShadow: "none",
      minHeight: "60px",
    },
    menuIcon: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  });

const TopBar: React.FunctionComponent<
  WithStyles<typeof styles> & { alignItems?: string; noGridItem?: boolean }
> = (props) => {
  const { classes } = props;

  const [, dispatch] = useContext(AppContext);

  const handleDrawerToggle = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <AppBar
      position="sticky"
      color="secondary"
      className={classes.root}
      style={{ alignItems: props.alignItems }}
    >
      <Grid container spacing={5}>
        <Grid item className={classes.menuIcon} xs={1}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              size="medium"
              color="secondary"
              style={{ padding: "6px" }}
              edge={false}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Grid>
        {props.noGridItem && props.children}
        {!props.noGridItem && (
          <Grid
            item
            sm={12}
            xs={11}
            style={{ justifyContent: props.alignItems, display: "flex" }}
          >
            {props.children}
          </Grid>
        )}
      </Grid>
    </AppBar>
  );
};

export default withStyles(styles)(TopBar);
