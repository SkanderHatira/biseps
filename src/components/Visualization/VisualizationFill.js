import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
const electron = window.require("electron");
const remote = electron.remote;
const { BrowserWindow } = remote;
import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Container from "@material-ui/core/Container";
const path = require("path");
const http = require("http");
const portastic = require("portastic");
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function VisualizationFill() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (genome) => () => {
    const currentIndex = checked.indexOf(genome);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(genome);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.jwtToken;
      const Sock = await sessionStorage.Sock;
      const options = {
        method: "GET",
        path: "http://localhost/api/runs",
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
  const fileExist = (path) => {
    try {
      if (fs.existsSync(path)) {
        return true;
      }
    } catch (err) {
      return false;
    }
  };
  // const createBrowserWindow = (port) => {
  //   const jbrowse = new BrowserWindow({
  //     height: 720,
  //     width: 1080,
  //   });
  //   console.log("here");
  //   console.log(`http://localhost:${port}`);
  //   jbrowse.loadURL(`http://localhost:${port}`);
  // };
  const handleClick = (genome) => {
    portastic
      .find({
        min: 30000,
        max: 35000,
        retrieve: 1,
      })
      .then(function (port, genome) {
        window.ipcRenderer.send("ping", port[0]);
        const request = {
          port: port[0],
          genomes:
            "/home/shatira/Documents/Demo_Data/genome/Malus_domestica_cultivar_Golden_Delicious-chr4.fasta",
        };
        const token = localStorage.jwtToken;
        const options = {
          method: "POST",
          path: "http://localhost/api/comparisons/visualize",
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
              setRunState(initialRun);
              setUnits([]);
              history.push("/alignment");
            }
          });
        });
        req.on("error", (err) => console.log(err));
        req.write(JSON.stringify(request));
        req.end();
      });
  };
  const blankSample = {};
  const helper = {};
  const result = data.reduce(function (r, o) {
    console.log(r);
    const key = o.genome;
    const genome = path.basename(o.genome);
    const genomePath = o.genome;
    if (!helper[key]) {
      helper[key] = Object.assign({ genome, genomePath }, blankSample); // create a copy of o
      r.push(helper[key]);
    }
    return r;
  }, []);

  console.log(result);
  return (
    <Container maxWidth="lg" className={classes.container} gutterBottom>
      <Grid container direction="column" alignItems="center" gutterBottom>
        <Box m={3}>
          <Button
            alignItems="center"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Visualize
          </Button>
        </Box>
      </Grid>
      <List className={classes.root}>
        {result.map((genome) => {
          const labelId = `checkbox-list-label-${genome}`;

          return (
            <ListItem
              key={genome}
              role={undefined}
              dense
              button
              onClick={handleToggle(genome)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(genome) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${genome.genome}`} />
              <ListItemSecondaryAction></ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}
