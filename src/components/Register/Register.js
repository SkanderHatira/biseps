import React, { useReducer, useEffect } from "react";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
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
  name: "",
  email: "",
  password: "",
  password2: "",
  errors: {},
};
const Register = () => {
  const classes = useStyles();

  const auth = useAuth();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const history = useHistory();
  useEffect(() => {
    auth.checkauth(history, "/alignment");
  }, [auth, history]);
  const onChange = (e) => {
    e.persist();
    dispatch({
      type: UPDATE_FORM,
      payload: { ...state, [e.target.id]: e.target.value },
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("signing in yaaaaaaaaaaaaaaay");
    auth.signin(state, dispatch, history);
  };
  const { errors } = state;

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                label="Account Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                value={state.email}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChange}
                value={state.password}
                error={errors.password === ""}
                helperText={errors.password === "" ? "Empty!" : errors.password}
                className={classnames("", {
                  invalid: errors.password,
                })}
                id="password"
                type="password"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChange}
                value={state.password2}
                error={errors.password2 === ""}
                helperText={
                  errors.password2 === "" ? "Empty!" : errors.password2
                }
                className={classnames("", {
                  invalid: errors.password2,
                })}
                id="password2"
                type="password"
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="password2"
                type="password"
                autoComplete="current-password"
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
            Register{" "}
          </Button>
          <Grid container justify="flex-end">
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Go Back
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
