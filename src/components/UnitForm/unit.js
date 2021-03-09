import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import { useConfig } from "../../hooks/useConfig";

const UnitForm = ({ classes }) => {
  const { unitState, setUnitState, blankUnit } = useConfig();

  const addUnit = () => {
    setUnitState([...unitState, { ...blankUnit }]);
  };
  const handleUnitChange = (e, idx) => {
    console.log(e.target.files);
    const updatedUnits = [...unitState];
    updatedUnits[e.target.dataset.idx][e.target.name] = e.target.files;
    setUnitState(updatedUnits);
  };
  return (
    <Grid item xs={12}>
      <Box m={1}>
        <Fab variant="extended" onClick={addUnit} color="primary">
          <AddIcon />
          Add Biorep
        </Fab>
      </Box>

      {unitState.map((val, idx) => {
        const r1Id = `read1-${idx}`;
        const r2Id = `read2-${idx}`;
        return (
          <div key={`unit-${idx}`}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <Button
                    variant="contained"
                    component="label"
                    color={unitState[idx].r1 === "" ? "" : "primary"}
                  >
                    {unitState[idx].r1 === ""
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
                    color={unitState[idx].r2 === "" ? "" : "primary"}
                  >
                    {unitState[idx].r2 === ""
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
