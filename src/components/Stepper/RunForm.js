import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useConfig } from "../../hooks/useConfig";
import { useAuth } from "../../hooks/useAuth";
import NewTable from "../Table/NewTable";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const http = require("http");
const path = require("path");
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  toast: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
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
  const {
    runState,
    setRunState,
    units,
    setUnits,
    initialRun,
    remoteunits,
    setRemoteUnits,
  } = useConfig();
  const { user } = useAuth();
  const [response, setResponse] = useState({});
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState();

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <GlobalConfig />;
      case 1:
        return <NewTable />;
      default:
        throw new Error("Unknown step");
    }
  }
  function validate(runState) {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (runState.genome.length === 0) {
      errors.push("You have to specify a genome");
    }
    if (runState.remote) {
      if (runState.remoteDir.length === 0) {
        errors.push(
          "You have to specify a remote output directory when using a remote machine"
        );
      }
    }
    return errors;
  }
  const handleRunSubmit = () => {
    setLoading(true);

    console.log(runState);
    const errors = validate(runState);
    if (errors.length > 0) {
      console.log(errors);
      setErrors(errors);
      handleClick(true);
      setLoading(false);
      return errors;
    }
    const blankSample = {};
    const helper = {};
    const result = units.reduce(function (r, o) {
      console.log(r);
      const key = o.sample + "-" + o.techrep + "-" + o.biorep;
      const sampleName = `${o.sample}`;
      const sample = `${o.sample} TechRep ${o.techrep} BioRep ${o.biorep}`;
      const samplePath = `${o.sample}-TechRep_${o.techrep}-BioRep_${o.biorep}`;
      const merged = `${o.sample} TechRep ${o.techrep}`;
      const mergedPath = `${o.sample}-TechRep_${o.techrep}`;
      if (!helper[key]) {
        helper[key] = Object.assign(
          { sampleName, sample, samplePath, merged, mergedPath },
          blankSample
        ); // create a copy of o
        r.push(helper[key]);
      }
      return r;
    }, []);

    console.log(result);
    console.log(user.user.email);

    const request = {
      rerun: false,
      ...runState,
      outdir: path.dirname(runState.genome),
      samples: result,
      remoteunits,
      units,
      userId: user.user.id,
      email: user.user.email,
    };
    const token = sessionStorage.jwtToken;

    const options = {
      method: "POST",
      path: "http://localhost/api/runs/run",
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
          console.log("failed post request");
        } else {
          console.log("successful post request");

          setResponse(jsbody);
          handleReset();
          setLoading(false);
          history.push("/alignment");
        }
      });
    });
    req.on("error", (err) => console.log(err));
    req.write(JSON.stringify(request));
    req.end();
  };
  const handleReset = () => {
    setRunState(initialRun);
    console.log(runState);
    setRemoteUnits([]);
    setUnits([]);
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
            New run
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
                          ? handleRunSubmit
                          : handleNext
                      }
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Launch analysis"
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
