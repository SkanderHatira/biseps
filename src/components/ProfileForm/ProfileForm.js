import React, { useReducer, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { UPDATE_FORM } from "../../actions/types";
import classnames from "classnames";
import { formReducer } from "../../reducers/formReducer";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormHelperText from "@material-ui/core/FormHelperText";
const http = require("http");
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FormControl } from "@material-ui/core";

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
const initialState = {
  hostname: "",
  username: "",
  password: "",
  password2: "",
  errors: {},
};
const blankMachine = {
  hostname: "",
  username: "",
  port: 22,
  privateKey: "",
  script: "",
  password: "",
  errors: {},
};
const ProfileForm = () => {
  const { user, handleEditProfile, signin } = useAuth();
  const [data, setData] = useState([]);
  const [machines, setMachines] = useState([]);
  const [machine, setMachine] = useState(blankMachine);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleAddMachine = () => {
    const request = {
      ...machine,
    };
    const token = sessionStorage.jwtToken;
    const options = {
      method: "POST",
      path: "http://localhost/api/machines/machine",
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
        }
      });
    });
    req.on("error", (err) => console.log(err));
    req.write(JSON.stringify(request));
    req.end();
    window.location.reload(false);
  };
  const classes = useStyles();
  const handleDelete = (id) => {
    const token = sessionStorage.jwtToken;
    const options = {
      method: "DELETE",
      path: `http://localhost/api/machines/${id}`,
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
        }
      });
    });
    req.on("error", (err) => console.log(err));
    req.end();

    window.location.reload(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.jwtToken;
      const Sock = await sessionStorage.Sock;
      const options = {
        method: "GET",
        path: "http://localhost/api/machines/",
        socketPath: Sock,
        port: null,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const req = http.get(options, function (res) {
        console.log("STATUS: " + res.statusCode);
        console.log("HEADERS: " + JSON.stringify(res.headers));
        // Buffer the body entirely for processing as a whole.
        const bodyChunks = [];
        res
          .on("data", function (chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
          })
          .on("end", function () {
            const body = Buffer.concat(bodyChunks);
            const jsbody = JSON.parse(body);
            setData(jsbody);
          });
      });
      req.on("error", function (e) {
        console.log("ERROR: " + e.message);
      });
    };

    fetchData();
  }, []);
  console.log(data);
  const addMachine = () => {
    setMachine([...machine, { ...blankMachine }]);
  };
  const removeMachine = () => {
    setMachine(blankMachine);
  };
  const handleMachinesChange = (e) => {
    setMachine({
      ...machine,
      [e.target.name]: e.target.value,
    });
  };

  const initialState = {
    name: user.user.name,
    email: user.user.email,
    errors: {},
  };
  const [state, dispatch] = useReducer(formReducer, blankMachine);
  const history = useHistory();
  const onChange = (e) => {
    e.persist();
    dispatch({
      type: UPDATE_FORM,
      payload: { ...state, [e.target.id]: e.target.value },
    });
  };
  const handleFiles = (e) => {
    setMachine({
      ...machine,
      [e.target.id]: document.getElementById(e.target.id).files[0].path,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Modify profile information");
    handleEditProfile(state, dispatch, history);
  };

  const { errors } = state;
  return (
    <div>
      <Container component="main" minWidth="xs" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography gutterBottom component="h1" variant="h5">
            Available Machines{" "}
          </Typography>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  value={state.name}
                  error={errors.name === ""}
                  helperText={errors.name === "" ? "Empty!" : errors.name}
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                  id="name"
                  type="text"
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                />
              </Grid> */}

            {/* <Grid item xs={12}>
                <TextField
                  value={state.email}
                  onChange={onChange}
                  error={errors.email === ""}
                  helperText={errors.email === "" ? "Empty!" : errors.email}
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                  id="email"
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmit}
                >
                  Submit Changes{" "}
                </Button>
              </Grid> */}

            <Grid item xs={12}>
              {data && data.length === 0 ? (
                <Typography
                  gutterBottom
                  variant="h6"
                  align="center"
                  component="h2"
                  color="textSecondary"
                >
                  You have yet to configure remote machines
                </Typography>
              ) : (
                data.map((machine) => {
                  console.log(machine);
                  return (
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {machine.hostname}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {machine.username}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            handleDelete(machine._id);
                          }}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })
              )}
            </Grid>
          </Grid>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            New Remote Machine
          </Typography>

          <form className={classes.form} onSubmit={onSubmit}>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleMachinesChange}
                    value={machine.hostname}
                    id="hostname"
                    type="text"
                    autoComplete="hostname"
                    name="hostname"
                    error={errors.hostname === ""}
                    helperText={
                      errors.hostname === "" ? "Empty!" : errors.hostname
                    }
                    variant="outlined"
                    required
                    fullWidth
                    label="Remote Machine Address/Hostname"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleMachinesChange}
                    value={machine.username}
                    id="username"
                    type="text"
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    label="Username on remote machine"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    onChange={handleMachinesChange}
                    value={machine.port}
                    id="port"
                    type="number"
                    autoComplete="port"
                    name="port"
                    variant="outlined"
                    required
                    fullWidth
                    label="Port used for ssh"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} m={6}>
                  <Button
                    variant="contained"
                    component="label"
                    color={machine.privateKey === "" ? "default" : "primary"}
                    fullWidth
                  >
                    {machine.privateKey === ""
                      ? "Add Private Key"
                      : machine.privateKey}
                    <input
                      type="file"
                      onChange={handleFiles}
                      id="privateKey"
                      name="privateKey"
                      hidden
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    id="password"
                    name="password"
                    fullWidth
                    value={machine.password}
                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                    onChange={handleMachinesChange}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} m={6}>
                  <Button
                    variant="contained"
                    component="label"
                    color={machine.script === "" ? "default" : "primary"}
                    fullWidth
                  >
                    {machine.script === ""
                      ? "Add Pre-Analysis Script"
                      : machine.script}
                    <input
                      type="file"
                      onChange={handleFiles}
                      id="script"
                      name="script"
                      hidden
                    />
                  </Button>
                  <FormHelperText>
                    Script containing commands necessary to make Conda and
                    Snakemake Available in the $PATH of your distant machine
                  </FormHelperText>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                    fullWidth
                    onClick={removeMachine}
                  >
                    Reset Paremeters{" "}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    color="primary"
                    onClick={handleAddMachine}
                  >
                    Add Machine{" "}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ProfileForm;
