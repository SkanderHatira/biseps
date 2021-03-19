// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import axios from "axios";
// import Container from "@material-ui/core/Container";
// const electron = window.require("electron");
// const remote = electron.remote;
// const { BrowserWindow, dialog, Menu } = remote;
// // console.log(
// //   dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] })
// // );

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
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
const got = require("got");
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
      const http = require("http");
      const options = {
        method: "GET",
        path: "http://localhost/api/runs",
        socketPath: "/tmp/bissprop.sock",
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
  return (
    <Container maxWidth="lg" className={classes.container}>
      <FormGroup row>
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
      </FormGroup>

      <Grid container spacing={2}>
        {data &&
          data.map((row) => (
            <Grid key={row._id} item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
                Avatar with text
              </Typography>
              <div className={classes.demo}>
                <List dense={dense}>
                  {/* {data &&
                    row.units.map((sample) => (
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
                      </ListItem>
                    ))} */}
                </List>
              </div>
            </Grid>
          ))}

        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Avatar with text and icon
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {generate(
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
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
