/// <reference types="vite/client" />

import type { StaffStorageBridge } from "../electron/preload";

declare global {
  interface Window {
    staffStorage: StaffStorageBridge;
  }
}

export {};
