const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "build", "index.html"));

  // Open DevTools for debugging
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});
