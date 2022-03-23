import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Linky from "@material-ui/core/Link";

const { shell } = window.require("electron");

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 8),
  },
  heroButtons: {
    marginTop: theme.spacing(10),
  },
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Landing = () => {
  const history = useHistory();
  const { checkauth } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    checkauth(history, "/alignment");
  }, [checkauth, history]);
  return (
    <React.Fragment>
      <CssBaseline />

      <Box height="100%">
        <div className={classes.paper}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {sessionStorage.Conda == "true" ? (
                <>
                  <b>Run</b> a Snakemake DMR Identification Pipeline{" "}
                  <b>
                    <span style={{ fontFamily: "monospace" }}>BiSePS</span>
                  </b>{" "}
                  from a User-Friendly <b>GUI!</b>{" "}
                </>
              ) : (
                <>
                  <b>Oops..</b> it seems like you're missing conda in your $PATH
                  <b></b>
                  <div>
                    {" "}
                    You can install <b>Miniconda</b> following this{" "}
                    <Linky
                      onClick={() =>
                        shell.openExternal(
                          "https://docs.conda.io/en/latest/miniconda.html"
                        )
                      }
                    >
                      link
                    </Linky>{" "}
                  </div>
                </>
              )}
            </Typography>
            {sessionStorage.Conda == "true" ? (
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      size="large"
                      variant="contained"
                      component={Link}
                      to="/register"
                      color="primary"
                    >
                      Register
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="large"
                      variant="outlined"
                      component={Link}
                      to="/login"
                      color="primary"
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : (
              ""
            )}
          </Container>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Landing;
