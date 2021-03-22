import { v4 as uuidv4 } from "uuid";
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const server = require("../src/backend/spawnServer.js");

// const mongod = require("./backend/spawnMongod.js");
// try {
//   mongod();
// } catch (err) {
//   console.log(err);
// }

const uid = uuidv4();
const sock = "/tmp/bissprop.sock";

// const sock = `/tmp/bissprop${uid}.sock`;
server(sock);
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

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
      enableRemoteModule: true,
    },
  });
  mainWindow.webContents.on("did-finish-load", () =>
    mainWindow.webContents.send("ping", sock)
  );
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  const ses = mainWindow.webContents.session;
  console.log(ses.getUserAgent());
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log("An error occurred: ", err));
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
