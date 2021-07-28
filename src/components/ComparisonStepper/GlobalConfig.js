import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Slider from "@material-ui/core/Slider";
import { useConfig } from "../../hooks/useConfig";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
const http = require("http");

const electron = window.require("electron");
const remote = electron.remote;
const { BrowserWindow, dialog, Menu } = remote;
const styles = {
  hidden: {
    display: "none",
  },
  importLabel: {
    color: "black",
  },
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function GlobalConfig() {
  const { compState, setCompState } = useConfig();
  const [data, setData] = useState([]);
  const createBrowserWindow = (path) => {
    const win = new BrowserWindow({
      height: 720,
      width: 1080,
    });
    console.log("here");

    win.loadURL(path);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.jwtToken;
      const Sock = await sessionStorage.Sock;
      const options = {
        method: "GET",
        path: "http://localhost/api/machines/",
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
  const classes = useStyles();
  const handleChange = (event) => {
    setCompState({
      ...compState,
      [event.target.name]: event.target.value,
    });
  };
  console.log(compState);
  const handleGenome = (e) => {
    setCompState({
      ...compState,
      [e.target.id]: document.getElementById(e.target.id).files[0].path,
      outdir:
        document
          .getElementById(e.target.id)
          .files[0].path.match(/(.*)[\/\\]/)[0] || "",
    });
  };
  const handleFile = (e) => {
    setCompState({
      ...compState,
      [e.target.id]: document.getElementById(e.target.id).files[0].path,
    });
  };
  const handleCompState = (e) => {
    console.log(e.target.value);
    setCompState({
      ...compState,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckBox = (e) => {
    setCompState({
      ...compState,
      [e.target.name]: e.target.checked,
    });
  };
  const handleSlider = (e, newValue) => {
    console.log(e.target);
    setCompState({
      ...compState,
      [e.target.id]: newValue,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        General configuration
      </Typography>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              component="label"
              color={compState.outdir === "" ? "default" : "primary"}
            >
              {compState && compState.outdir === ""
                ? "Output Directory "
                : compState.outdir.split(/[\\/]/).pop()}
              <input
                required
                id="outdir"
                name="outdir"
                label="Output Directory"
                value
                onClick={() =>
                  dialog.showOpenDialog(
                    { properties: ["openDirectory"] },
                    (dirs) => {
                      handleCompState();
                    }
                  )
                }
                hidden
              />
            </Button>
            <FormHelperText>Choose output directory</FormHelperText>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>Method</InputLabel>
            <Select
              value={compState.method}
              labelId="method"
              id="method"
              name="method"
              onChange={handleCompState}
            >
              <MenuItem value="bins">Bins</MenuItem>
              <MenuItem value="neighbourhood">Neighbourhood</MenuItem>{" "}
              {compState.stat != "betareg" ? (
                <MenuItem value="noise_filter">Noise Filter</MenuItem>
              ) : (
                ""
              )}
            </Select>
            <FormHelperText>
              Choose DMR Calling method. Default: bins
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="contexts-checkbox-label">Context</InputLabel>
            <Select
              labelId="contexts-checkbox-label"
              id="contexts"
              multiple
              name="contexts"
              value={compState.contexts}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem key={1} value="CG">
                <Checkbox checked={compState.contexts.indexOf("CG") > -1} />
                <ListItemText primary={"CG"} />
              </MenuItem>
              <MenuItem key={2} value={"CHG"}>
                <Checkbox checked={compState.contexts.indexOf("CHG") > -1} />
                <ListItemText primary={"CHG"} />
              </MenuItem>
              <MenuItem key={3} value={"CHH"}>
                <Checkbox checked={compState.contexts.indexOf("CHH") > -1} />
                <ListItemText primary={"CHH"} />
              </MenuItem>
            </Select>
            <FormHelperText>
              Choose contexts to perform DMR analysis on.
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>Statistical Test</InputLabel>
            <Select
              value={compState.stat}
              labelId="stat"
              id="stat"
              name="stat"
              onChange={handleCompState}
            >
              <MenuItem value="score">Score</MenuItem>
              <MenuItem value="fisher">Fisher</MenuItem>
              {compState.method != "noise_filter" ? (
                <MenuItem value="betareg">Betareg</MenuItem>
              ) : (
                ""
              )}

              {/* <input
                accept=".fa"
                className={classes.input}
                style={{ display: "none" }}
                id="test"
                multiple
                onChange={handleRunFiles}
                type="file"
              />
              <label htmlFor="test">
                <MenuItem value="Upload">Upload</MenuItem>
              </label> */}
            </Select>
            <FormHelperText>Choose test</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>p-Value</Typography>
            <Slider
              id="pValueThreshold"
              name="pValueThreshold"
              onChange={handleSlider}
              value={compState.pValueThreshold}
              step={0.01}
              min={0}
              max={1}
              valueLabelDisplay="auto"
            />
            <FormHelperText>
              p-Value threshold. See{" "}
              <Link
                onClick={() =>
                  createBrowserWindow(
                    "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                  )
                }
              >
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>
        {compState.method === "neighbourhood" ? (
          ""
        ) : (
          <Grid item xs={12} sm={4}>
            <FormControl className={classes.formControl}>
              <Typography gutterBottom>
                {compState.method === "bins" ? "Bin Size" : "Window Size"}{" "}
              </Typography>
              <Slider
                id="binsize"
                name="binsize"
                onChange={handleSlider}
                value={compState.binsize}
                step={200}
                min={0}
                max={5000}
                valueLabelDisplay="auto"
              />
              <FormHelperText>
                Choose bin size for Bins and Noise Filter methods. See{" "}
                <Link
                  onClick={() =>
                    createBrowserWindow(
                      "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                    )
                  }
                >
                  docs
                </Link>
                .
              </FormHelperText>
            </FormControl>
          </Grid>
        )}
        {compState.stat != "betareg" ? (
          ""
        ) : (
          <>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <Typography gutterBottom>
                  Methylated Reads Pseudocount
                </Typography>
                <Input
                  id="pseudocountM"
                  name="pseudocountM"
                  type="number"
                  onChange={handleCompState}
                  value={compState.pseudocountM}
                />
                <FormHelperText>
                  Numerical Value to be added to methylated reads before beta
                  regression. See{" "}
                  <Link
                    onClick={() =>
                      createBrowserWindow(
                        "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                      )
                    }
                  >
                    docs
                  </Link>
                  .
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <Typography gutterBottom>Total Reads Pseudocount</Typography>
                <Input
                  id="pseudocountN"
                  name="pseudocountN"
                  type="number"
                  onChange={handleCompState}
                  value={compState.pseudocountN}
                />
                <FormHelperText>
                  Numerical Value to be added to total reads before beta
                  regression. See{" "}
                  <Link
                    onClick={() =>
                      createBrowserWindow(
                        "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                      )
                    }
                  >
                    docs
                  </Link>
                  .
                </FormHelperText>
              </FormControl>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>Minimum Cytosines Count</Typography>
            <Input
              id="minCytosinesCount"
              name="minCytosinesCount"
              type="number"
              onChange={handleCompState}
              value={compState.minCytosinesCount}
            />
            <FormHelperText>
              Minimum methylated cytosines count present in a region to be
              qualified as DMR. See{" "}
              <Link
                onClick={() =>
                  createBrowserWindow(
                    "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                  )
                }
              >
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>Minimum Reads Per Cytosine </Typography>
            <Input
              id="minReadsPerCytosine"
              name="minReadsPerCytosine"
              type="number"
              onChange={handleCompState}
              value={compState.minReadsPerCytosine}
            />
            <FormHelperText>
              Minimum reads covering methylated cytosines. See{" "}
              <Link
                onClick={() =>
                  createBrowserWindow(
                    "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                  )
                }
              >
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>
              Minimum Proportion Difference In Methylation
            </Typography>
            <Slider
              id="minProportionDifference"
              name="minProportionDifference"
              onChange={handleSlider}
              value={compState.minProportionDifference}
              step={0.1}
              min={0}
              max={1}
              valueLabelDisplay="auto"
            />
            <FormHelperText>
              p-Value threshold. See{" "}
              <Link
                onClick={() =>
                  createBrowserWindow(
                    "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                  )
                }
              >
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>Minimum Gap</Typography>
            <Input
              id="minGap"
              name="minGap"
              type="number"
              onChange={handleCompState}
              value={compState.minGap}
            />
            <FormHelperText>
              DMRs separated by a gap of at least minGap are not merged. See{" "}
              <Link
                onClick={() =>
                  createBrowserWindow(
                    "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                  )
                }
              >
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>Minimum Size</Typography>
            <Input
              id="minSize"
              name="minSize"
              value={compState.minSize}
              type="number"
              onChange={handleCompState}
            />
            <FormHelperText>
              DMRs with a size smaller than minSize are discarded. See{" "}
              <Link
                onClick={() =>
                  createBrowserWindow(
                    "https://bioconductor.org/packages/release/bioc/html/DMRcaller.html"
                  )
                }
              >
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>

        {compState.method != "noise_filter" ? (
          ""
        ) : (
          <Grid item xs={12} sm={4}>
            <FormControl className={classes.formControl}>
              <InputLabel>Kernel Function</InputLabel>
              <Select
                value={compState.kernelFunction}
                labelId="kernelFunction"
                id="kernelFunction"
                name="kernelFunction"
                onChange={handleCompState}
              >
                <MenuItem value="uniform">Uniform</MenuItem>
                <MenuItem value="triangular">Triangular</MenuItem>{" "}
                <MenuItem value="gaussian">Gaussian</MenuItem>
                <MenuItem value="epanechnicov">Epanechnicov</MenuItem>
              </Select>
              <FormHelperText>
                Choose kernel function to be used with noise filter method.
                Default : uniform.
              </FormHelperText>
            </FormControl>
          </Grid>
        )}

        <Grid item sm={12}>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              component="label"
              color={compState.genome === "" ? "default" : "primary"}
            >
              {compState.genome === ""
                ? "upload genome"
                : compState.genome.split(/[\\/]/).pop()}
              <input
                type="file"
                required
                id="genome"
                name="genome"
                label="Genome"
                accept=".fasta , .fa , .fq , .fq.gz"
                onChange={handleGenome}
                type="file"
                hidden
              />
            </Button>

            <FormHelperText>Choose genome in .fasta Format </FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              component="label"
              color={compState.annot === "" ? "default" : "primary"}
            >
              {compState.annot === ""
                ? "upload annotation"
                : compState.annot.split(/[\\/]/).pop()}
              <input
                type="file"
                id="annot"
                name="annot"
                label="Annotation"
                accept=".gff , .bed , .tsv , .gff3"
                onChange={handleFile}
                type="file"
                hidden
              />
            </Button>

            <FormHelperText>
              Choose annotation file in gff/bed Format
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              component="label"
              color={compState.outdir === "" ? "default" : "primary"}
            >
              {compState.outdir === ""
                ? "upload genome"
                : compState.outdir.split(/[\\/]/).pop()}
              <input
                type="file"
                required
                id="genome"
                name="genome"
                label="Genome"
                accept=".fasta , .fa , .fq , .fq.gz"
                onChange={handleGenome}
                type="file"
                hidden
              />
            </Button>

            <FormHelperText>Choose genome in .fasta Format</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Number of Mismatches</InputLabel>
            <Select
              value={compState.n}
              labelId="n"
              id="n"
              name="n"
              onChange={handleCompState}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
            <FormHelperText>
              Choose Number of Mismatches. Default: 0, choosing 1 makes process
              much slower
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>Minlen </Typography>
            <Slider
              name="minlen"
              id="minlen"
              onChange={handleSlider}
              value={compState.minlen}
              aria-labelledby="minlen"
              step={10}
              min={30}
              max={100}
              valueLabelDisplay="auto"
            />{" "}
            <FormHelperText>Choose minimal read length</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>Min-Score </Typography>
            <Slider
              id="minscore"
              name="minscore"
              onChange={handleSlider}
              value={compState.minscore}
              step={-0.1}
              min={-1}
              max={-0.2}
              valueLabelDisplay="auto"
            />
            <FormHelperText>
              Choose minimal alignement quality score. See
              <Link href="http://www.bioinformatics.babraham.ac.uk/projects/bismark/Bismark_User_Guide_v0.7.12.pdf">
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography gutterBottom>L</Typography>
            <Slider
              value={compState.l}
              onChange={handleSlider}
              aria-labelledby="l"
              id="l"
              name="l"
              step={1}
              min={20}
              max={32}
              valueLabelDisplay="auto"
            />
            <FormHelperText>
              Choose k-mer length for alignment. Higher : Faster but less
              sensitive
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                onChange={handleCheckBox}
                color="secondary"
                name="subsample"
              />
            }
         ></FormControlLabel>
        </Grid> */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Execution Parameters{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                onChange={handleCheckBox}
                color="secondary"
                name="remote"
                disabled={data.length > 0 ? false : true}
                checked={compState.remote}
              />
            }
            label={
              data.length > 0
                ? "Toggle this to choose a remote machine"
                : "add a remote machine first"
            }
          ></FormControlLabel>
        </Grid>

        {compState.remote === true ? (
          <Grid container>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel>Machine</InputLabel>
                <Select
                  defaultValue={compState.machine}
                  labelId="machine"
                  id="machine"
                  name="machine"
                  onChange={handleCompState}
                >
                  {data &&
                    data.map((machine, idx) => {
                      return (
                        <MenuItem key={idx} value={machine}>
                          {machine.hostname}
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText>Specify Remote machine</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <TextField
                  autoFocus
                  value={compState.remoteDir}
                  onChange={handleCompState}
                  margin="dense"
                  id="remoteDir"
                  name="remoteDir"
                  label="Remote Output Directory"
                  type="text"
                  fullWidth
                />
                <FormHelperText>Specify Remote Output directory</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    onChange={handleCheckBox}
                    color="secondary"
                    name="cluster"
                    checked={compState.cluster}
                  />
                }
                label="Toggle this option to execute in SLURM Cluster mode"
              ></FormControlLabel>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </React.Fragment>
  );
}
