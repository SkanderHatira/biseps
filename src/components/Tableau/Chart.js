import React from "react";
import dummy from "../../dummy/multiqc_data";
import { useTheme } from "@material-ui/core/styles";
import { JsonToTable } from "react-json-to-table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
const str = JSON.stringify(dummy);

console.log(str);
const data = JSON.parse(str);
for (let con in data) {
  console.log(con);
}
console.log(data);
// Generate Sales Data

export default function Chart() {
  const theme = useTheme();

  return <></>;
}
