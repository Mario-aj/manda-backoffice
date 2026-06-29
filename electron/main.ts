import { app, BrowserWindow, ipcMain, safeStorage } from "electron";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function tokenPath(): string {
  return join(app.getPath("userData"), "staff-tokens.json");
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.on("ready-to-show", () => win.show());

  if (process.env.ELECTRON_RENDERER_URL) {
    void win.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    void win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

function encrypt(value: string): string {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("safeStorage indisponível neste sistema");
  }
  return safeStorage.encryptString(value).toString("base64");
}

function decrypt(encoded: string): string {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("safeStorage indisponível neste sistema");
  }
  return safeStorage.decryptString(Buffer.from(encoded, "base64"));
}

ipcMain.handle(
  "staffStorage:load",
  (): { accessToken: string; refreshToken: string } | null => {
    try {
      const path = tokenPath();
      if (!existsSync(path)) return null;
      const raw = JSON.parse(readFileSync(path, "utf8")) as {
        access?: string;
        refresh?: string;
      };
      if (!raw.access || !raw.refresh) return null;
      return {
        accessToken: decrypt(raw.access),
        refreshToken: decrypt(raw.refresh),
      };
    } catch {
      return null;
    }
  }
);

ipcMain.handle(
  "staffStorage:save",
  (_event, tokens: { accessToken: string; refreshToken: string }): void => {
    const payload = {
      access: encrypt(tokens.accessToken),
      refresh: encrypt(tokens.refreshToken),
    };
    writeFileSync(tokenPath(), JSON.stringify(payload), { mode: 0o600 });
  }
);

ipcMain.handle("staffStorage:clear", (): void => {
  const path = tokenPath();
  if (existsSync(path)) unlinkSync(path);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
