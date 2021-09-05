import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
const electron = window.require("electron");
const remote = electron.remote;
sessionStorage.setItem("Sock", remote.getGlobal("sharedObj").prop1);
sessionStorage.setItem("Conda", remote.getGlobal("sharedObj").conda);
console.log(sessionStorage);
function render() {
  ReactDOM.render(
    <React.Fragment>
      <App />
    </React.Fragment>,
    document.getElementById("root")
  );
}
render();
