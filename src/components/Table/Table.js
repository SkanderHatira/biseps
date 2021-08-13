// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import axios from "axios";
// import Container from "@material-ui/core/Container";
// const electron = window.require("electron");
// const remote = electron.remote;
// const { BrowserWindow, dialog, Menu } = remote;
// console.log(remote.getGlobal("sharedObj").prop1);

// console.log(
//   dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] })
// );

// const columns = [
//   { field: "_id", headerName: "ID", width: 70 },
//   { field: "genome", headerName: "Genome", width: 130 },
//   { field: "outdir", headerName: "Output Directory", width: 130 },
//   {
//     field: "adapters",
//     headerName: "Adapters",
//     width: 90,
//   },
// ];
// // works like a charm
// const createBrowserWindow = () => {
//   const win = new BrowserWindow({
//     height: 600,
//     width: 800,
//   });
//   console.log("here");
//   win.loadURL(`file:/${test}`);
// };

// export default function Table({ Copyright, classes, fixedHeightPaper }) {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios("http://localhost:5000/api/runs");

//       setData(result.data);
//     };

//     fetchData();
//   }, []);
//   console.log(data);

//   return (
//     <Container maxWidth="lg" className={classes.container}>
//       {/* <button onClick={createBrowserWindow}></button> */}
//       {data && (
//         <div style={{ height: 400, width: "100%" }}>
//           <DataGrid
//             rows={data}
//             getRowId={(row) => row._id}
//             columns={columns}
//             pageSize={5}
//             checkboxSelection
//           />
//         </div>
//       )}
//     </Container>
//   );
// }
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
import AlarmIcon from "@material-ui/icons/Alarm";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RefreshIcon from "@material-ui/icons/Refresh";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import { useAuth } from "../../hooks/useAuth";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ActionRowing from "material-ui/svg-icons/action/rowing";
import uuid from "react-uuid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const fs = require("fs");
const path = require("path");
const portastic = require("portastic");
let Client = require("ssh2-sftp-client");
let sftp = new Client();
const electron = window.require("electron");
const remote = electron.remote;
const { BrowserWindow, shell } = remote;
const http = require("http");
const homedir = require("os").homedir();
const bisepsTemp = path.join(homedir, ".bisepsTemp/");
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    // backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
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
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [deleted, setDeleted] = useState("");
  const [selectedRow, setSelectedRow] = useState({});

  const handleChange = (e) => {
    setDeleted(e.target.value);
  };
  console.log(deleted);
  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const handleLog = (row) => {
    console.log(row);
    let remotePath = `${row.remoteDir}/biseps.txt`;
    let localPath = row.date + "biseps.txt";
    console.log(path.join(bisepsTemp, localPath));
    sftp
      .connect({
        host: row.machine.hostname,
        port: row.machine.port,
        username: row.machine.username,
        ...(!(row.machine.privateKey === "") && {
          privateKey: require("fs").readFileSync(row.machine.privateKey),
        }),
        password: row.machine.password,
      })
      .then(() => {
        console.log(remotePath);
        console.log(localPath);
        console.log("made it all the way here?");
        if (!fs.existsSync(path.join(bisepsTemp, localPath))) {
          return sftp.fastGet(remotePath, path.join(bisepsTemp, localPath));
        }
      })
      .then((data) => {
        console.log("done done done");
        createBrowserWindow(path.join(bisepsTemp, localPath));
        sftp.end();
      })
      .catch((err) => {
        console.log(err, "catch error");
        setErrors("File isn't ready yet");
        handleOpenAlert();
        sftp.end();
      });
  };
  const handleRemoteFiles = (row, sample) => {
    if (!fs.existsSync(bisepsTemp)) {
      fs.mkdirSync(bisepsTemp);
    }
    let remoteDir = row.remoteDir;
    let remotePath = `${remoteDir}/results/${sample.samplePath}/multiqc_report.html`;
    let localPath = sample.samplePath + "-multiqc_report.html";
    sftp
      .connect({
        host: row.machine.hostname,
        port: row.machine.port,
        username: row.machine.username,
        ...(!(row.machine.privateKey === "") && {
          privateKey: require("fs").readFileSync(row.machine.privateKey),
        }),
        ...(row.machine.privateKey === "" && {
          password: row.machine.password,
        }),
      })
      .then(() => {
        console.log(remotePath);
        console.log(localPath);
        console.log("made it all the way here?");
        if (!fs.existsSync(path.join(bisepsTemp, localPath))) {
          return sftp.fastGet(remotePath, path.join(bisepsTemp, localPath));
        }
      })
      .then((data) => {
        console.log("done done done");
        createBrowserWindow(path.join(bisepsTemp, localPath));
        sftp.end();
      })
      .catch((err) => {
        console.log(err, "catch error");
        setErrors("File isn't ready yet");
        handleOpenAlert();
        sftp.end();
      });
    // var conn = new Client();
    // conn
    //   .on("ready", function () {
    //     console.log("Client :: ready");
    //     conn.exec("uptime", function (err, stream) {
    //       if (err) throw err;
    //       stream
    //         .on("close", function (code, signal) {
    //           console.log(
    //             "Stream :: close :: code: " + code + ", signal: " + signal
    //           );
    //           conn.end();
    //         })
    //         .on("data", function (data) {
    //           console.log("STDOUT: " + data);
    //         })
    //         .stderr.on("data", function (data) {
    //           console.log("STDERR: " + data);
    //         });
    //     });
    //   })
    //   .connect({
    //     host: "genossh.genouest.org",
    //     port: 22,
    //     username: "shatira",
    //     privateKey: require("fs").readFileSync("/home/shatira/.ssh/id_rsa_gen"),
    //   });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleRerun = (row) => {
    const request = {
      ...row,
    };
    const token = sessionStorage.jwtToken;
    const options = {
      method: "POST",
      path: "http://localhost/api/runs/rerun",
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
  const handleDelete = (id, user, outdir, deleted) => {
    console.log(id);

    if (deleted === "DELETE") {
      const request = {
        user: user.user,
      };
      const token = sessionStorage.jwtToken;
      const options = {
        method: "DELETE",
        path: `http://localhost/api/runs/${id}`,
        socketPath: sessionStorage.Sock,
        hostname: "unix",
        port: null,
        data: request,
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
      console.log(request);
      req.end();
      fs.rmdirSync(outdir, { recursive: true });

      handleClose();
      window.location.reload(false);
    } else {
      console.log("write DELETE to confirm");
      setErrors("write DELETE to confirm or Cancel");
      handleOpenAlert();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.jwtToken;
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

  const createBrowserWindow = (path) => {
    const win = new BrowserWindow({
      height: 720,
      width: 1080,
    });
    console.log("here");

    win.loadURL(`file://${path}`);
  };

  console.log(data);
  const openInFolder = (path) => {
    shell.showItemInFolder(path);
  };
  console.log(data);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Snackbar
        open={openAlert}
        autoHideDuration={10000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={errors && errors.length > 0 ? "error" : "success"}
        >
          {errors && errors.length > 0
            ? `Error : ${errors}`
            : "Remote file copied locally successfully"}
        </Alert>
      </Snackbar>
      <Grid container direction="column" alignItems="center">
        <Box m={3}>
          <Button
            variant="contained"
            variant="outlined"
            color="primary"
            component={Link}
            to="/newrun"
          >
            New Alignment
          </Button>
          {/* <Button
            alignItems="center"
            variant="contained"
            variant="outlined"
            color="primary"
            onClick={handleRemoteFiles}
          >
            New Button
          </Button> */}
        </Box>
      </Grid>

      {/* important */}
      {/* 
      <iframe
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
        <Dialog
          key={selectedRow._id}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Confirm Delete for</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action will definitively delete all Run information as well
              as corresponding files, please Confirm by writing DELETE in all
              caps.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="confirmation"
              value={deleted}
              onChange={handleChange}
              label="write DELETE"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete(
                  selectedRow._id,
                  user,
                  selectedRow.outdir,
                  deleted
                );
              }}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {data.length > 0 ? (
          data.map((row) => (
            <Grid key={row._id} item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
                Analysis created by {row.createdBy.name} on{" "}
                {row.date.split("T")[0]}
              </Typography>

              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClickOpen(row)}
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}

                <Button
                  variant="contained"
                  color="primary"
                  disabled={row.remote ? true : false}
                  onClick={() => openInFolder(`${row.outdir}/results`)}
                  className={classes.button}
                  endIcon={row.remote ? <Icon>cloud</Icon> : <Icon>send</Icon>}
                >
                  {row.remote ? "Remote" : "Open Folder"}
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => handleRerun(row)}
                  className={classes.button}
                  startIcon={<RefreshIcon />}
                >
                  Rerun
                </Button>

                <Button
                  variant="contained"
                  color="default"
                  onClick={
                    row.remote
                      ? () => handleLog(row)
                      : () =>
                          createBrowserWindow(
                            path.join(row.outdir, "biseps.txt")
                          )
                  }
                  className={classes.button}
                  startIcon={<RefreshIcon />}
                >
                  Show Log
                </Button>
              </div>
              <div className={classes.demo}>
                <List dense={dense}>
                  {row.samples.map((sample) => (
                    <ListItem
                      button
                      disabled={
                        row.remote
                          ? false
                          : fileExist(
                              `${row.outdir}/results/${sample.samplePath}/multiqc_report.html`
                            )
                          ? false
                          : true
                      }
                      key={sample._id}
                      onClick={() => {
                        if (row.remote) {
                          handleRemoteFiles(row, sample);
                        } else {
                          console.log(sample);
                          const path = `${row.outdir}/results/${sample.samplePath}/multiqc_report.html`;
                          console.log(path);
                          createBrowserWindow(path);
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${sample.sample} MultiQC Report`}
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
            key={0}
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
