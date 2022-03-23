import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import RefreshIcon from "@material-ui/icons/Refresh";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../hooks/useAuth";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import ToggleButton from "@material-ui/lab/ToggleButton";
import TimelapseOutlinedIcon from "@material-ui/icons/TimelapseOutlined";

const path = require("path");
const fs = require("fs");
const { clipboard } = require("electron");
const electron = window.require("electron");
const remote = electron.remote;
const { BrowserWindow, shell } = remote;
const http = require("http");
const homedir = require("os").homedir();
const bisepsTemp = path.join(homedir, ".biseps", "tmp");

let Client = require("ssh2-sftp-client");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {},
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const { user } = useAuth();
  const [errors, setErrors] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedRow, setSelectedRow] = useState({});
  const [selected, setSelected] = useState([]);
  const handleUnlock = (e, idx) => {
    let newSelected = [...selected];
    newSelected[idx] = !selected[idx];

    setSelected(newSelected);
    console.log(selected);
  };
  const handleChange = (e) => {
    setDeleted(e.target.value);
  };
  const handleDelete = (user, row, deleted) => {
    console.log(row);

    if (deleted === "DELETE") {
      const request = {
        user: user.user,
      };
      const token = sessionStorage.jwtToken;
      const options = {
        method: "DELETE",
        path: `http://localhost/api/comparisons/${row._id}`,
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
      req.end();
      if (remote) {
        let client = new Client();

        client
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
            return client.rmdir(row.remoteDir, true);
          })
          .then(() => {
            return client.end();
          })
          .catch((err) => {
            console.error(err.message);
          });
      } else {
        fs.rmdirSync(row.outdir, { recursive: true });
      }

      handleClose();
      setRefresh(refresh + 1);

      // window.location.reload(false);
    } else {
      console.log("write DELETE to confirm");
      setErrors("write DELETE to confirm or Cancel");
      handleOpenAlert();
    }
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleRerun = (row, selected) => {
    const request = {
      rerun: true,
      unlock: selected || false,
      ...row,
    };
    const token = sessionStorage.jwtToken;
    const options = {
      method: "POST",
      path: "http://localhost/api/comparisons/rerun",
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
    setRefresh(refresh + 1);
    setErrors("");
    setSuccessMessage(
      `${selected ? "Unlock and " : ""}Rerun Launched Successfully`
    );
    handleOpenAlert();
  };
  const makePublic = (selectedRow) => {
    console.log(selectedRow);
    const request = {
      ...selectedRow,
      public: !selectedRow.public,
    };
    const token = sessionStorage.jwtToken;
    const options = {
      method: "PUT",
      path: `http://localhost/api/comparisons/${selectedRow._id}`,
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
        if (res.statusCode !== 201) {
          console.log("failed post request");
        } else {
          console.log("successful post request");
        }
      });
    });
    req.on("error", (err) => console.log(err));
    req.write(JSON.stringify(request));
    req.end();
    setRefresh(refresh + 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.jwtToken;
      const Sock = await sessionStorage.Sock;
      const options = {
        method: "GET",
        path: `http://localhost/api/comparisons/${user.user.id}`,
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
  }, [refresh]);
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
    console.log(path);
    win.loadURL(`file://${path}`);
  };

  const openInFolder = (path) => {
    shell.showItemInFolder(path);
  };
  console.log(data);
  const handleLog = (row, filePath) => {
    if (!fs.existsSync(bisepsTemp)) {
      fs.mkdirSync(bisepsTemp);
    }
    let sftp = new Client();

    let remotePath = `${row.remoteDir}/${filePath}`;
    let localPath = row.date + path.basename(filePath);
    console.log(remotePath);
    console.log(localPath);

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
        return sftp.fastGet(
          remotePath.split(path.sep).join(path.posix.sep),
          path.join(bisepsTemp, localPath)
        );
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
  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          {errors && errors.length > 0 ? `Error : ${errors}` : successMessage}
        </Alert>
      </Snackbar>
      <Grid container direction="column" alignItems="center">
        <Box m={sessionStorage.Platform == "linux" ? 3 : 10}>
          <Button
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
                handleDelete(user, selectedRow, deleted);
              }}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {data.length > 0 ? (
          data.map((row, idx) => (
            <Grid key={row._id} item xs={12} md={12}>
              <Typography variant="h6" className={classes.title}>
                {row.remote ? "Remote " : "Local "}Comparison created by{" "}
                {row.createdBy.name}{" "}
                {row.remote ? `on ${row.machine.hostname} ` : " "} :
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
                  onClick={
                    row.remote
                      ? () => {
                          openInFolder(`${row.outdir}/config`);
                          setSuccessMessage("Remote path copied To clipboard!");
                          setErrors("");
                          handleOpenAlert();
                          clipboard.writeText(`${row.remoteDir}`);
                        }
                      : () => openInFolder(`${row.outdir}/config`)
                  }
                  className={classes.button}
                  endIcon={row.remote ? <Icon>cloud</Icon> : <Icon>send</Icon>}
                >
                  {row.remote ? "Open Local Folder" : "Open Folder"}
                </Button>

                <Button
                  variant="contained"
                  color="default"
                  onClick={
                    row.remote
                      ? () => handleLog(row, "biseps.txt")
                      : () =>
                          createBrowserWindow(
                            path.join(row.outdir, "biseps.txt")
                          )
                  }
                  className={classes.button}
                  startIcon={
                    fileExist(path.join(row.outdir, "failed.lock")) ? (
                      <ErrorIcon
                        style={{
                          color: "red",
                        }}
                      />
                    ) : fileExist(
                        path.join(
                          row.outdir,
                          row.remote ? "archive.lock" : "comparison.lock"
                        )
                      ) ? (
                      <CheckCircleIcon
                        style={{
                          color: "green",
                        }}
                      />
                    ) : (
                      <TimelapseOutlinedIcon
                        style={{
                          color: "blue",
                        }}
                      />
                    )
                  }
                >
                  Show Log
                </Button>
                <Button
                  variant="contained"
                  disabled={
                    row.remote
                      ? false
                      : fileExist(`${row.outdir}/report.html`)
                      ? false
                      : true
                  }
                  color="default"
                  onClick={
                    row.remote
                      ? () => handleLog(row, "report.html")
                      : () =>
                          createBrowserWindow(
                            path.join(row.outdir, "report.html")
                          )
                  }
                  className={classes.button}
                  startIcon={<LibraryBooksIcon />}
                >
                  View Report
                </Button>
                {row.createdBy._id === user.user.id ? (
                  <Button
                    variant="contained"
                    color={row.public ? "primary" : "secondary"}
                    onClick={() => makePublic(row)}
                  >
                    {row.public ? "Make Private" : "Make Public"}
                  </Button>
                ) : (
                  ""
                )}

                {row.createdBy._id === user.user.id &&
                (fileExist(path.join(row.outdir, "failed.lock")) ||
                  fileExist(path.join(row.outdir, "archive.lock")) ||
                  fileExist(path.join(row.outdir, "comparison.lock"))) ? (
                  <>
                    <Button
                      variant="contained"
                      className={classes.button}
                      startIcon={<RefreshIcon />}
                      onClick={() => handleRerun(row, selected[idx])}
                    >
                      RERUN{" "}
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.button}
                      color={selected[idx] ? "primary" : "secondary"}
                      onClick={(e) => {
                        handleUnlock(e, idx);
                      }}
                      endIcon={selected[idx] ? <LockOpenIcon /> : <LockIcon />}
                    >
                      {selected[idx] ? "lock" : "unlock"}
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className={classes.demo}>
                <List dense={dense}>
                  {row.comparisons.map((comparison) =>
                    row.contexts.map((context) => (
                      <ListItem
                        key={context}
                        button
                        disabled={
                          row.remote
                            ? false
                            : fileExist(
                                `${row.outdir}/methylation/${comparison.id}-${context}/${comparison.id}-${context}-overallMethylation-stats.txt`
                              )
                            ? false
                            : true
                        }
                        onClick={() => {
                          if (row.remote) {
                            // handleRemoteFiles(row, sample);
                            handleLog(
                              row,
                              `methylation/${comparison.id}-${context}/${comparison.id}-${context}-overallMethylation-stats.txt`
                            );
                          } else {
                            const path = `${row.outdir}/methylation/${comparison.id}-${context}/${comparison.id}-${context}-overallMethylation-stats.txt`;
                            createBrowserWindow(path);
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${comparison.id}-${context}`} />
                      </ListItem>
                    ))
                  )}
                </List>
              </div>
            </Grid>
          ))
        ) : (
          <Grid
            container
            spacing={0}
            alignItems="center"
            direction="column"
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
