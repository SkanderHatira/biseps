import { v4 as uuidv4 } from "uuid";
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const os = require("os");
const path = require("path");
const fs = require("fs");
const { exec, execSync } = require("child_process");
const homedir = require("os").homedir();
const configPath = path.join(homedir, ".biseps/biseps.json");
const bisepsHidden = path.join(homedir, ".biseps");
const jsonContent = JSON.stringify(
  { database: "", port: "", conda: "" },
  null,
  2
);
const pipeline = path.join(homedir, ".biseps", "biseps");
require("dotenv").config({ path: path.join(__dirname, "backend", ".env") });

if (!fs.existsSync(pipeline)) {
  execSync(
    `git clone https://o2auth:${process.env.ACCESS_TOKEN}@forgemia.inra.fr/skander.hatira/biseps.git ${pipeline}`,
    (error, stdout, stderr) => {
      console.log(error);
    }
  );
} else {
  console.log("Pipeline is already installed");
}
if (!fs.existsSync(configPath)) {
  fs.mkdirSync(bisepsHidden, { recursive: true });
  fs.writeFileSync(configPath, jsonContent);
} else {
  console.log("Config file already exists, moving on ...");
}
const uid = uuidv4();
const mongod = require("./backend/spawnMongod.js");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const sock =
  process.platform == "win32"
    ? path.join("\\\\?\\pipe", `biseps${uid}`)
    : `/tmp/biseps${uid}.sock`;
const unixSocket =
  process.platform == "win32"
    ? "mongodb://localhost:27017"
    : path.join(homedir, ".biseps", "bisepsmongodb.sock");

const running = require("is-running");
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
const isDev = require("electron-is-dev");
const mongodLock = path.join(
  homedir,
  ".biseps",
  "database",
  "data",
  "db",
  "mongod.lock"
);

process.platform == "darwin" || process.platform == "linux"
  ? exec(
      `${
        process.platform == "win32"
          ? "(Get-command conda).path"
          : `command -v ${config.conda === "" ? "conda" : config.conda}`
      }`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return (global.sharedObj = {
            platform: process.platform,
            conda: false,
            prop1: sock,
          });
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);

          return (global.sharedObj = {
            platform: process.platform,
            conda: false,
            prop1: sock,
          });
        }

        console.log(`stdout: ${stdout}`);
        return (global.sharedObj = {
          platform: process.platform,
          conda: true,
          prop1: sock,
        });
      }
    )
  : (global.sharedObj = {
      platform: process.platform,
      conda: true,
      prop1: sock,
    });
// Install Mongodb if it's not
execSync(
  `${config.conda === "" ? "conda" : config.conda} env create -f ${path.join(
    __dirname,
    "resources",
    process.platform == "darwin"
      ? "mongodbMac.yaml"
      : process.platform == "win32"
      ? "mongoWindows.yaml"
      : "mongodbLinux.yaml"
  )} -n bisepsMongo ${
    process.platform == "win32" ? "; $? -or $true" : " || true "
  } `,
  { shell: process.platform == "win32" ? "powershell.exe" : "/bin/sh" },
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

// Install snakemake if it's not
execSync(
  `${config.conda === "" ? "conda" : config.conda} env create -f ${path.join(
    __dirname,
    "resources",
    process.platform == "darwin"
      ? "snakemakeMac.yaml"
      : process.platform == "win32"
      ? "snakemakeWindows.yaml"
      : "snakemakeLinux.yaml"
  )} -n bisepsSnakemake ${
    process.platform == "win32" ? "; $? -or $true" : " || true "
  }`,
  { shell: process.platform == "win32" ? "powershell.exe" : "/bin/sh" },
  { shell: true, stdio: "inherit" },
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
if (fs.existsSync(mongodLock)) {
  fs.stat(mongodLock, function (err, stats) {
    if (stats.size === 0) {
      mongod(unixSocket).then(
        (data) => {
          console.log("async result:\n" + data);
        },
        (err) => {
          console.error("async error:\n" + err);
        }
      );
    } else {
      fs.readFile(mongodLock, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        if (running(data)) {
          console.log(
            "database already running on bisepsmongodb.sock pid : " + data
          );
        } else {
          fs.unlinkSync(mongodLock);
          mongod(unixSocket).then(
            (data) => {
              console.log("async result:\n" + data);
            },
            (err) => {
              console.error("async error:\n" + err);
            }
          );
        }
      });
    }
  });
} else {
  mongod(unixSocket).then(
    (data) => {
      console.log("async result:\n" + data);
    },
    (err) => {
      console.error("async error:\n" + err);
    }
  );
}

const server = require("../src/backend/spawnServer.js");

// setTimeout(function () {
server(sock, unixSocket).then(
  (data) => {
    console.log("async result:\n" + data);
  },
  (err) => {
    console.error("async error:\n" + err);
  }
);
// }, 4000);
// const sock = "/tmp/bissprop.sock";

try {
  require("electron-reloader")(module);
} catch (_) {}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}
console.log(config);
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    // icon: __dirname + "/public/logo2.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: __dirname + "/preload.js",
      enableRemoteModule: true,
      devTools: true,
    },
  });
  ipcMain.on("ping-good", (event, message) => {
    fs.writeFileSync(configPath, JSON.stringify(message)); // Send reply to a renderer
    event.sender.send("ping-good-reply", "pong");
    console.log("App Successfully Terminated");
    app.quit();
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  const isMac = process.platform === "darwin";
  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }],
    },
    // { role: 'editMenu' }
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // { role: 'windowMenu' }
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal(
              "https://forgemia.inra.fr/skander.hatira/bisepsgui"
            );
          },
        },
        {
          label: "Parameters",
          click: async () => {
            mainWindow.webContents.send("ping-good-reply", "Parameters Menu");
          },
        },
      ],
    },
  ];

  // stringify JSON Object
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
    if (process.platform !== "win32") {
      fs.unlinkSync(sock);
    }
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
