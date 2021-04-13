import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";

const fs = require("fs");
const portastic = require("portastic");

const electron = window.require("electron");
const remote = electron.remote;
const { BrowserWindow } = remote;
const http = require("http");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.jwtToken;
      const Sock = await sessionStorage.Sock;
      const options = {
        method: "GET",
        path: "http://localhost/api/comparisons",
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
  const fileExist = (path) => {
    try {
      if (fs.existsSync(path)) {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  const createBrowserWindow = (path) => {
    const win = new BrowserWindow({
      height: 720,
      width: 1080,
    });
    console.log("here");

    win.loadURL(`file://${path}`);
  };
  console.log(data);
  const handleClick = () => {
    portastic
      .find({
        min: 30000,
        max: 35000,
        retrieve: 1,
      })
      .then(function (port) {
        console.log(port);
      });
  };
  return (
    <Container maxWidth="lg" className={classes.container} gutterBottom>
      <Grid container direction="column" alignItems="center" gutterBottom>
        <Box m={3}>
          <Button
            alignItems="center"
            variant="contained"
            variant="outlined"
            color="primary"
            component={Link}
            to="/newcomparison"
          >
            New Comparison
          </Button>
        </Box>
      </Grid>
      {/* <Iframe
        url="http://127.0.0.1:8080/"
        position="absolute"
        width="70%"
        id="myId"
        className="myClassname"
        height="100%"
        styles={{ height: "100%", border: "none" }}
      /> */}

      {/* <iframe
        src="http://127.0.0.1:8080/"
        style={{ border: "none", display: "true" }}
        width="100%"
        height="1000"
      ></iframe> */}
      {/* <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          }
          label="Enable dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        />
      </FormGroup> */}

      <Grid container spacing={2}>
        {data.length > 0 ? (
          data.map((row) => (
            <Grid key={row._id} item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
                Analysis created by {row.createdBy.name}
              </Typography>
              <div className={classes.demo}>
                <List dense={dense}>
                  {row.samples.map((sample) => (
                    <ListItem
                      button
                      disabled={
                        fileExist(
                          `${row.outdir}/results/${sample.samplePath}/multiqc_report.html`
                        )
                          ? false
                          : true
                      }
                      key={sample._id}
                      onClick={() => {
                        const path = `${row.outdir}/results/${sample.samplePath}/multiqc_report.html`;
                        console.log(path);
                        createBrowserWindow(path);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={sample.sample}
                        secondary={secondary ? "Secondary text" : null}
                      />
                    </ListItem>
                  ))}
                  {/* {generate(
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? "Secondary text" : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )} */}
                </List>
              </div>
            </Grid>
          ))
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "70vh" }}
          >
            <Typography variant="h6" className={classes.title}>
              You have no comparisons to view{" "}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
