import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Plus from "@material-ui/icons/Add";
import DisplayItem from "components/DisplayItem";
import TopBar from "components/TopBar";
import { DisplayContext } from "context/DisplayContext";
import React, { useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import ColorsEnum from "types/ColorsEnum";
import Display from "types/Display";

const styles = (theme) =>
  createStyles({
    root: {
      backgroundColor: ColorsEnum.BGLIGHT,
      paddingLeft: "0px",
      paddingRight: "0px",
      textAlign: "center",
      marginTop: "30px",
    },
    actionButton: {
      backgroundColor: ColorsEnum.OLIVE,
      color: ColorsEnum.WHITE,
      width: "fit-content",
    },
  });

const DisplayListPage: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps<{ id: string }>
> = (props) => {
  const { classes, history } = props;

  const [displayContext] = useContext(DisplayContext);

  return (
    <>
      <TopBar alignItems="flex-end">
        <Button
          variant="contained"
          className={classes.actionButton}
          startIcon={<Plus />}
          onClick={() => history.push("add-display")}
        >
          Add
        </Button>
      </TopBar>
      <Container component="main" maxWidth="sm" className={classes.root}>
        <CssBaseline />
        <Typography component="h1" variant="h5" style={{ padding: "20px" }}>
          My display devices
        </Typography>
        {displayContext.displays.length !== 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Board type</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Last seen at</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayContext.displays.map((display: Display) => (
                <DisplayItem display={display} key={display.id} />
              ))}
            </TableBody>
          </Table>
        )}
        {displayContext.displays.length === 0 && (
          <Typography
            variant="body2"
            component="p"
            style={{ margin: "30px 0px" }}
          >
            No displays added
          </Typography>
        )}
      </Container>
    </>
  );
};

export default withRouter(withStyles(styles)(DisplayListPage));
