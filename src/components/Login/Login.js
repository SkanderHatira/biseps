import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { UPDATE_FORM } from "../../actions/types";
import { formReducer } from "../../reducers/formReducer";
import classnames from "classnames";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const { checkauth, signup } = useAuth();
  const classes = useStyles();

  const initialStateForm = {
    email: "",
    password: "",
    errors: {},
  };
  const history = useHistory();
  const [state, dispatch] = useReducer(formReducer, initialStateForm);

  useEffect(() => {
    checkauth(history, "/alignment");
  }, [checkauth, history]);
  const onChange = (e) => {
    e.persist();
    dispatch({
      type: UPDATE_FORM,
      payload: { ...state, [e.target.id]: e.target.value },
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: state.email,
      password: state.password,
    };
    signup(userData, dispatch, history);
  };
  const { errors } = state;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            onChange={onChange}
            value={state.email}
            error={errors.email === ""}
            helperText={errors.email === "" ? "Empty!" : errors.email}
            className={classnames("", {
              invalid: errors.email || errors.emailnotfound,
            })}
            id="email"
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={onChange}
            value={state.password}
            error={errors.password === ""}
            helperText={errors.password === "" ? "Empty!" : errors.password}
            className={classnames("", {
              invalid: errors.password || errors.passwordincorrect,
            })}
            id="password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Go Back
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
