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
import Slider from "@material-ui/core/Slider";
import { useConfig } from "../../hooks/useConfig";
import Link from "@material-ui/core/Link";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useAuth } from "../../hooks/useAuth";

const filter = createFilterOptions();

const http = require("http");

const path = require("path");
const styles = {
  hidden: {
    display: "none",
  },
  importLabel: {
    color: "black",
  },
};
console.log(__dirname);
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
  const { runState, setRunState } = useConfig();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const { user } = useAuth();

  const classes = useStyles();
  const handleGenome = (e) => {
    setRunState({
      ...runState,
      [e.target.id]: document.getElementById(e.target.id).files[0].path,
    });
  };
  const handleCustomAdapters = (e) => {
    setRunState({
      ...runState,
      [e.target.id]: document.getElementById(e.target.id).files[0].path,
    });
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
  const handleRunState = (e) => {
    setRunState({
      ...runState,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckBox = (e) => {
    setRunState({
      ...runState,
      [e.target.name]: e.target.checked,
    });
  };
  const handleSlider = (e, newValue) => {
    setRunState({
      ...runState,
      [e.target.id]: newValue,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        General configuration
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Aligner</InputLabel>
            <Select
              value={runState.aligner}
              labelId="aligner"
              id="aligner"
              name="aligner"
              onChange={handleRunState}
            >
              <MenuItem value="bowtie2">Bowtie2</MenuItem>
              <MenuItem value="hisat2">Hisat2</MenuItem>
            </Select>
            <FormHelperText>Choose aligner. Default: bowtie2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Adapters</InputLabel>
            <Select
              value={runState.adapters}
              labelId="adapters"
              disabled={runState.customAdapters != "" ? true : false}
              id="adapters"
              name="adapters"
              onChange={handleRunState}
            >
              <MenuItem value="TruSeq2-SE">TruSeq2-SE</MenuItem>
              <MenuItem value="TruSeq2-PE">TruSeq2-PE</MenuItem>
              <MenuItem value="TruSeq3-SE">TruSeq3-SE</MenuItem>
              <MenuItem value="TruSeq3-PE">TruSeq3-PE</MenuItem>

              {/* <input
                accept=".fa"
                className={classes.input}
                style={{ display: "none" }}
                id="adapters"
                multiple
                onChange={handleRunFiles}
                type="file"
              />
              <label htmlFor="adapters">
                <MenuItem value="Upload">Upload</MenuItem>
              </label> */}
            </Select>
            <Button
              variant="contained"
              component="label"
              color={runState.customAdapters === "" ? "default" : "primary"}
            >
              {runState.customAdapters === ""
                ? "custom adapters"
                : runState.customAdapters.split(/[\\/]/).pop()}{" "}
              <input
                type="file"
                required
                id="customAdapters"
                name="customAdapters"
                label="customAdapters"
                accept=".fasta , .fa , .fa.gz"
                onChange={handleGenome}
                hidden
              />
            </Button>
            <FormHelperText>Choose adapters</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              component="label"
              color={runState.genome === "" ? "default" : "primary"}
            >
              {runState.genome === ""
                ? "upload genome"
                : runState.genome.split(/[\\/]/).pop()}
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
              value={runState.n}
              labelId="n"
              id="n"
              name="n"
              onChange={handleRunState}
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
              value={runState.minlen}
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
              value={runState.minscore}
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
              value={runState.l}
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

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Execution Parameters{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                onChange={handleCheckBox}
                color="secondary"
                name="remote"
                disabled={data.length > 0 ? false : true}
                checked={runState.remote}
              />
            }
            label={
              data.length > 0 ? "Remote Machine" : "add a remote machine first"
            }
          ></FormControlLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                onChange={handleCheckBox}
                color="secondary"
                name="subsample"
                checked={runState.subsample}
              />
            }
            label="Minimal Run"
          ></FormControlLabel>
        </Grid>

        {runState.remote === true ? (
          <Grid container>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel>Machine</InputLabel>
                <Select
                  value={runState.machine}
                  labelId="machine"
                  id="machine"
                  name="machine"
                  onChange={handleRunState}
                  renderValue={(machine) => machine.hostname}
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
                  disabled={runState.machine.hostname === "" ? true : false}
                  value={runState.remoteDir}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setRunState({
                        ...runState,
                        remoteDir: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setRunState({
                        ...runState,
                        remoteDir: newValue.inputValue,
                      });
                    } else {
                      setRunState({
                        ...runState,
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
                  options={[{ homepath: runState.machine.homepath }]}
                  getOptionLabel={(option) => {
                    console.log(runState);
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
                    checked={runState.cluster}
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
                    checked={runState.notification}
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
                value={runState.cpu}
                type="number"
                labelId="cpu"
                id="cpu"
                name="cpu"
                onChange={handleRunState}
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
