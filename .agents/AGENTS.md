# Manda Backoffice — Agent context

> **Canonical Cursor config:** `.cursor/` in this directory. Workspace-global rules: `../AGENTS.md` (monorepo root).

## What this project is

**Manda Backoffice** (`manda-backoffice`) — Electron desktop app for **staff/ops**: KYC review, transaction monitoring, escrow/payout actions. It is **not** the mobile client (`manda-app/`).

| Stack     | Choice                                        |
| --------- | --------------------------------------------- |
| Shell     | Electron 39 + electron-vite                   |
| UI        | React 19, TypeScript strict, CSS modules      |
| Routing   | react-router-dom v7                           |
| Data      | TanStack Query v5 + axios (`/staff/*` only)   |
| Tokens    | Electron `safeStorage` via preload IPC        |
| API types | Generated from `manda/openapi/staff-api.json` |

## Where to edit

| What                       | Location                         |
| -------------------------- | -------------------------------- |
| Always-on rules            | `.cursor/rules/*.mdc`            |
| Architecture (file-scoped) | `.cursor/rules/architecture.mdc` |
| Skills                     | `.cursor/skills/*/SKILL.md`      |
| `.agents/` copies          | **Stubs only** — edit `.cursor/` |

## Current features

- `features/auth/` — staff login, session, guards
- `features/shell/` — sidebar, topbar, home
- `features/transactions/` — list, detail, confirm escrow, mark payout

## Design reference

- **Backoffice UI:** `tmp/manda/screens-backoffice.jsx` (+ HTML canvas §7)
- **Not for backoffice:** other files in `tmp/manda/` are mobile prototype copies — use `manda-app/` skills for those

## Commands

```bash
cd backoffice && npm install && npm run dev   # Electron dev
npm test                                       # Vitest
npm run api:types                              # after manda openapi:export
```

Backend: `cd manda && docker compose up postgres redis api`
