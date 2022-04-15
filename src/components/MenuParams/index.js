import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const path = require("path");
const fs = require("fs");
const homedir = require("os").homedir();
const configPath = path.join(homedir, ".biseps/biseps.json");
const initialState = JSON.parse(fs.readFileSync(configPath, "utf8"));
const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const MenuParams = () => {
  console.log(initialState);
  const classes = useStyles();
  const [config, setConfig] = useState(initialState);
  const history = useHistory();
  const pingpong = (config) => {
    ipcRenderer.send("ping-good", config);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    pingpong(config);
    history.push("/");
  };
  const onChange = (e) => {
    e.persist();
    setConfig({ ...config, [e.target.id]: e.target.value });
  };
  console.log(config);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={config.port}
                onChange={onChange}
                id="port"
                type="port"
                variant="outlined"
                fullWidth
                label="Database Port"
                name="port"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={config.database}
                onChange={onChange}
                id="database"
                type="database"
                variant="outlined"
                fullWidth
                label="Database URL"
                name="database"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={config.conda}
                onChange={onChange}
                id="conda"
                type="conda"
                variant="outlined"
                fullWidth
                label="Conda Path"
                name="conda"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save parameters and quit{" "}
          </Button>
          <Button
            onClick={() => history.push("/")}
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Back to main menu{" "}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default MenuParams;
