import { contextBridge, ipcRenderer } from "electron";

export type StaffStorageTokens = {
  accessToken: string;
  refreshToken: string;
};

const staffStorage = {
  load: (): Promise<StaffStorageTokens | null> =>
    ipcRenderer.invoke("staffStorage:load"),
  save: (tokens: StaffStorageTokens): Promise<void> =>
    ipcRenderer.invoke("staffStorage:save", tokens),
  clear: (): Promise<void> => ipcRenderer.invoke("staffStorage:clear"),
};

contextBridge.exposeInMainWorld("staffStorage", staffStorage);

export type StaffStorageBridge = typeof staffStorage;
