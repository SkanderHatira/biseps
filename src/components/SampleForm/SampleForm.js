import React, { useState } from "react";
import classnames from "classnames";
import UnitForm from "../UnitForm/UnitForm";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const SampleForm = () => {
  const classes = useStyles();

  const blankSample = { sample: " " };
  const [sampleState, setSampleState] = useState([{ ...blankSample }]);

  const addSample = () => {
    setSampleState([...sampleState, { ...blankSample }]);
  };
  const handleSampleChange = (e) => {
    const updatedSamples = [...sampleState];
    updatedSamples[e.target.dataset.idx][e.target.className] = e.target.value;
    setSampleState(updatedSamples);
  };
  return (
    <Grid container spacing={3}>
      {sampleState.map((val, idx) => {
        const sampleId = `sample${idx}`;
        return (
          <div key={`sample-${idx}`}>
            <Grid item xs={12} gutterBottom>
              <FormControl className={classes.formControl}>
                <TextField
                  id={sampleId}
                  data-idx={idx}
                  label={`sample-${idx + 1}`}
                  className={classnames("", {
                    invalid: sampleState.sample,
                  })}
                  name={sampleId}
                  type="text"
                  required
                  onChange={handleSampleChange}
                  value={sampleState.sample}
                  error={sampleState.sample}
                />
              </FormControl>
            </Grid>
            <UnitForm classes={classes} />
          </div>
        );
      })}
      <Fab
        size="small"
        onClick={addSample}
        value="Add New Sample"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Grid>
  );
};

export default SampleForm;
