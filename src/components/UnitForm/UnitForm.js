import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import { useConfig } from "../../hooks/useConfig";

const UnitForm = ({ classes, sample, sampleId }) => {
  const blankUnit = { r1: "", r2: "" };
  const { sampleState, setSampleState } = useConfig();

  const addUnit = (e) => {
    const updatedUnits = [...sampleState];
    updatedUnits[sampleId].units = [
      ...updatedUnits[sampleId].units,
      { ...blankUnit },
    ];
    setSampleState(updatedUnits);
  };
  const handleUnitChange = (e) => {
    const updatedUnits = [...sampleState];
    let paths = [];
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      paths = [...paths, files[i].path];
    }
    console.log(paths);
    updatedUnits[sampleId].units[e.target.dataset.idx][e.target.name] = paths;
    setSampleState(updatedUnits);
  };
  return (
    <Grid item xs={12}>
      <Box m={1}>
        <Fab variant="extended" onClick={addUnit} color="primary">
          <AddIcon />
          Add Biorep
        </Fab>
      </Box>

      {sample.units.map((val, idx) => {
        const r1Id = `read1-${idx}`;
        const r2Id = `read2-${idx}`;
        return (
          <div key={idx}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <Button
                    variant="contained"
                    component="label"
                    color={sample.units[idx].r1 === "" ? "" : "primary"}
                  >
                    {sample.units[idx].r1 === ""
                      ? "upload Forward Read(s)"
                      : "Files Added"}
                    <input
                      type="file"
                      id={r1Id}
                      name="r1"
                      data-idx={idx}
                      multiple
                      onChange={handleUnitChange}
                      required
                      accept=".fastq , .fq , .fastq.gz , .fq.gz"
                      hidden
                    />
                  </Button>
                  <FormHelperText>Accepts fq | fq.gz</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <Button
                    variant="contained"
                    component="label"
                    color={sample.units[idx].r2 === "" ? "" : "primary"}
                  >
                    {sample.units[idx].r2 === ""
                      ? "upload Forward Read(s)"
                      : "Files Added"}
                    <input
                      type="file"
                      id={r2Id}
                      name="r2"
                      data-idx={idx}
                      multiple
                      onChange={handleUnitChange}
                      accept=".fastq , .fq , .fastq.gz , .fq.gz"
                      hidden
                    />
                  </Button>

                  <FormHelperText>Accepts fq | fq.gz</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </Grid>
  );
};

export default UnitForm;
