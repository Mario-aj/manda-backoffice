# Manda Backoffice — Agent context

> Workspace-global rules live in `../AGENTS.md` (monorepo root) and are always loaded. This file adds backoffice-only context and imports the rule files below.

## Imported context

- @.agents/rules/behavioral-guidelines.md — security-first coding posture (always apply).
- @.agents/rules/architecture.md — full ADR: stack, layout, staff auth, API, styling.
- @.agents/rules/reuse-before-create.md — search and reuse before adding components/hooks.

## Skills (.agents/skills/)

| Skill                           | Use when                                                      |
| ------------------------------- | ------------------------------------------------------------- |
| `claude-design-implementation/` | Implementing UI from the prototype in `tmp/manda/` (no Figma) |
| `figma-design-implementation/`  | User provides a Figma URL or asks to implement from Figma MCP |

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
