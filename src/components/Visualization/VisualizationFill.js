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
const electron = window.require("electron");
const { shell } = window.require("electron");
const remote = electron.remote;
const { BrowserWindow } = remote;
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
const handler = require("serve-handler");
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
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [checked, setChecked] = useState([0]);
  const [openJB, setOpenJB] = useState([]);
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
    portastic
      .find({
        min: 30000,
        max: 35000,
        retrieve: 1,
      })
      .then(function (port) {
        window.ipcRenderer.send("ping", port[0]);
        const request = {
          port: port[0],
          genomes:
            "/home/shatira/Documents/Demo_Data/genome/Malus_domestica_cultivar_Golden_Delicious-chr4.fasta",
          outdir: "/home/shatira/Bureau/jbrowse2",
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
        setOpenJB([...openJB, `http:///localhost:${port}`]);
        setOpen(false);
        shell.openExternal(`http:///localhost:${port}`);
      });
  };
  console.log(openJB);
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

  const handleServe = (outdir) => {
    portastic
      .find({
        min: 30000,
        max: 35000,
        retrieve: 1,
      })
      .then(function (port) {
        console.log(outdir);
        const server = http.createServer((request, response) => {
          return handler(request, response, { public: outdir });
        });
        server.listen(port[0], () => {
          console.log(`Running at http://localhost:${port}`);
        });
        shell.openExternal(`http:///localhost:${port}`);
      });
  };
  return (
    <Container maxWidth="lg" className={classes.container} gutterBottom>
      <Grid container direction="column" alignItems="center" gutterBottom>
        <Box m={3}>
          {" "}
          <Button
            alignItems="center"
            variant="contained"
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
          >
            New Jbrowse
          </Button>
        </Box>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a new Jbrowse Intance?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select the assemblies and tracks you want in your Jbrowse Instance,
            Please note that a whole new Instance is created with a copy of all
            selected files inside , this can quickly consume a lot of space.
          </DialogContentText>
          <List className={classes.root}>
            {result.map((genome, idx) => {
              const labelId = `checkbox-list-label-${genome}`;
              console.log(idx);
              return (
                <ListItem
                  key={idx}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(idx)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(idx) !== -1}
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
            })}
          </List>
          <List className={classes.root}>
            {data &&
              data.map((row) => {
                console.log(row);
                row.samples.map((sample) => {
                  return (
                    <ListItemText
                      primary={`${row.outdir}/results/${sample.samplePath}/alignment_bismark/${sample.sampleName}.deduplicated.bam`}
                    />
                  );
                });
              })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Quit
          </Button>
          <Button onClick={handleClick} color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}>
        {views.length > 0 ? (
          views.map((view) => (
            <Grid key={view._id} item xs={12} md={6}>
              <List dense={dense}>
                <ListItem
                  button
                  onClick={() => {
                    const path = `${view.outdir}/index.html`;
                    handleServe(view.outdir);
                  }}
                >
                  Jbrowse Instance created by {view.createdBy.name}
                </ListItem>
              </List>

              <div className={classes.demo}>
                <List dense={dense}>
                  {/* {view.samples.map((sample) => (
                    <ListItem
                      button
                      disabled={
                        fileExist(
                          `${view.outdir}/results/${sample.samplePath}/multiqc_report.html`
                        )
                          ? false
                          : true
                      }
                      key={sample._id}
                      onClick={() => {
                        const path = `${view.outdir}/results/${sample.samplePath}/multiqc_report.html`;
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
                  ))} */}
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
              You have no analyses to view{" "}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
