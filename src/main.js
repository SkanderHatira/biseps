const { app, BrowserWindow } = require("electron");
const path = require("path");
const server = require("../src/backend/spawnServer.js");
server();
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
require("dotenv").config();
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

// const mongod = () => {
//   require(path.join(__dirname, "src/backend/spawnMongod"));
// };
// mongod();

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
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  console.log(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.send("store-data", { sock: "test" });

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  // server();
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
