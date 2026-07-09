---
name: figma-implement-design
description: Translates Figma designs into production-ready Manda Backoffice code (Electron/React, CSS modules). Use when implementing UI from Figma URLs or Figma MCP for staff desktop screens. For tmp/manda prototype without Figma, use claude-design-implementation. Not for manda-app mobile.
---

# Implement Design (Manda Backoffice)

Workflow for translating Figma designs into backoffice production code with visual fidelity.

**Project stack:** Electron renderer · React 19 · TypeScript · CSS modules · TanStack Query · staff API (`/staff/*`).

**Read:** `.cursor/rules/architecture.mdc`, `.cursor/rules/behavioral-guidelines.mdc`.

## Skill boundaries

| User intent                                  | Use this skill | Use instead                    |
| -------------------------------------------- | -------------- | ------------------------------ |
| Figma URL / Figma MCP for backoffice UI      | **Yes**        | —                              |
| `tmp/manda/screens-backoffice.jsx` prototype | No             | `claude-design-implementation` |
| Mobile app UI                                | No             | `manda-app/` skills            |
| Edit nodes inside Figma                      | No             | Figma MCP `figma-use`          |

## Prerequisites

- Figma MCP connected
- URL format: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
- Or `figma-desktop` MCP with node selected in desktop app

## Required workflow

### Step 1: Get node ID

Parse `fileKey` and `node-id` from URL, or use desktop selection.

### Step 2: Fetch design context

```
get_design_context(fileKey="…", nodeId="…")
```

If truncated: `get_metadata` → fetch child nodes individually.

### Step 3: Visual reference

```
get_screenshot(fileKey="…", nodeId="…")
```

### Step 4: Download assets

Use Figma MCP asset URLs directly when provided. Prefer inline SVG in `shared/ui/` for icons — don't add icon packages for one screen.

### Step 5: Translate to backoffice conventions

**Do not paste Tailwind from Figma output as-is.**

| Figma output      | Backoffice                                                                    |
| ----------------- | ----------------------------------------------------------------------------- |
| Colors            | `var(--manda-*)` in `*.module.css` — add token to `app/global.css` if missing |
| Typography        | Plus Jakarta via `@fontsource` — weights 400/600/700/800                      |
| Buttons           | `shared/ui/primary-button` + module overrides                                 |
| Text inputs       | `shared/ui/text-field`                                                        |
| Modals / confirms | `shared/ui/confirm-danger-dialog` for destructive ops                         |
| Layout shell      | Extend `features/shell/components/app-shell` — don't rebuild sidebar          |
| Data tables       | Co-located styles in `features/<name>/pages/*.module.css`                     |
| Spacing           | Match prototype; prefer CSS grid/flex in modules                              |

Reuse existing components before creating new ones — see `.cursor/rules/reuse-before-create.mdc`.

### Step 6: Wire data

- HTTP via `features/<name>/api/` using `shared/api/client.ts`
- Server state via TanStack Query (`app/query-client.ts` defaults)
- Route registration in `app/router.tsx` behind `AuthGuard`
- Regenerate types: `npm run api:types` after backend OpenAPI export

### Step 7: Validate

- [ ] Layout, typography, colors match screenshot
- [ ] CSS modules — no inline theme styles
- [ ] Portuguese API errors via `ApiError.message`
- [ ] Staff-only endpoints; role guards on backend
- [ ] Destructive actions use `ConfirmDangerDialog`

## Design system mapping

| Need            | Check first                                    |
| --------------- | ---------------------------------------------- |
| Brand / sidebar | `features/shell/components/sidebar.module.css` |
| Page header     | `AppShell` `title` prop + `topbar`             |
| Ops actions     | `ConfirmDangerDialog` + feature API mutation   |
| Status badges   | `transactions.module.css` `.badge` pattern     |
| Tokens          | `src/app/global.css` `:root` block             |

## Best practices

- Fetch context + screenshot before coding — no assumptions.
- Prefer extending `shared/ui/` over one-off styled elements.
- Document intentional deviations (accessibility, Electron constraints) in code comments.
- Keep feature pages thin; push logic to `api/` and hooks.

## Common issues

| Issue                   | Solution                                                              |
| ----------------------- | --------------------------------------------------------------------- |
| Truncated Figma context | Fetch children via `get_metadata`                                     |
| Colors don't match      | Map to `--manda-*`; add token rather than hardcoding hex in modules   |
| Reimplemented sidebar   | Use `AppShell` + `Sidebar`                                            |
| Used mobile patterns    | This is desktop web in Electron — DOM + CSS modules, not React Native |
