import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "genome", headerName: "Genome", width: 130 },
  { field: "outdir", headerName: "Output Directory", width: 130 },
  {
    field: "adapters",
    headerName: "Adapters",
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Table({ Copyright, classes, fixedHeightPaper }) {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/runs/run")
      .then((response) => setData(response.data));
  }, []);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Grid>
    </Container>
  );
}
