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

const handler = require("serve-handler");
const { shell } = window.require("electron");
const fs = require("fs");
const http = require("http");
const path = require("path");
const portastic = require("portastic");
const homedir = require("os").homedir();
const bisepsTemp = path.join(homedir, ".bisepsTemp/");

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

export default function VisualizationFill() {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [checkedComp, setCheckedComp] = useState([]);

  const [checkedTrack, setCheckedTrack] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const { user } = useAuth();

  const handleToggle = (genome) => () => {
    const currentIndex = checked.indexOf(genome);
    console.log(currentIndex);
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
      console.log(currentIndex);
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
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedTrack(newChecked);
    };

  const handleToggleComp = (bed, bedtbi, associatedGenome, id) => () => {
    const currentIndex = checkedComp.findIndex((x) => x.id === id);
    console.log(currentIndex);
    const newChecked = [...checkedComp];

    if (currentIndex === -1) {
      newChecked.push({
        bed,
        bedtbi,
        associatedGenome,
        id,
      });
    } else {
      newChecked.splice(currentIndex, 1);
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
  console.log(comp);
  const fileExist = (path) => {
    try {
      if (fs.existsSync(path)) {
        return true;
      }
    } catch (err) {
      return false;
    }
  };
  const downloadFiles = (row, tracks) => {
    let sftp = new Client();

    console.log(tracks);
    console.log("download files");

    console.log(homedir);

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
        // return sftp.fastGet(remotePath, path.join(bisepsTemp, localPath));
        // tracks.map((track) => {
        //   console.log(track);
        for (const track in tracks) {
          if (
            !fs.existsSync(path.join(bisepsTemp, path.basename(tracks[track])))
          ) {
            console.log(path.join(bisepsTemp, path.basename(tracks[track])));
            try {
              await sftp.fastGet(
                tracks[track],
                path.join(bisepsTemp, path.basename(tracks[track]))
              );
            } catch (err) {
              console.log(err);
            }
          }
        }
        // });
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
    setRefresh(refresh + 1);

    window.location.reload(false);
  };
  const blankSample = {};
  const helper = {};
  const mix = data.concat(comp);
  console.log(mix);
  const result = mix.reduce(function (r, o) {
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
    // const server = http.createServer(async (request, response) => {
    //   handler(request, response, {
    //     public: user.user.jbPath,
    //   });
    // });

    // server.listen(user.user.port[0], () => {
    //   console.log(server.listening);

    //   shell.openExternal(`http:///localhost:${user.user.port[0]}`);
    // });
    // server.on("error", (err) => {
    //   console.log(err);
    // });

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
        console.log(user.user.jbPath);
        server.listen(port[0], () => {
          console.log(server.listening);

          shell.openExternal(`http://localhost:${port[0]}`);
        });
        server.on("error", (err) => {
          console.log(err);
        });
      });
  };
  return (
    <Container maxWidth="lg" className={classes.container} gutterbottom>
      <Grid container direction="column" alignItems="center" gutterBottom>
        <Box m={3}>
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
          console.log(idx);

          return (
            <ListItem
              key={idx}
              button
              disabled={
                !fileExist(path.join(user.user.jbPath, genome.genome))
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
                console.log(row);
                console.log(outdir);
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
                console.log(samplePathLocal);

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
                console.log(
                  path.join(
                    user.user.jbPath,
                    `${associatedGenomePath}/${sample.samplePath}.deduplicated.bw`
                  )
                );

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
                return (
                  <ListItem
                    key={`${sample._id}-${idx}`}
                    button
                    disabled={
                      sampleExist && !dedupExist && genomEist ? false : true
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
                          onClick={() => downloadFiles(row, tracks)}
                        >
                          <GetAppIcon
                            style={{
                              color: sampleExist ? "green" : "gray",
                            }}
                          />
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
                      console.log(context);
                      console.log(comparison);
                      const outdir = row.remote
                        ? `${row.remoteDir}`
                        : row.outdir;
                      const associatedGenomePath = row.genome.replace(
                        /^.*[\\\/]/,
                        ""
                      );
                      const associatedGenome =
                        path.parse(associatedGenomePath).name;

                      const bed = `${outdir}/results/${comparison.id}/${comparison.id}-${context}.bed.gz`;
                      const bedtbi = `${outdir}/results/${comparison.id}/${comparison.id}-${context}.bed.gz.tbi`;
                      const bedtbiPathLocal = path.join(
                        bisepsTemp,
                        path.basename(bedtbi)
                      );
                      const bedPathLocal = path.join(
                        bisepsTemp,
                        path.basename(bed)
                      );
                      console.log(checkedComp);
                      const tracks = [bed, bedtbi];
                      return (
                        <ListItem
                          key={`${comparison._id}-${idx}-${context}`}
                          button
                          disabled={
                            fileExist(row.remote ? bedPathLocal : bed) &&
                            !fileExist(
                              path.join(
                                user.user.jbPath,
                                `${associatedGenome}/${comparison.id}-${context}.bed.gz`
                              )
                            ) &&
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
                                    `${associatedGenome}/${comparison.id}-${context}.bed.gz`
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
                                  color: fileExist(
                                    row.remote ? bedPathLocal : bed
                                  )
                                    ? "green"
                                    : "gray",
                                }}
                              />
                            </IconButton>
                            {row.remote ? (
                              <IconButton
                                edge="end"
                                aria-label="files"
                                onClick={() => downloadFiles(row, tracks)}
                              >
                                <GetAppIcon />
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
