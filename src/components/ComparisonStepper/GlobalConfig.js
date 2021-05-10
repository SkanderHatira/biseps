import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
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

  const classes = useStyles();
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

  const handleRunState = (e) => {
    setCompState({
      ...compState,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckBox = (e) => {
    setCompState({
      ...compState,
      [e.target.name]: String(e.target.checked),
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
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Method</InputLabel>
            <Select
              defaultValue="bins"
              value={compState.method}
              labelId="method"
              id="method"
              name="method"
              onChange={handleRunState}
            >
              <MenuItem value="bins">Bins</MenuItem>
              <MenuItem value="neighbourhood">Neighbourhood</MenuItem>{" "}
              {compState.test != "betareg" ? (
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
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Statistical Test</InputLabel>
            <Select
              defaultValue="score"
              value={compState.test}
              labelId="test"
              id="test"
              name="test"
              onChange={handleRunState}
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
                <Link href="https://bioconductor.org/packages/release/bioc/html/DMRcaller.html">
                  docs
                </Link>
                .
              </FormHelperText>
            </FormControl>
          </Grid>
        )}
        {compState.test != "betareg" ? (
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
                  onChange={handleSlider}
                  value={compState.pseudocountM}
                  step={1}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
                <FormHelperText>
                  Numerical Value to be added to methylated reads before beta
                  regression. See{" "}
                  <Link href="https://bioconductor.org/packages/release/bioc/html/DMRcaller.html">
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
                  onChange={handleSlider}
                  value={compState.pseudocountN}
                  step={1}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
                <FormHelperText>
                  Numerical Value to be added to total reads before beta
                  regression. See{" "}
                  <Link href="https://bioconductor.org/packages/release/bioc/html/DMRcaller.html">
                    docs
                  </Link>
                  .
                </FormHelperText>
              </FormControl>
            </Grid>
          </>
        )}
        {/* <Grid item xs={12} sm={6}>
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
            label="Toggle this option to execute a minimal run"
          ></FormControlLabel>
        </Grid> */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Execution Parameters{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                onChange={handleCheckBox}
                color="secondary"
                name="cluster"
              />
            }
            label="Toggle this option to execute in SLURM Cluster mode"
          ></FormControlLabel>
        </Grid>
        {compState.cluster === "true" ? (
          <Grid item xs={12} xm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel>Memory</InputLabel>
              <Select
                defaultValue="10G"
                labelId="memMb"
                id="memMb"
                name="memMb"
                onChange={handleRunState}
              >
                <MenuItem value="10G">10G</MenuItem>
                <MenuItem value="50G">50G</MenuItem>
                <MenuItem value="150G">150G</MenuItem>
                <MenuItem value="300G">300G</MenuItem>
              </Select>
              <FormHelperText>
                Specify Memory available. Default: All
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Jobs</InputLabel>
              <Select
                defaultValue="5"
                labelId="jobs"
                id="jobs"
                name="jobs"
                onChange={handleRunState}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="25">25</MenuItem>
              </Select>
              <FormHelperText>
                Specify Maximum number of Parallel Jobs. Default: 5
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>MaxTime</InputLabel>
              <Select
                defaultValue="1440"
                labelId="minTime"
                id="minTime"
                name="minTime"
                onChange={handleRunState}
              >
                <MenuItem value="240">240</MenuItem>
                <MenuItem value="1440">1440</MenuItem>
                <MenuItem value="2880">2880</MenuItem>
              </Select>
              <FormHelperText>
                Specify Maximum Time before a job is terminated. Default: 1 day
              </FormHelperText>
            </FormControl>
          </Grid>
        ) : (
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel>CPUs</InputLabel>
              <Select
                defaultValue="All"
                labelId="cpu"
                id="cpu"
                name="cpu"
                onChange={handleRunState}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="8">8</MenuItem>
              </Select>
              <FormHelperText>
                Specify CPUs available. Default: All
              </FormHelperText>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
