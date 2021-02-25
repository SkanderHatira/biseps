import React, { useEffect } from "react";
import DashLayout from "../Tableau/DashLayout";

import Checkout from "../Stepper/Checkout";

const RunBoard = () => {
  return <DashLayout Filling={Checkout} />;
};

export default RunBoard;
