import React, { useState } from "react";
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
  const { runState, setRunState } = useConfig();

  const classes = useStyles();
  const handleGenome = (e) => {
    setRunState({
      ...runState,
      [e.target.id]: document.getElementById(e.target.id).files[0].path,
      outdir:
        document
          .getElementById(e.target.id)
          .files[0].path.match(/(.*)[\/\\]/)[0] || "",
    });
  };

  const handleRunState = (e) => {
    setRunState({
      ...runState,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckBox = (e) => {
    setRunState({
      ...runState,
      [e.target.name]: String(e.target.checked),
    });
  };
  const handleSlider = (e, newValue) => {
    console.log(e.target);
    setRunState({
      ...runState,
      [e.target.id]: newValue,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Execution Parameters{" "}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>CPUs</InputLabel>
            <Select
              defaultValue="All"
              labelId="CPU"
              id="CPU"
              name="CPU"
              onChange={handleRunState}
            >
              <MenuItem value="bowtie2">Bowtie2</MenuItem>
              <MenuItem value="hisat2">Hisat2</MenuItem>
            </Select>
            <FormHelperText>
              Specify CPUs available. Default: All
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Adapters</InputLabel>
            <Select
              value={runState.adapters}
              labelId="adapters"
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
            <FormHelperText>Choose adapters</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              component="label"
              color={runState.genome === "" ? "" : "primary"}
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
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckBox}
                color="secondary"
                name="subsample"
              />
            }
            label="Toggle this option to run in cluster mode"
          ></FormControlLabel>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}