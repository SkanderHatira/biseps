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

const EditProfileFilling = () => {
  const classes = useStyles();

  const auth = useAuth();
  const initialState = {
    name: auth.user.user.name,
    email: auth.user.user.email,
    oldpass: "",
    password: "",
    password2: "",
    errors: {},
  };
  console.log(auth.user.user.name);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const history = useHistory();

  const onChange = (e) => {
    e.persist();
    dispatch({
      type: UPDATE_FORM,
      payload: { ...state, [e.target.id]: e.target.value },
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("updating info");
    auth.handleEditProfile(state, dispatch, history);
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
          Update {auth.user.user.name} Account Information
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
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
            <Grid item xs={12} sm={12}>
              <TextField
                onChange={onChange}
                value={state.oldpass}
                error={errors.passwordincorrect === ""}
                helperText={
                  errors.passwordincorrect === ""
                    ? "Empty!"
                    : errors.passwordincorrect
                }
                className={classnames("", {
                  invalid: errors.passwordincorrect,
                })}
                id="oldpass"
                type="password"
                variant="outlined"
                required
                fullWidth
                name="oldpass"
                label="Current Password"
                type="password"
                autoComplete="current-password"
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
                fullWidth
                name="password"
                label="New Password"
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
                fullWidth
                name="password2"
                label="Confirm New Password"
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
            Update{" "}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditProfileFilling;
