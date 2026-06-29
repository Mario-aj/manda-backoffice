"use strict";
const electron = require("electron");
const staffStorage = {
  load: () => electron.ipcRenderer.invoke("staffStorage:load"),
  save: (tokens) => electron.ipcRenderer.invoke("staffStorage:save", tokens),
  clear: () => electron.ipcRenderer.invoke("staffStorage:clear")
};
electron.contextBridge.exposeInMainWorld("staffStorage", staffStorage);
