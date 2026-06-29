"use strict";
const electron = require("electron");
const node_fs = require("node:fs");
const node_path = require("node:path");
function tokenPath() {
  return node_path.join(electron.app.getPath("userData"), "staff-tokens.json");
}
function createWindow() {
  const win = new electron.BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: node_path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.on("ready-to-show", () => win.show());
  if (process.env.ELECTRON_RENDERER_URL) {
    void win.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    void win.loadFile(node_path.join(__dirname, "../renderer/index.html"));
  }
}
function encrypt(value) {
  if (!electron.safeStorage.isEncryptionAvailable()) {
    throw new Error("safeStorage indisponível neste sistema");
  }
  return electron.safeStorage.encryptString(value).toString("base64");
}
function decrypt(encoded) {
  if (!electron.safeStorage.isEncryptionAvailable()) {
    throw new Error("safeStorage indisponível neste sistema");
  }
  return electron.safeStorage.decryptString(Buffer.from(encoded, "base64"));
}
electron.ipcMain.handle(
  "staffStorage:load",
  () => {
    try {
      const path = tokenPath();
      if (!node_fs.existsSync(path)) return null;
      const raw = JSON.parse(node_fs.readFileSync(path, "utf8"));
      if (!raw.access || !raw.refresh) return null;
      return {
        accessToken: decrypt(raw.access),
        refreshToken: decrypt(raw.refresh)
      };
    } catch {
      return null;
    }
  }
);
electron.ipcMain.handle(
  "staffStorage:save",
  (_event, tokens) => {
    const payload = {
      access: encrypt(tokens.accessToken),
      refresh: encrypt(tokens.refreshToken)
    };
    node_fs.writeFileSync(tokenPath(), JSON.stringify(payload), { mode: 384 });
  }
);
electron.ipcMain.handle("staffStorage:clear", () => {
  const path = tokenPath();
  if (node_fs.existsSync(path)) node_fs.unlinkSync(path);
});
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
