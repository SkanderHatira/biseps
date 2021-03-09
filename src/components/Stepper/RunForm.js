import React, { useEffect } from "react";
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
import Execution from "./Execution";
import axios from "axios";
import { useConfig } from "../../hooks/useConfig";
import NewTable from "../Table/NewTable";

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
  const { runState, sampleState, units } = useConfig();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

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
      // case 2:
      //   return <Overview />;
      // case 3:
      //   return <NewTable />;
      default:
        throw new Error("Unknown step");
    }
  }
  const handleRunSubmit = () => {
    const request = {
      ...runState,
      units,
    };
    console.log(request);
    // const request = {
    //   params: {
    //     steps: {
    //       subsample: runState.subsample,
    //     },

    //     bismark: {
    //       aligner: runState.aligner,
    //       alignerOptions: "",
    //       instances: 4,
    //       scoreMin: "L,0," + String(runState.minscore),
    //       n: runState.n,
    //       l: runState.l,
    //     },
    //   },
    //   outdir: runState.outdir,
    //   genome: runState.genome,
    //   adapters: runState.adapters,
    //   samples: sampleState,
    // };
    axios
      .post("http://localhost:5000/api/runs/run", request)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log("failed get request");
      });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            New run
          </Typography>
        </Toolbar>
      </AppBar>
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
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your analysis has been submitted.
                </Typography>
                <Typography variant="subtitle1">
                  Your run number is #2001539. you can follow the run status
                  through the dashboard.
                </Typography>
              </React.Fragment>
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
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
