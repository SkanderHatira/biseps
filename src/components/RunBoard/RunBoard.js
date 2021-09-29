import React, { useEffect } from "react";
import DashLayout from "../Tableau/DashLayout";

import RunForm from "../Stepper/RunForm";

const RunBoard = () => {
  return <DashLayout Filling={RunForm} />;
};

export default RunBoard;
