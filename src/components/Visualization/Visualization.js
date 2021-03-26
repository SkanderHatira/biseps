import React, { useEffect } from "react";
import DashLayout from "../Tableau/DashLayout";
import VisualizationFill from "./VisualizationFill";
const Dashboard = () => {
  return <DashLayout Filling={VisualizationFill} />;
};

export default Dashboard;
