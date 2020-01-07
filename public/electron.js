const { app, BrowserWindow, shell, ipcMain, Menu, remote } = require("electron");

const isDev =
  "ELECTRON_IS_DEV" in process.env
    ? parseInt(process.env.ELECTRON_IS_DEV, 10) === 1
    : !(app || remote.app).isPackaged;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: "#F7F7F7",
    minWidth: 880,
    show: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js"
    },
    height: 860,
    width: 1280
  });

  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${__dirname}/index.html`);

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("close", event => {
    if (app.quitting) mainWindow = null;
    else {
      event.preventDefault();
      mainWindow.hide();
    }
  });
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
  else mainWindow.show();
});

app.on("before-quit", () => (app.quitting = true));

ipcMain.on("load-page", (event, arg) => {
  mainWindow.loadURL(arg);
});
