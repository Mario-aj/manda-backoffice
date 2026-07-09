---
name: claude-design-implement
description: Translates the Manda backoffice Claude Design prototype (tmp/manda/screens-backoffice.jsx) into production Electron/React code with visual fidelity. Use when implementing backoffice UI from the design reference, "match design", "build screen", or tmp/manda backoffice artboards. Do not use for Figma URLs — use figma-design-implementation. Do not use for manda-app mobile screens.
---

# Implement Claude Design (Manda Backoffice)

## Overview

Structured workflow for translating the **backoffice prototype** into production code in this repo: **Electron 39 · React 19 · CSS modules · react-router-dom v7**.

**Read first (auto-loaded via `.cursor/rules/`):**

- `.cursor/rules/architecture.mdc` — feature layout, staff auth, API, styling
- `.cursor/rules/behavioral-guidelines.mdc` — staff security posture
- Workspace `../../AGENTS.md` — global TDD + backend contract

## Skill boundaries

| User intent                                     | Use this skill | Use instead                                              |
| ----------------------------------------------- | -------------- | -------------------------------------------------------- |
| Backoffice screen from `screens-backoffice.jsx` | **Yes**        | —                                                        |
| Figma URL / Figma MCP                           | No             | `figma-design-implementation`                            |
| Mobile app (`manda-app/`, Expo, expo-router)    | No             | `manda-app/.cursor/skills/claude-design-implementation/` |
| Backend `/staff/*` endpoints only               | No             | `manda/services/api` + workspace AGENTS.md               |

## Design reference (backoffice only)

```
backoffice/tmp/manda/
├── screens-backoffice.jsx    # ★ Primary — BOLogin, BOKyc*, BOTx*
├── brand.jsx                 # MANDA tokens + shared atoms (web JSX reference)
└── Manda Prototype.html      # Canvas §7 · Backoffice — artboard ids bo-*
```

**Ignore for backoffice implementation** (mobile copies kept for shared brand only):

- `screens-auth.jsx`, `screens-chat.jsx`, `screens-groups.jsx`, `screens-transaction.jsx`, `ios-frame.jsx`, etc.

Open `Manda Prototype.html` → section **7 · Backoffice** for visual QA. Artboard ids: `bo-login`, `bo-kyc-queue`, `bo-kyc-detail`, `bo-kyc-lightbox`, `bo-kyc-reject`, `bo-tx-list`, `bo-tx-detail`.

**Do not port:** `WebFrame` browser chrome (traffic lights, URL pill) — real app uses Electron window + `AppShell`.

---

## Required workflow

### Step 1: Identify target artboard

| Artboard id       | Prototype export | Production route / feature                                |
| ----------------- | ---------------- | --------------------------------------------------------- |
| `bo-login`        | `BOLogin`        | `features/auth/pages/login-page.tsx`                      |
| `bo-kyc-queue`    | `BOKycQueue`     | `features/kyc/pages/` _(future)_                          |
| `bo-kyc-detail`   | `BOKycDetail`    | `features/kyc/pages/` _(future)_                          |
| `bo-kyc-lightbox` | `BOKycLightbox`  | modal in KYC detail _(future)_                            |
| `bo-kyc-reject`   | `BOKycReject`    | `ConfirmDangerDialog` pattern _(future)_                  |
| `bo-tx-list`      | `BOTxList`       | `features/transactions/pages/transactions-list-page.tsx`  |
| `bo-tx-detail`    | `BOTxDetail`     | `features/transactions/pages/transaction-detail-page.tsx` |

If scope is ambiguous, list candidates and confirm before coding.

### Step 2: Read design context

1. Matching `BO*` function in `screens-backoffice.jsx` — layout, copy (Portuguese), spacing, colors.
2. `brand.jsx` for shared atoms if referenced.
3. Existing production page in `features/<name>/pages/` — diff against prototype, don't rewrite from scratch.

Extract: copy, table columns, badge tones, filter controls, destructive action affordances.

### Step 3: Map to production structure

| Layer        | Location                      | Rule                                                  |
| ------------ | ----------------------------- | ----------------------------------------------------- |
| Route wiring | `app/router.tsx`              | Thin — paths + guards only                            |
| Page         | `features/<name>/pages/*.tsx` | Compose feature components; co-located `*.module.css` |
| Feature UI   | `features/<name>/components/` | Domain-specific (filters, tables, action panels)      |
| Shared atoms | `shared/ui/`                  | Buttons, fields, dialogs, brand marks                 |
| Data         | `features/<name>/api/`        | Calls via `shared/api/client.ts`                      |
| Types        | `shared/api/generated/`       | Regenerate from `manda/openapi/staff-api.json`        |

### Step 4: Reuse design system (mandatory)

| Prototype                 | Production                                                     |
| ------------------------- | -------------------------------------------------------------- |
| `MANDA.*` hex             | `var(--manda-*)` in `*.module.css` from `app/global.css`       |
| `PrimaryButton`           | `@/shared/ui/primary-button`                                   |
| `TextField`               | `@/shared/ui/text-field`                                       |
| `Avatar`                  | `@/shared/ui/avatar`                                           |
| `MandaWordmark` / glyph   | `@/shared/ui/manda-wordmark`, `manda-glyph`                    |
| Destructive confirm modal | `@/shared/ui/confirm-danger-dialog`                            |
| Loading                   | `@/shared/ui/loading-screen`                                   |
| App chrome                | `features/shell/components/` — `Sidebar`, `Topbar`, `AppShell` |

**Hard rules:**

- **CSS modules** — no inline `style={{ … }}` for layout/theme (exception: dynamic CSS vars on `Avatar`).
- **`@/` imports** — no deep cross-feature internals; use feature barrels when added.
- **Staff API only** — paths under `/staff/*`; never `/auth/login` (end-user).

### Step 5: Translate web JSX → React (desktop)

| Prototype                         | Production                                           |
| --------------------------------- | ---------------------------------------------------- |
| `div` / `span`                    | `div` / `span` (standard DOM — not React Native)     |
| `button`                          | `<button type="button">` or `PrimaryButton`          |
| `onClick`                         | `onClick`                                            |
| inline `style={{ … }}`            | CSS module class                                     |
| `table`                           | semantic `<table>` in module (see transactions list) |
| `Sidebar` / `Topbar` in prototype | `features/shell/` — extend, don't duplicate          |

### Step 6: Wire behavior

Follow existing patterns:

```tsx
// Page: TanStack Query + mutations
const query = useQuery({
  queryKey: ["staff", "transactions", filters],
  queryFn: () => fetchStaffTransactions(filters),
});

const mutation = useMutation({
  mutationFn: () => confirmTransactionEscrow(id),
  onSuccess: () =>
    void qc.invalidateQueries({ queryKey: ["staff", "transactions"] }),
});
```

| Concern         | Pattern                                                                   |
| --------------- | ------------------------------------------------------------------------- |
| Auth            | `useAuth()` from `@/features/auth`                                        |
| Errors          | `ApiError.message` (Portuguese)                                           |
| Navigation      | `react-router-dom` — `Link`, `useParams`, `NavLink`                       |
| Ops actions     | `ConfirmDangerDialog` before POST mutations                               |
| OpenAPI changes | `npm run api:types` in backoffice after `pnpm openapi:export` in `manda/` |

**Security:** Staff JWT via axios interceptor only; tokens in Electron `safeStorage` via preload — see behavioral guidelines.

### Step 7: Validate

- [ ] Layout matches prototype (sidebar, topbar, content padding, tables)
- [ ] Colors use `--manda-*` tokens
- [ ] Portuguese copy matches unless intentionally changed
- [ ] Loading / empty / error states
- [ ] Destructive ops actions use red confirm in `ConfirmDangerDialog`
- [ ] No `WebFrame` / fake browser chrome in production
- [ ] Plan → tests → implementation per workspace AGENTS.md

---

## Route map (current)

| Path                | Page                    | Status             |
| ------------------- | ----------------------- | ------------------ |
| `/login`            | `LoginPage`             | Done               |
| `/`                 | `HomePage`              | Done (placeholder) |
| `/transactions`     | `TransactionsListPage`  | Done               |
| `/transactions/:id` | `TransactionDetailPage` | Done               |
| `/kyc`, `/kyc/:id`  | —                       | Prototype only     |

Register new routes in `app/router.tsx` under `AuthGuard` + `AppShell`.

---

## Common mistakes

| Mistake                                        | Fix                                          |
| ---------------------------------------------- | -------------------------------------------- |
| Implementing from `screens-auth.jsx`           | Wrong project — use `screens-backoffice.jsx` |
| Copying Expo / `Screen` / SecureStore patterns | Backoffice uses Electron + `staffStorage`    |
| Inline styles from prototype                   | Move to `*.module.css`                       |
| Raw axios in pages                             | Use `features/*/api/` + shared client        |
| Skipping confirm dialog on ops POST            | Use `ConfirmDangerDialog`                    |

---

## Quick reference: BO screen inventory

| Section          | Artboards                                                           |
| ---------------- | ------------------------------------------------------------------- |
| **Auth**         | `bo-login`                                                          |
| **KYC**          | `bo-kyc-queue`, `bo-kyc-detail`, `bo-kyc-lightbox`, `bo-kyc-reject` |
| **Transactions** | `bo-tx-list`, `bo-tx-detail`                                        |

Keep `tmp/manda/` read-only during implementation.
