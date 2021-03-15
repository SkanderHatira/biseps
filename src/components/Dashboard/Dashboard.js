import React, { useEffect } from "react";
import DashLayout from "../Tableau/DashLayout";
import Table from "../Table/Table";

// import Default from "../Tableau/Default";

const Dashboard = () => {
  return <DashLayout Filling={Table} />;
};

export default Dashboard;
