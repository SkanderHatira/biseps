import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
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
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

import Link from "@material-ui/core/Link";

import { Input } from "@material-ui/core";
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
export default function AddressForm() {
  const initialState = {
    sampleFile: "",
    unitsFile: "",
    outdir: "",
    genome: "",
    adapters: "",
    subsample: true,
    trimming: true,
    quality: true,
    genome_preparation: true,
    methylation_extraction_bismark: true,
    methylation_calling: true,
  };
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const [runState, setRunState] = useState(initialState);
  const handleRunFiles = (e) =>
    setRunState({
      ...runState,
      [e.target.name]: [e.target.files.webkitRelativePath],
    });
  const handleRunState = (e) => {
    setRunState({
      ...runState,
      [e.target.name]: [e.target.value],
    });
  };

  const handleRunSubmit = () => {
    axios
      .get("http://localhost:5000/api/runs/run")
      .then((res) => history.push("/dashboard"))
      .catch((err) => {
        console.log("failed get request");
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
            <InputLabel id="aligner">Aligner</InputLabel>
            <Select
              defaultValue={10}
              labelId="aligner"
              id="aligner"
              onChange={handleRunState}
            >
              <MenuItem value={10}>Bowtie2</MenuItem>
              <MenuItem value={20}>Hisat2</MenuItem>
            </Select>
            <FormHelperText>Choose aligner. Default: bowtie2</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="adapters">Adapters</InputLabel>
            <Select
              defaultValue={1}
              labelId="adapters"
              id="adapters"
              onChange={handleRunState}
            >
              <MenuItem value={1}>TruSeq2-SE</MenuItem>
              <MenuItem value={2}>TruSeq2-PE</MenuItem>
              <MenuItem value={3}>TruSeq3-SE</MenuItem>
              <MenuItem value={4}>TruSeq3-PEE</MenuItem>
              <input
                accept=".fq.gz"
                className={classes.input}
                style={{ display: "none" }}
                id="custom-adapters"
                multiple
                type="file"
              />
              <label htmlFor="custom-adapters">
                <MenuItem value={5}>Upload</MenuItem>
              </label>
            </Select>
            <FormHelperText>Choose adapters.</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="genome">Genome</InputLabel>
            <TextField
              type="file"
              hidden
              required
              id="genome"
              name="genome"
              label="Genome"
              inputProps={{
                accept: ".fasta , .fa , .fq , .fq.gz",
              }}
              fullWidth
              autoComplete="family-name"
            />
            <FormHelperText>Choose genome in .fasta Format</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography id="minlen" gutterBottom>
              Minlen{" "}
            </Typography>
            <Slider
              defaultValue={80}
              aria-labelledby="minlen"
              step={10}
              min={30}
              max={100}
              valueLabelDisplay="auto"
            />{" "}
            <FormHelperText>Choose minimal read length.</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography id="minscore" gutterBottom>
              Min-Score{" "}
            </Typography>
            <Slider
              defaultValue={-0.6}
              aria-labelledby="minscore"
              step={-0.1}
              min={-1}
              max={-0.2}
              valueLabelDisplay="auto"
            />{" "}
            <FormHelperText>
              Choose minimal alignement quality score. See{" "}
              <Link href="http://www.bioinformatics.babraham.ac.uk/projects/bismark/Bismark_User_Guide_v0.7.12.pdf">
                docs
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <Typography id="L" gutterBottom>
              L{" "}
            </Typography>
            <Slider
              defaultValue={20}
              aria-labelledby="L"
              step={1}
              min={20}
              max={32}
              valueLabelDisplay="auto"
            />{" "}
            <FormHelperText>
              Choose k-mer length for alignment. Higher : Slower.
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="subsample" />}
            label="Toggle this option to execute a minimal run"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
