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
import { useAuth } from "../../hooks/useAuth";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const electron = window.require("electron");
const { shell } = window.require("electron");
const remote = electron.remote;
const { BrowserWindow } = remote;
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
const fs = require("fs");

const http = require("http");
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Container from "@material-ui/core/Container";
const path = require("path");
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
  const [checked, setChecked] = useState([]);
  const { user } = useAuth();

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
  const [views, setViews] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.jwtToken;
      const Sock = await sessionStorage.Sock;
      const options = {
        method: "GET",
        path: "http://localhost/api/jbrowse",
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
            setViews(jsbody);
          });
      });
      req.on("error", function (e) {
        console.log("ERROR: " + e.message);
      });
    };

    fetchData();
  }, []);
  console.log(views);
  const fileExist = (path) => {
    try {
      if (fs.existsSync(path)) {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  const handleClick = () => {
    const request = {
      genomes: checked,
      userId: user.user.id,
    };
    const token = localStorage.jwtToken;
    const options = {
      method: "POST",
      path: "http://localhost/api/jbrowse/visualize",
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
    setOpen(false);
    shell.openExternal(`http:///localhost:${user.user.port[0]}`);
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

  const handleServe = () => {
    shell.openExternal(`http:///localhost:${user.user.port[0]}`);
  };
  return (
    <Container maxWidth="lg" className={classes.container} gutterBottom>
      <Grid container direction="column" alignItems="center" gutterBottom>
        <Box m={3}>
          {" "}
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              alignItems="center"
              variant="contained"
              variant="outlined"
              color="primary"
              onClick={handleServe}
            >
              Start Jbrowse{" "}
            </Button>
            <Button
              alignItems="center"
              variant="contained"
              variant="outlined"
              color="primary"
            >
              Reset Jbrowse{" "}
            </Button>
            <Button alignItems="center" variant="contained" color="primary">
              Populate Jbrowse{" "}
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>

      <List subheader={"Genomes"}>
        {result.map((genome, idx) => {
          console.log(user.user.jbPath, genome.genome);
          const labelId = `checkbox-list-label-${genome}`;
          console.log(idx);
          if (!fileExist(path.join(user.user.jbPath, genome.genome))) {
            return (
              <ListItem
                key={idx}
                button
                onClick={handleToggle(genome.genomePath)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(genome.genomePath) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${genome.genome}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        })}
      </List>
      <List subheader={"Bam Files"}>
        {data.map((row) => {
          const labelId = `checkbox-list-label-${row}`;
          return (
            <div>
              {row.samples.map((sample) => {
                const samplePath = `${row.outdir}/results/${sample.samplePath}/alignment_bismark/${sample.sampleName}.deduplicated.bam`;
                if (
                  fileExist(samplePath) &&
                  !fileExist(
                    path.join(
                      user.user.jbPath,
                      `${sample.sampleName}.deduplicated.bam`
                    )
                  )
                ) {
                  return (
                    <ListItem
                      key={row._id}
                      button
                      onClick={handleToggle(samplePath)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(samplePath) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`${sample.sampleName}.deduplicated.bam`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <CommentIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                }
              })}
            </div>
          );
          // console.log(row);
          // {
          //   row.samples.map((sample) => {
          //     console.log(
          //       `${row.outdir}/results/${sample.samplePath}/alignment_bismark/${sample.sampleName}.deduplicated.bam`
          //     );
          //     if (
          //       !fileExist(
          //         path.join(
          //           user.user.jbPath,
          //           `${sample.sampleName}.deduplicated.bam`
          //         )
          //       )
          //     ) {
          // return (
          //   <ListItem
          //     key={row._id}
          //     button
          //     onClick={handleToggle(row._id)}
          //   >
          //     <ListItemIcon>
          //       <Checkbox
          //         edge="start"
          //         checked={checked.indexOf(row._id) !== -1}
          //         tabIndex={-1}
          //         disableRipple
          //         inputProps={{ "aria-labelledby": labelId }}
          //       />
          //     </ListItemIcon>
          //     <ListItemText
          //       id={labelId}
          //       primary={`${row.outdir}/results/${sample.samplePath}/alignment_bismark/${sample.sampleName}.deduplicated.bam`}
          //     />
          //     <ListItemSecondaryAction>
          //       <IconButton edge="end" aria-label="comments">
          //         <CommentIcon />
          //       </IconButton>
          //     </ListItemSecondaryAction>
          //   </ListItem>
          // );
          //     }
          //   });
          // }
        })}
      </List>
    </Container>
  );
}
