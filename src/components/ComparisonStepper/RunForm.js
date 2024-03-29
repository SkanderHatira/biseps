import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import GlobalConfig from "./GlobalConfig";
import { useConfig } from "../../hooks/useConfig";
import { useAuth } from "../../hooks/useAuth";
import ComparisonForm from "../Comparisons/ComparisonForm";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const path = require("path");
const http = require("http");
const { shell } = window.require("electron");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        onClick={() =>
          shell.openExternal("https://forgemia.inra.fr/irhs-bioinfo/bisepsgui")
        }
      >
        Biseps
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Global configuration", "Expermiental design"];

export default function RunForm() {
  const {} = useConfig();

  const {
    compState,
    setCompState,
    initialComp,
    comparisons,
    setComparisons,
    remotecomparisons,
    setRemoteComparisons,
  } = useConfig();
  const { user } = useAuth();
  const [response, setResponse] = useState({});
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function validate(compState, comparisons) {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (compState.species.length === 0) {
      errors.push("You have to specify a a species name");
    }

    if (compState.genome.length === 0) {
      errors.push("You have to specify a genome");
    }
    if (comparisons.length === 0) {
      errors.push(
        "You have to specify at least one comparison to be performed"
      );
    }
    const isFullyDesigned = comparisons.every(
      (comp) =>
        comp.id &&
        (comp.control || comp.customControl) &&
        (comp.treatment || comp.customTreatment)
    );
    if (!isFullyDesigned) {
      errors.push("You have to correctly fill fields for each comparison");
    }
    if (compState.remote) {
      if (compState.remoteDir.length === 0) {
        errors.push(
          "You have to specify a remote output directory when using a remote machine"
        );
      }
    }
    return errors;
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <GlobalConfig />;
      case 1:
        return <ComparisonForm />;
      default:
        throw new Error("Unknown step");
    }
  }
  console.log(comparisons);

  const handleComparisonSubmit = () => {
    setLoading(true);
    const errors = validate(compState, comparisons);
    if (errors.length > 0) {
      console.log(errors);
      setErrors(errors);
      handleClick(true);
      setLoading(false);
      return errors;
    }
    console.log(path.dirname(compState.genome));
    const request = {
      ...compState,
      rerun: false,
      comparisons,
      remotecomparisons,
      outdir: path.dirname(compState.genome),
      userId: user.user.id,
      email: user.user.email,
    };
    const token = sessionStorage.jwtToken;
    const options = {
      method: "POST",
      path: "http://localhost/api/comparisons/comparison",
      socketPath: sessionStorage.Sock,
      hostname: "unix",
      port: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const req = http.request(options, function (res) {
      const chunks = [];
      console.log("STATUS: " + res.statusCode);
      console.log("HEADERS: " + JSON.stringify(res.headers));
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("error", (err) => console.log(err));
      res.on("end", function () {
        const body = Buffer.concat(chunks).toString();

        const jsbody = JSON.parse(body);
        if (res.statusCode !== 200) {
          setLoading(false);
          console.log("failed post request");
        } else {
          console.log("successful post request");

          setResponse(jsbody);
          handleReset();
          setLoading(false);
          history.push("/comparison");
        }
      });
    });
    req.on("error", (err) => console.log(err));
    req.write(JSON.stringify(request));
    req.end();
  };
  const handleReset = () => {
    setComparisons([]);
    setRemoteComparisons([]);
    setCompState(initialComp);
  };
  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={errors && errors.length > 0 ? "error" : "success"}
        >
          {errors && errors.length > 0
            ? `You can't submit because : ${errors}`
            : "Your Run has been submitted"}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            New Comparison
          </Typography>
        </Toolbar>
      </AppBar>
      {loading ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress size={80} />
        </div>
      ) : (
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Parameters
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                ""
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        activeStep === steps.length - 1
                          ? handleComparisonSubmit
                          : handleNext
                      }
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Launch comparison"
                        : "Next"}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleReset}
                      className={classes.button}
                    >
                      reset
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      )}
    </React.Fragment>
  );
}
