import React, { useState } from "react";
import classnames from "classnames";
import UnitForm from "../UnitForm/UnitForm";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { useConfig } from "../../hooks/useConfig";

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
  const { sampleState, setSampleState, blankSample } = useConfig();
  console.log(sampleState[0].units);
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
        const sampleId = `sample-${idx}`;
        return (
          <Grid key={sampleId} item xs={12} md={6}>
            <Box key={idx} boxShadow={3} m={1}>
              <FormControl className={classes.formControl}>
                <input
                  id={sampleId}
                  data-idx={idx}
                  label={`sample ${idx}`}
                  className="sample"
                  name={sampleId}
                  type="text"
                  placeholder="Sample Name"
                  value={val.sample}
                  required
                  onChange={handleSampleChange}
                  value={val.sample}
                  error={val.sample}
                />
              </FormControl>
              <UnitForm classes={classes} sample={val} sampleId={idx} />
            </Box>
          </Grid>
        );
      })}
      <Grid item xs={12} md={6}>
        <Fab variant="extended" onClick={addSample} color="primary">
          <AddIcon className={classes.extendedIcon} />
          Add New Sample
        </Fab>
      </Grid>
    </Grid>
  );
};

export default SampleForm;
