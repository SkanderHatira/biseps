import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const ipcRenderer = require("electron").ipcRenderer;

function render() {
  ipcRenderer.on("store-data", function (event, store) {
    console.log(store);
  });
  ReactDOM.render(
    <React.Fragment>
      <App />
    </React.Fragment>,
    document.getElementById("root")
  );
}
render();
