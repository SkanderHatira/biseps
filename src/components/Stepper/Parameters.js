import React from "react";
import Typography from "@material-ui/core/Typography";
import SampleForm from "../SampleForm/SampleForm";

export default function Parameters() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Experimental design{" "}
      </Typography>
      <SampleForm />
    </React.Fragment>
  );
}
