import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";

const UnitForm = ({ classes }) => {
  const blankUnit = { r1: "", r2: "" };
  const [unitState, setUnitState] = useState([{ ...blankUnit }]);

  const addUnit = () => {
    setUnitState([...unitState, { ...blankUnit }]);
  };
  const handleUnitChange = (e) => {
    const updatedUnits = [...unitState];
    updatedUnits[e.target.dataset.idx][e.target.name] = e.target.files;
    setUnitState(updatedUnits);
  };
  return (
    <Grid item xs={12}>
      <Box m={1}>
        <Fab
          size="small"
          onClick={addUnit}
          value="Add Unit Pair"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>{" "}
      </Box>
      {unitState.map((val, idx) => {
        const r1Id = `read1-${idx}`;
        const r2Id = `read2-${idx}`;
        return (
          <Box boxShadow={3} m={1}>
            <Grid key={`unit-${idx}`} container>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <input
                    type="file"
                    id={r1Id}
                    name="r1"
                    data-idx={idx}
                    multiple
                    onChange={handleUnitChange}
                  />
                  <FormHelperText>Insert Forward Read(s)</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <input
                    type="file"
                    id={r2Id}
                    name="r2"
                    data-idx={idx}
                    multiple
                    onChange={handleUnitChange}
                  />
                  <FormHelperText>Insert Reverse Read(s)</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Grid>
  );
};

export default UnitForm;
