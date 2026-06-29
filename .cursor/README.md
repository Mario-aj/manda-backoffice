# Cursor agent config (manda-backoffice)

This folder is the **canonical** source for Cursor rules and skills in the backoffice project.

Workspace-global rules (security, TDD, backend): `../AGENTS.md` at the monorepo root (`manda-repos/AGENTS.md`).

## Rules (`rules/*.mdc`)

| File                        | `alwaysApply` | Scope                                            |
| --------------------------- | ------------- | ------------------------------------------------ |
| `behavioral-guidelines.mdc` | `true`        | Every chat — staff auth, Electron IPC, security  |
| `reuse-before-create.mdc`   | `true`        | Every chat — feature layout, shared UI           |
| `architecture.mdc`          | `false`       | `globs` on `src/**`, `electron/**`, build config |

Edit rules here. The `.agents/rules/` copies are stubs only.

## Skills (`skills/*/SKILL.md`)

| Skill                          | Trigger                                                                     |
| ------------------------------ | --------------------------------------------------------------------------- |
| `claude-design-implementation` | `tmp/manda/` prototype, "match design", screen implementation without Figma |
| `figma-design-implementation`  | Figma URL, Figma MCP, "implement from Figma"                                |

## Adding new guidance

1. **Always-on rule** → new `.mdc` with `alwaysApply: true`
2. **File-specific rule** → new `.mdc` with `globs` matching paths
3. **Workflow / multi-step task** → new `.cursor/skills/<name>/SKILL.md` with a clear `description`
