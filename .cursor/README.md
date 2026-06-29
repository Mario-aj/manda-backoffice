# Cursor agent config (manda-app)

This folder is the **canonical** source for Cursor rules and skills in this project.

## Rules (`rules/*.mdc`)

| File | `alwaysApply` | Scope |
|------|---------------|-------|
| `behavioral-guidelines.mdc` | `true` | Every chat |
| `reuse-before-create.mdc` | `true` | Every chat |
| `architecture.mdc` | `false` | `globs` on app source files |

Edit rules here. The `.agents/rules/` copies are stubs only.

## Skills (`skills/*/SKILL.md`)

Discovered by Cursor from the `description` in each skill's YAML frontmatter. The agent reads the full `SKILL.md` when the task matches.

| Skill | Trigger |
|-------|---------|
| `claude-design-implementation` | `tmp/manda/` prototype, "match design", screen implementation without Figma |
| `figma-design-implementation` | Figma URL, Figma MCP, "implement from Figma" |

## Adding new guidance

1. **Always-on rule** → new `.mdc` with `alwaysApply: true`
2. **File-specific rule** → new `.mdc` with `globs` matching paths
3. **Workflow / multi-step task** → new `.cursor/skills/<name>/SKILL.md` with a clear `description`

See also: project root `AGENTS.md`.
