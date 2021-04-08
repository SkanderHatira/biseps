import { v4 as uuidv4 } from "uuid";
const {
  app,
  BrowserWindow,
  ipcMain,
  session,
  ipcRenderer,
} = require("electron");
const path = require("path");
const fs = require("fs");
const mongodLock = path.join(
  __dirname,
  "resources/database/data/db/mongod.lock"
);

fs.stat(mongodLock, function (err, stats) {
  console.log(!err);

  if (stats.size === 0) {
    mongod();
  } else {
    console.log("database already running on /tmp/bisspropmongodb.sock");
  }
});
const server = require("../src/backend/spawnServer.js");
const uid = uuidv4();
const sock = `/tmp/bissprop${uid}.sock`;

const mongod = require("./backend/spawnMongod.js");

setTimeout(function () {
  server(sock);
}, 4000);
// const sock = "/tmp/bissprop.sock";

global.sharedObj = { prop1: sock };

import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
const isDev = require("electron-is-dev");
const { exec } = require("child_process");
try {
  require("electron-reloader")(module);
} catch (_) {}
exec(
  "bash " + path.join(__dirname, "resources/checkConda.sh") + " " + __dirname,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);
async function createJB(port) {
  // Create the browser window.
  // const newWindow = new BrowserWindow({
  //   width: 1080,
  //   height: 720,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     enableRemoteModule: true,
  //     webSecurity: false,
  //   },
  // });
  // Load app
  // newWindow.webContents.loadURL(SECOND_WINDOW_WEBPACK_ENTRY);
  // rest of code..
}
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}
// ipcMain.on("ping", (event, port) => {
//   // console.log(port);
//   // createJB(port);
//   const newWindow = new BrowserWindow({
//     width: 1080,
//     height: 720,
//     webPreferences: {
//       preload: __dirname + "/preloadJB.js",
//       nodeIntegration: false,
//       nativeWindowOpen: true,
//       nodeIntegrationInSubFrames: true,
//       webSecurity: false,
//     },
//   });
//   const dirname = "/home/Bureau/jbrowse2";
//   // const url = require("url").format({
//   //   protocol: "file",
//   //   slashes: true,
//   //   pathname: path.join(dirname, "worker.html"),
//   // });
//   // newWindow.loadURL(url);

//   newWindow.loadURL(`http:///localhost:${port}`);
//   newWindow.once("ready-to-show", () => {
//     newWindow.show();
//   });
// });
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
      enableRemoteModule: true,
      devTools: true,
    },
  });

  // mainWindow.webContents.on("did-finish-load", () => {
  //   console.log("this is where the ping is happening");
  //   mainWindow.webContents.send("ping", sock);
  // });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    fs.unlinkSync(sock);
    console.log("App Successfully Terminated");
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
