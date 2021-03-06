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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import GetAppIcon from "@material-ui/icons/GetApp";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDownloads } from "../../hooks/useDownloads";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const handler = require("serve-handler");
const { shell } = window.require("electron");
const fs = require("fs");
const http = require("http");
const path = require("path");
const portastic = require("portastic");
const homedir = require("os").homedir();
const bisepsTemp = path.join(homedir, ".biseps", "tmp");

let Client = require("ssh2-sftp-client");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function VisualizationFill() {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [checkedComp, setCheckedComp] = useState([]);
  const [checkedTrack, setCheckedTrack] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [onSelected, setOnSelect] = useState(null);
  const [onSelectedComp, setOnSelectComp] = useState(null);
  const { loading, setLoading } = useDownloads();
  const [openAlert, setOpenAlert] = useState(false);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { user, browser, setBrowser } = useAuth();

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

  const handleToggleTrack =
    (track, associatedGenome, id, name, cgbw, chgbw, chhbw, bedbw) => () => {
      const currentIndex = checkedTrack.findIndex((x) => x.id === id);
      const newChecked = [...checkedTrack];

      if (currentIndex === -1) {
        newChecked.push({
          track,
          cgbw,
          chgbw,
          chhbw,
          bedbw,
          associatedGenome,
          id,
          name,
        });
        setOnSelect(id);
      } else {
        newChecked.splice(currentIndex, 1);
        setOnSelect(null);
      }

      setCheckedTrack(newChecked);
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
  const handleToggleComp = (bed, bedtbi, associatedGenome, id) => () => {
    const currentIndex = checkedComp.findIndex((x) => x.id === id);
    const newChecked = [...checkedComp];
    console.log(id);
    if (currentIndex === -1) {
      newChecked.push({
        bed,
        bedtbi,
        associatedGenome,
        id,
      });
      setOnSelectComp(id);
    } else {
      newChecked.splice(currentIndex, 1);
      setOnSelectComp(null);
    }
    setCheckedComp(newChecked);
  };

  const [data, setData] = useState([]);
  const [comp, setComp] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.jwtToken;
      const Sock = await sessionStorage.Sock;
      const options = {
        method: "GET",
        path: `http://localhost/api/runs/${user.user.id}`,
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
    const fetchComparisons = async () => {
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
            setComp(jsbody);
          });
      });
      req.on("error", function (e) {
        console.log("ERROR: " + e.message);
      });
    };
    fetchData();
    fetchComparisons();
  }, [refresh]);
  const fileExist = (path) => {
    try {
      if (fs.existsSync(path)) {
        return true;
      }
    } catch (err) {
      return false;
    }
  };
  const downloadFiles = (row, tracks, idx) => {
    let sftp = new Client();

    console.log("download files");

    if (!fs.existsSync(bisepsTemp)) {
      fs.mkdirSync(bisepsTemp);
    }

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
      .then(async () => {
        console.log("made it all the way here?");
        for (const track in tracks) {
          const local = path.join(bisepsTemp, path.basename(tracks[track]));
          const localtmp = local + ".tmp";
          if (
            !fs.existsSync(path.join(bisepsTemp, path.basename(tracks[track])))
          ) {
            try {
              setLoading((prevState) => ({ ...prevState, [idx]: true }));
              await sftp.fastGet(
                tracks[track].split(path.sep).join(path.posix.sep),
                localtmp
              );
            } catch (err) {
              setErrors(
                "An unexpected error occurred, please make sure that this sample has been correctly processed"
              );
              handleOpenAlert();
              console.log(err);
            }
          }
        }
        // });
      })
      .then(() => {
        for (const track in tracks) {
          setLoading((prevState) => ({ ...prevState, [idx]: false }));
          const local = path.join(bisepsTemp, path.basename(tracks[track]));
          const localtmp = local + ".tmp";
          fs.rename(localtmp, local, function (err) {
            if (err) console.log("ERROR: " + err);
          });
        }
        sftp.end();
      })
      .finally((data) => {
        console.log("done done done");
        sftp.end();
      })
      .catch((err) => {
        console.log(err, "catch error");
      });
  };

  const handlePopulate = () => {
    const request = {
      genomes: checked,
      tracks: checkedTrack,
      comparisons: checkedComp,
      userId: user.user.id,
      jbPath: user.user.jbPath,
    };
    const token = sessionStorage.jwtToken;
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
    setRefresh(refresh + 1);
    setBrowser("");
    window.location.reload(false);
  };
  const handleReset = () => {
    const request = {
      jbPath: user.user.jbPath,
    };
    const token = sessionStorage.jwtToken;
    const options = {
      method: "POST",
      path: "http://localhost/api/jbrowse/resetJB",
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
    setBrowser("");
    setRefresh(refresh + 1);

    window.location.reload(false);
  };
  const blankSample = {};
  const helper = {};
  const mix = data.concat(comp);
  const result = mix.reduce(function (r, o) {
    const key = o.genome;
    const genome = path.basename(o.genome);
    const genomePath = o.genome;
    if (!helper[key]) {
      helper[key] = Object.assign({ genome, genomePath }, blankSample); // create a copy of o
      r.push(helper[key]);
    }
    return r;
  }, []);

  const handleServe = () => {
    portastic
      .find({
        min: 30000,
        max: 35000,
        retrieve: 1,
      })
      .then(function (port) {
        const server = http.createServer(async (request, response) => {
          handler(request, response, {
            public: user.user.jbPath,
          });
        });
        server.listen(port[0], () => {
          shell.openExternal(`http://localhost:${port[0]}`);
          setBrowser(`http://localhost:${port[0]}`);
        });
        server.on("error", (err) => {
          console.log(err);
        });
      });
  };
  return (
    <Container maxWidth="lg" className={classes.container} gutterbottom>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
      <Grid container direction="column" alignItems="center" gutterBottom>
        <Box m={sessionStorage.Platform == "linux" ? 3 : 10}>
          {" "}
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              className={classes.button}
              alignItems="center"
              variant="contained"
              color="default"
              disabled={browser !== ""}
              onClick={handleServe}
            >
              Start Jbrowse{" "}
            </Button>
            <Button
              className={classes.button}
              onClick={handleReset}
              alignItems="center"
              variant="contained"
              color="secondary"
            >
              Reset Jbrowse{" "}
            </Button>
            <Button
              className={classes.button}
              onClick={handlePopulate}
              alignItems="center"
              variant="contained"
              color="primary"
            >
              Populate Jbrowse{" "}
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <List
        subheader={
          result.length > 0 ? <Typography type="h1">Genomes</Typography> : ""
        }
      >
        {result.map((genome, idx) => {
          const labelId = `checkbox-list-label-${genome}`;

          return (
            <ListItem
              key={idx}
              button
              disabled={
                !fileExist(path.join(user.user.jbPath, genome.genome)) &&
                !fileExist(path.join(user.user.jbPath, genome.genome) + ".fai")
                  ? false
                  : true
              }
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
                <IconButton
                  disabled={
                    fileExist(path.join(user.user.jbPath, genome.genome))
                      ? false
                      : true
                  }
                  edge="end"
                  aria-label="comments"
                >
                  <CheckCircleOutlineIcon
                    style={{
                      color: fileExist(
                        path.join(user.user.jbPath, genome.genome)
                      )
                        ? "green"
                        : "gray",
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <List
        subheader={
          result.length > 0 ? <Typography type="h1">Alignments</Typography> : ""
        }
      >
        {data.map((row) => {
          const labelId = `checkbox-list-label-${row}`;
          return (
            <div>
              {row.samples.map((sample, idx) => {
                const outdir = row.remote ? `${row.remoteDir}` : row.outdir;
                const bedGraph = `${outdir}/results/${sample.samplePath}/methylation_extraction_bismark/${sample.samplePath}.deduplicated.sorted.bedGraph.bw`;
                const cgBW = `${outdir}/results/${sample.samplePath}/methylation_extraction_bismark/${sample.samplePath}.deduplicated.CX_report.txt.sorted.cg.bw`;
                const chgBW = `${outdir}/results/${sample.samplePath}/methylation_extraction_bismark/${sample.samplePath}.deduplicated.CX_report.txt.sorted.chg.bw`;
                const chhBW = `${outdir}/results/${sample.samplePath}/methylation_extraction_bismark/${sample.samplePath}.deduplicated.CX_report.txt.sorted.chh.bw`;
                const samplePath = `${outdir}/results/${sample.samplePath}/alignment_bismark/${sample.samplePath}.deduplicated.bw`;
                const bedGraphLocal = path.join(
                  bisepsTemp,
                  path.basename(bedGraph)
                );
                // const samplePathBai = `${outdir}/results/${sample.samplePath}/alignment_bismark/${sample.samplePath}.deduplicated.bam.bai`;
                const cgBWLocal = path.join(bisepsTemp, path.basename(cgBW));
                const chgBWLocal = path.join(bisepsTemp, path.basename(chgBW));
                const chhBWLocal = path.join(bisepsTemp, path.basename(chhBW));
                const samplePathLocal = path.join(
                  bisepsTemp,
                  path.basename(samplePath)
                );

                const tracks = [
                  samplePath,
                  bedGraph,
                  cgBW,
                  chgBW,
                  chhBW,
                  // samplePathBai,
                ];
                const associatedGenomePath = row.genome.replace(
                  /^.*[\\\/]/,
                  ""
                );
                const associatedGenome = path.parse(associatedGenomePath).name;

                const sampleExist = fileExist(
                  row.remote ? samplePathLocal : samplePath
                );
                const genomEist = fileExist(
                  path.join(user.user.jbPath, `${associatedGenomePath}`)
                );
                const dedupExist = fileExist(
                  path.join(
                    user.user.jbPath,
                    `${associatedGenome}/${sample.samplePath}.deduplicated.bw`
                  )
                );
                const ident = `${sample._id}-viz`;
                return (
                  <ListItem
                    key={`${sample._id}-${idx}`}
                    button
                    disabled={
                      !(onSelected && onSelected !== sample._id) &&
                      sampleExist &&
                      !dedupExist &&
                      genomEist
                        ? false
                        : true
                    }
                    onClick={handleToggleTrack(
                      row.remote ? samplePathLocal : samplePath,
                      associatedGenome,
                      `${sample._id}`,
                      sample.sample,
                      row.remote ? cgBWLocal : cgBW,
                      row.remote ? chgBWLocal : chgBW,
                      row.remote ? chhBWLocal : chhBW,
                      row.remote ? bedGraphLocal : bedGraph
                    )}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={
                          checkedTrack.findIndex((x) =>
                            row.remote
                              ? x.track === samplePathLocal
                              : x.track === samplePath
                          ) !== -1
                        }
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={sample.sample} />
                    <ListItemSecondaryAction>
                      <IconButton
                        disabled={
                          sampleExist && dedupExist && genomEist ? false : true
                        }
                        edge="end"
                        aria-label="files"
                      >
                        <CheckCircleOutlineIcon
                          style={{
                            color: dedupExist ? "green" : "gray",
                          }}
                        />
                      </IconButton>
                      {row.remote ? (
                        <IconButton
                          edge="end"
                          disabled={sampleExist}
                          aria-label="files"
                          onClick={() => downloadFiles(row, tracks, ident)}
                        >
                          {loading[ident] && (
                            <Box sx={{ width: "100%" }}>
                              <CircularProgress />
                            </Box>
                          )}{" "}
                          <GetAppIcon
                            style={{
                              color: sampleExist ? "green" : "gray",
                            }}
                          />
                          {sampleExist
                            ? "Alignment files available"
                            : "Download alignment files"}
                        </IconButton>
                      ) : (
                        ""
                      )}{" "}
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </div>
          );
        })}
      </List>
      <List
        subheader={
          comp.length > 0 ? <Typography type="h1">Comparisons</Typography> : ""
        }
      >
        {comp.map((row) => {
          const labelId = `checkbox-list-label-${row._id}`;
          const associatedGenomePath = row.genome.replace(/^.*[\\\/]/, "");
          const genomExist = fileExist(
            path.join(user.user.jbPath, `${associatedGenomePath}`)
          );
          return (
            <div>
              {row.comparisons.map((comparison, idx) => {
                // const bedLocal = `${outdir}/${comparison.id}/report.html`;

                return (
                  <>
                    {row.contexts.map((context) => {
                      const outdir = row.remote
                        ? `${row.remoteDir}`
                        : row.outdir;
                      const associatedGenomePath = row.genome.replace(
                        /^.*[\\\/]/,
                        ""
                      );
                      const associatedGenome =
                        path.parse(associatedGenomePath).name;

                      const bed = `${outdir}/methylation/${comparison.id}-${context}/${comparison.id}-${context}-overallMethylation.bed.gz`;
                      const bedtbi = `${bed}.tbi`;
                      const bedtbiPathLocal = path.join(
                        bisepsTemp,
                        path.basename(bedtbi)
                      );
                      const bedPathLocal = path.join(
                        bisepsTemp,
                        path.basename(bed)
                      );
                      const fileDownloaded = fileExist(bedPathLocal);
                      const debExist = fileExist(
                        path.join(
                          user.user.jbPath,
                          associatedGenome,
                          `${comparison.id}-${context}-overallMethylation.bed.gz`
                        )
                      );
                      const tracks = [bed, bedtbi];
                      const ident = `${comparison._id}-${context}-viz`;

                      return (
                        <ListItem
                          key={`${comparison._id}-${idx}-${context}`}
                          button
                          disabled={
                            !(
                              onSelectedComp &&
                              onSelectedComp !== `${comparison.id}-${context}`
                            ) &&
                            fileExist(row.remote ? bedPathLocal : bed) &&
                            !debExist &&
                            genomExist
                              ? false
                              : true
                          }
                          onClick={handleToggleComp(
                            row.remote ? bedPathLocal : bed,
                            row.remote ? bedtbiPathLocal : bedtbi,
                            associatedGenome,
                            `${comparison.id}-${context}`
                          )}
                        >
                          {" "}
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={
                                checkedComp.findIndex((x) =>
                                  row.remote
                                    ? x.bed === bedPathLocal
                                    : x.bed === bed
                                ) !== -1
                              }
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={`${comparison.id}-${context}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              disabled={
                                fileExist(row.remote ? bedPathLocal : bed) &&
                                fileExist(
                                  path.join(
                                    user.user.jbPath,
                                    "associatedGenome",
                                    `${comparison.id}-${context}.bed.gz`
                                  )
                                ) &&
                                genomExist
                                  ? false
                                  : true
                              }
                              edge="end"
                              aria-label="files"
                            >
                              <CheckCircleOutlineIcon
                                style={{
                                  color: debExist ? "green" : "gray",
                                }}
                              />
                            </IconButton>
                            {row.remote ? (
                              <IconButton
                                edge="end"
                                disabled={fileDownloaded}
                                aria-label="files"
                                onClick={() =>
                                  downloadFiles(row, tracks, ident)
                                }
                              >
                                <GetAppIcon
                                  style={{
                                    color: fileDownloaded ? "green" : "gray",
                                  }}
                                />
                                {fileDownloaded
                                  ? "Comparison files available"
                                  : "Download comparison files"}
                                {loading[ident] && (
                                  <Box sx={{ width: "100%" }}>
                                    <CircularProgress />
                                  </Box>
                                )}{" "}
                              </IconButton>
                            ) : (
                              ""
                            )}{" "}
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </>
                );
              })}
            </div>
          );
        })}
      </List>
    </Container>
  );
}
