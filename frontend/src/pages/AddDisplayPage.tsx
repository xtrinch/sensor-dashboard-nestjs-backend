import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TopBar from "components/TopBar";
import { addDisplay } from "context/DisplayContext";
import { SensorContext } from "context/SensorContext";
import React, { useContext, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import BoardTypeEnum from "types/BoardTypeEnum";
import ColorsEnum from "types/ColorsEnum";
import DisplayTypeEnum from "types/DisplayTypeEnum";
import MeasurementTypeEnum, {
  MeasurementTypeLabelsEnum,
} from "types/MeasurementTypeEnum";

const styles = (theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(30),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: ColorsEnum.BGLIGHT,
      padding: "30px",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      padding: theme.spacing(6, 0, 6),
    },
  });

const AddDisplayPage: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps<{ id: string }>
> = (props) => {
  const { classes, history } = props;

  const errs: { [key: string]: string } = {};
  const [errors, setErrors] = useState(errs);
  const [data, setData] = useState({
    name: "",
    location: "",
    boardType: "" as BoardTypeEnum,
    timezone: "",
    measurementTypes: [],
    sensorIds: [],
    displayType: null as DisplayTypeEnum,
  });

  const [sensorState] = useContext(SensorContext);
  const [success, setSuccess] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const display = await addDisplay(data);
      if (display) {
        setSuccess(true);
        history.push(`/displays/${display.id}`);
      }
    } catch (e) {
      setErrors(e);
    }
  };

  const fieldChange = (val, fieldName) => {
    data[fieldName] = val;
    setData({ ...data });
  };

  return (
    <>
      <TopBar alignItems="flex-end" />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {!success && (
            <>
              <Avatar className={classes.avatar}>
                <SettingsInputAntennaIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add display board
              </Typography>
              <form className={classes.form} noValidate onSubmit={submitForm}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Display name"
                  name="name"
                  value={data.name}
                  autoFocus
                  onChange={(e) => fieldChange(e.target.value, "name")}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="location"
                  label="Location description"
                  type="location"
                  id="location"
                  autoComplete="current-location"
                  value={data.location}
                  onChange={(e) => fieldChange(e.target.value, "location")}
                  error={!!errors.location}
                  helperText={errors.location}
                />
                <Autocomplete
                  id="boardType"
                  value={data.boardType}
                  fullWidth
                  options={Object.keys(BoardTypeEnum)}
                  onChange={(e, newVal) => fieldChange(newVal, "boardType")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Board type"
                      variant="outlined"
                      margin="normal"
                      error={!!errors.boardType}
                      helperText={errors.boardType}
                    />
                  )}
                />
                <Autocomplete
                  id="displayType"
                  value={data.displayType}
                  fullWidth
                  options={Object.keys(DisplayTypeEnum)}
                  onChange={(e, newVal) => fieldChange(newVal, "displayType")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Display type"
                      variant="outlined"
                      margin="normal"
                      error={!!errors.displayType}
                      helperText={errors.displayType}
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  id="measurementTypes"
                  value={data.measurementTypes}
                  fullWidth
                  options={Object.values(MeasurementTypeEnum)}
                  getOptionLabel={(option) => MeasurementTypeLabelsEnum[option]}
                  onChange={(e, newVal) =>
                    fieldChange(newVal, "measurementTypes")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Measurement types"
                      variant="outlined"
                      margin="normal"
                      error={!!errors.measurementTypes}
                      helperText={errors.measurementTypes}
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  id="sensorIds"
                  value={data.sensorIds}
                  fullWidth
                  options={sensorState.sensors.map((s) => s.id)}
                  getOptionLabel={(option) =>
                    sensorState.sensors.find((s) => s.id === option).name
                  }
                  onChange={(e, newVal) => fieldChange(newVal, "sensorIds")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sensors"
                      variant="outlined"
                      margin="normal"
                      error={!!errors.sensorIds}
                      helperText={errors.sensorIds}
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{ marginTop: "20px" }}
                >
                  Add
                </Button>
              </form>
            </>
          )}
          {success && (
            <Grid container spacing={10} direction={"column"}>
              <Grid item>Display successfully added.</Grid>
              <Grid item>Redirecting to display info page...</Grid>
            </Grid>
          )}
        </div>
      </Container>
    </>
  );
};

export default withRouter(withStyles(styles)(AddDisplayPage));
