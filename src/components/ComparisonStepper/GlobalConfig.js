import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Slider from "@material-ui/core/Slider";
import { useConfig } from "../../hooks/useConfig";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useAuth } from "../../hooks/useAuth";

const filter = createFilterOptions();
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
  const { user } = useAuth();

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
        path: `http://localhost/api/machines/${user.user.id}`,
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
              <MenuItem value="base">Base Level</MenuItem>
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
              <MenuItem key={1} value="CpG">
                <Checkbox checked={compState.contexts.indexOf("CpG") > -1} />
                <ListItemText primary={"CpG"} />
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
              <MenuItem value="F">F</MenuItem>
              <MenuItem value="fast.fisher">Fast Fisher</MenuItem>
              <MenuItem value="midPval">midPval</MenuItem>
              <MenuItem value="Chisq">Chisq</MenuItem>
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
                    "https://bioconductor.org/packages/release/bioc/manuals/methylKit/man/methylKit.pdf"
                  )
                }
              >
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>

        {compState.method != "bins" ? (
          ""
        ) : (
          <>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <Typography gutterBottom>Window Size</Typography>
                <Input
                  id="binsize"
                  name="binsize"
                  type="number"
                  onChange={handleCompState}
                  value={compState.binsize}
                />
                <FormHelperText>
                  Choose bin size for Bins and Noise Filter methods. See{" "}
                  <Link
                    onClick={() =>
                      createBrowserWindow(
                        "https://bioconductor.org/packages/release/bioc/manuals/methylKit/man/methylKit.pdf"
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
                <Typography gutterBottom>Step Size</Typography>
                <TextField
                  id="stepsize"
                  name="stepsize"
                  type="number"
                  onChange={handleCompState}
                  value={compState.stepsize}
                />
                <FormHelperText>
                  Step to use to go over genome.
                  <Link
                    onClick={() =>
                      createBrowserWindow(
                        "https://bioconductor.org/packages/release/bioc/manuals/methylKit/man/methylKit.pdf"
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
                    "https://bioconductor.org/packages/release/bioc/manuals/methylKit/man/methylKit.pdf"
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
            <TextField
              id="minProportionDifference"
              name="minProportionDifference"
              type="number"
              onChange={handleSlider}
              value={compState.minProportionDifference}
              InputProps={{ inputProps: { min: 1, max: 100 } }}
            />
            <FormHelperText>
              Difference of methylation levels. See{" "}
              <Link
                onClick={() =>
                  createBrowserWindow(
                    "https://bioconductor.org/packages/release/bioc/manuals/methylKit/man/methylKit.pdf"
                  )
                }
              >
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item sm={12}>
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
              Choose annotation file in gff/bed Format.
            </FormHelperText>
          </FormControl>

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
                id="genome"
                name="genome"
                label="Genome"
                accept=".fasta , .fa"
                onChange={handleFile}
                type="file"
                hidden
              />
            </Button>

            <FormHelperText>
              Choose genome used to make the alignments.
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Input
              onChange={handleCompState}
              id="species"
              name="species"
              label="Species"
              value={compState.species}
              placeholder="Species"
              required
              type="text"
            ></Input>
          </FormControl>
        </Grid>

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
              data.length > 0 ? "Remote Machine" : "add a remote machine first"
            }
          ></FormControlLabel>
        </Grid>

        {compState.remote === true ? (
          <Grid container>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel>Machine</InputLabel>
                <Select
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
                <Autocomplete
                  value={compState.remoteDir}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      console.log(newValue);
                      setCompState({
                        ...compState,
                        remoteDir: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setCompState({
                        ...compState,
                        remoteDir: newValue.inputValue,
                      });
                    } else {
                      setCompState({
                        ...compState,
                        remoteDir: newValue.homepath,
                      });
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        homepath: `Add "${params.inputValue}"`,
                      });
                    }
                    console.log(filtered);

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={[{ homepath: compState.machine.homepath }]}
                  getOptionLabel={(option) => {
                    console.log(compState);
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.homepath;
                  }}
                  renderOption={(option) => option.homepath}
                  style={{ width: 300 }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Remote Output Directory"
                      variant="outlined"
                    />
                  )}
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
                label="SLURM Cluster"
              ></FormControlLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    onChange={handleCheckBox}
                    color="secondary"
                    name="notification"
                    checked={compState.notification}
                  />
                }
                label="Send Email Notification"
              ></FormControlLabel>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} sm={4}>
            <FormControl className={classes.formControl}>
              <Typography gutterBottom>Cores</Typography>

              <TextField
                value={compState.cpu}
                type="number"
                labelId="cpu"
                InputProps={{ inputProps: { min: 0, max: 64 } }}
                id="cpu"
                name="cpu"
                onChange={handleCompState}
              ></TextField>
              <FormHelperText>
                Set the number of cores, 0 will use all available cores
              </FormHelperText>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
