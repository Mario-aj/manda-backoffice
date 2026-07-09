# Cursor agent config (manda-backoffice)

Canonical source for Cursor **rules** and **skills** in the backoffice Electron app.

Workspace-global rules (security, TDD, backend): [`../AGENTS.md`](../AGENTS.md) at monorepo root.

**This is not `manda-app/`** — no Expo, SecureStore, or React Native patterns here.

## Rules (`rules/*.mdc`)

| File                        | `alwaysApply` | Scope                                            |
| --------------------------- | ------------- | ------------------------------------------------ |
| `behavioral-guidelines.mdc` | `true`        | Staff auth, Electron IPC, safeStorage, security  |
| `reuse-before-create.mdc`   | `true`        | Feature layout, shared UI, anti mobile-copypaste |
| `architecture.mdc`          | `false`       | `globs`: `src/**`, `electron/**`, build config   |

Edit rules here. `.agents/rules/` are stubs pointing here.

## Skills (`skills/*/SKILL.md`)

| Skill                          | Trigger                                                         |
| ------------------------------ | --------------------------------------------------------------- |
| `claude-design-implementation` | `tmp/manda/screens-backoffice.jsx`, backoffice artboards `bo-*` |
| `figma-design-implementation`  | Figma URL / MCP for staff desktop UI                            |

For **mobile** design implementation, use `manda-app/.cursor/skills/`.

## Design reference scope

| Use for backoffice        | Ignore (mobile copies)                                     |
| ------------------------- | ---------------------------------------------------------- |
| `screens-backoffice.jsx`  | `screens-auth.jsx`, `screens-chat.jsx`, `ios-frame.jsx`, … |
| HTML canvas §7 Backoffice | HTML canvas §1–6 mobile sections                           |

## Adding guidance

1. **Always-on rule** → new `.mdc` with `alwaysApply: true`
2. **File-specific rule** → new `.mdc` with `globs`
3. **Multi-step workflow** → new `.cursor/skills/<name>/SKILL.md`

After backend API changes: `cd manda && pnpm openapi:export` then `cd backoffice && npm run api:types`.
