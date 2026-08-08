# Manda Backoffice

Desktop Electron app for Manda **staff and operations** — KYC review, transaction monitoring, and related internal workflows. This repo is separate from the end-user mobile client (`manda-app/`) and talks to the `manda` backend over the **staff auth** API (`/staff/auth/*`).

**Current phase:** staff login, secure session storage, token refresh, authenticated shell (sidebar + home), transaction monitoring (list + detail + ops actions) and **realtime transaction updates via SSE** ([`Realtime (SSE)`](#realtime-sse) below). KYC screens are planned for later phases.

---

## Stack

| Layer   | Choice                                                    |
| ------- | --------------------------------------------------------- |
| Shell   | Electron 39 + [electron-vite](https://electron-vite.org/) |
| UI      | React 19, TypeScript (strict), React Router v7            |
| Data    | TanStack Query v5, Axios                                  |
| Styling | CSS modules + design tokens in `src/app/global.css`       |
| Tests   | Vitest                                                    |

Staff JWTs are stored in the OS keychain via Electron `safeStorage` (main process + preload IPC). The renderer never reads token files directly.

---

## Prerequisites

- **Node.js** 20+ and **npm**
- **manda** backend running locally ([`../manda/`](../manda/)) — Postgres, Redis, and the `api` service
- A seeded staff account (see below)

Backend must have `STAFF_JWT_SECRET` set (32+ characters, **distinct** from `JWT_SECRET`) in `manda/.env`. Dev CORS should include the Vite origin:

```env
CORS_ORIGINS=http://localhost:5173,http://localhost:8081
```

---

## Local development

### 1. Start the backend

```bash
cd ../manda
docker compose up postgres redis api
```

If `staff:seed` or the API fails with missing env vars, ensure `manda/.env` includes staff and S3 settings (see `manda/.env.example`). Host-side scripts also merge `manda/services/api/.env` for `POSTGRES_HOST=localhost`.

### 2. Seed the first staff user (once)

```bash
cd ../manda
STAFF_SEED_EMAIL=admin@manda.ao \
STAFF_SEED_PASSWORD='your-secure-password' \
pnpm --filter api staff:seed
```

There is no staff self-registration endpoint — all staff accounts are provisioned this way or via future admin tooling.

### 3. Configure and run the backoffice

```bash
cd backoffice
cp .env.example .env
npm install
npm run dev
```

The app opens the login screen. After signing in, you land on the home shell with staff name and role. Sessions persist across restarts via encrypted local storage.

---

## Environment variables

| Variable       | Description                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | API base URL. Dev: `http://localhost:3000`. Production must be `https://` (enforced at boot). |

Copy from `.env.example`:

```bash
cp .env.example .env
```

---

## Scripts

| Command           | Description                                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`     | Start Vite dev server + Electron (HMR). Uses `--noSandbox` on Linux when the Chrome setuid sandbox is not configured. |
| `npm run build`   | Production build → `out/main`, `out/preload`, `out/renderer`                                                          |
| `npm run preview` | Run the production build locally                                                                                      |
| `npm test`        | Vitest unit tests                                                                                                     |
| `npm run lint`    | ESLint on `src/`                                                                                                      |

---

## Project layout

Feature-based structure — domain code lives under `src/features/`, shared primitives under `src/shared/`, wiring under `src/app/`.

```
backoffice/
├── electron/           # Main process + preload (safeStorage IPC)
├── src/
│   ├── app/            # App, router, query client, global CSS tokens
│   ├── shared/         # UI atoms, axios client, ApiError
│   └── features/
│       ├── auth/       # Login, guards, AuthProvider, staff API
│       └── shell/      # Sidebar, topbar, home page
├── tmp/manda/          # Design prototypes (reference only)
└── .agents/rules/      # Agent architecture + conventions
```

**Conventions**

- Import with `@/` → `src/`
- New domains → `features/<name>/` with the same internal layout as `auth/` and `shell/`
- Cross-feature imports use public barrels (e.g. `features/auth/index.ts`), not deep internal paths
- Prefer CSS modules over inline styles; use `--manda-*` variables from `global.css`

Deeper architecture notes: [`.agents/rules/architecture.md`](.agents/rules/architecture.md). Workspace-wide security and TDD rules: [`../AGENTS.md`](../AGENTS.md).

---

## Staff API (quick reference)

| Action        | Method | Path                  |
| ------------- | ------ | --------------------- |
| Login         | `POST` | `/staff/auth/login`   |
| Current staff | `GET`  | `/staff/auth/me`      |
| Refresh       | `POST` | `/staff/auth/refresh` |
| Logout        | `POST` | `/staff/auth/logout`  |

The axios client in `src/shared/api/client.ts` attaches the staff bearer token, performs single-flight refresh on 401, and clears storage when refresh fails. End-user mobile JWTs are rejected on staff routes (separate signing secret).

---

## Realtime (SSE)

The backoffice receives transaction status changes in realtime over **Server-Sent Events** — no polling, no WebSocket.

**Decision rationale** (vs. alternatives):

- **Polling** — rejected: N requests per backoffice client; the staff list is small but polling is still wasteful and latency-prone.
- **WebSocket** — rejected: the backoffice only _receives_; a full duplex, stateful connection (with ws-gateway involvement) is heavier than the problem needs.
- **SSE** — chosen: unidirectional push over plain HTTP, auto-reconnect, one connection per backoffice client.

**How it works:**

- `GET /staff/transactions/events` on the `api` service streams `transaction.updated` events:

  ```json
  {
    "id": "<uuid>",
    "refCode": "MND-0001",
    "status": "proposta",
    "updatedAt": "2026-08-01T12:00:00.000Z"
  }
  ```

- The stream is fed by an **in-process `EventEmitter` in the `api` service** (`TransactionEventsService`, emitted from `TransactionsService.publish()`). Every transaction mutation already flows through `api`, so no Redis and no ws-gateway involvement. If `api` ever scales to 2+ instances, move the emitter to Redis pub/sub (same `transaction.updated` channel) — see [`../AGENTS.md`](../AGENTS.md) §3.9.
- **Keepalive:** the server sends `: ping` every 25s because Cloudflare Free drops idle connections at 100s.
- **Auth:** the client connects with `fetch` (streaming) carrying `Authorization: Bearer <accessToken>` — the native `EventSource` cannot send headers, and the token is never placed in the query string.
- **Reconnect & resync:** `useTransactionEvents` (mounted in `AppShell`) reconnects with exponential backoff (1s → 30s max) and invalidates the TanStack `["staff","transactions"]` queries on every event, so list and detail screens re-fetch from the API. The access token is re-read from secure storage on every connection, so an axios refresh in between is picked up automatically.

Source: [`src/features/transactions/api/transaction-events.ts`](src/features/transactions/api/transaction-events.ts) and [`use-transaction-events.ts`](src/features/transactions/api/use-transaction-events.ts).

---

## Linux note

If Electron exits with a `chrome-sandbox` / setuid error, `npm run dev` already passes `--noSandbox` via electron-vite. Renderer hardening (`contextIsolation`, preload-only IPC) is unchanged.

Optional system fix:

```bash
sudo chown root:root node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
```

---

## Security (summary)

- Tokens only in main-process `safeStorage` — never `localStorage` or React state
- Preload exposes only `window.staffStorage.load/save/clear`
- `contextIsolation: true`, `nodeIntegration: false`, renderer `sandbox: true`
- Do not log JWTs, passwords, or PII
- Production requires HTTPS for `VITE_API_URL`

Full guidelines: [`.agents/rules/behavioral-guidelines.md`](.agents/rules/behavioral-guidelines.md).

---

## Roadmap (deferred)

- `features/kyc/` — verification queue and review
- Global search, production code signing, auto-update

---

## Related repos

| Repo                             | Role                               |
| -------------------------------- | ---------------------------------- |
| [`../manda/`](../manda/)         | Backend API, staff auth, audit log |
| [`../manda-app/`](../manda-app/) | End-user mobile client             |
