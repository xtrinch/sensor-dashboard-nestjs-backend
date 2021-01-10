import {
  createStyles,
  Grid,
  IconButton,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import { removeToast, ToastContext } from "context/ToastContext";
import React, { useContext } from "react";
import ColorsEnum from "types/ColorsEnum";

const styles = () =>
  createStyles({
    root: {
      position: "fixed",
      right: "20px",
      backgroundColor: ColorsEnum.BGLIGHT,
      color: ColorsEnum.WHITE,
      zIndex: 10000,
      alignItems: "center",
      width: "fit-content",
      borderRadius: "3px",
    },
  });

const ToastBox: React.FunctionComponent<WithStyles<typeof styles>> = (
  props
) => {
  const { classes } = props;

  const [toastContext] = useContext(ToastContext);

  return (
    <>
      {toastContext.toasts.map((toast, index) => (
        <Grid
          container
          spacing={4}
          className={classes.root}
          style={{
            bottom: `${20 + index * 40}px`,
            backgroundColor:
              toast.type === "success" ? ColorsEnum.OLIVE : ColorsEnum.ERROR,
          }}
          key={index}
        >
          <Grid item>{toast.type === "success" && <Check />}</Grid>
          <Grid item>{toast.message}</Grid>
          <Grid item>
            <IconButton onClick={() => removeToast(toast)} size="small">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default withStyles(styles)(ToastBox);
