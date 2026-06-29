---
name: claude-design-implement
description: Translates the Manda Claude Design prototype (tmp/manda) into production Expo/React Native screens with 1:1 visual fidelity. Use when implementing UI from the design reference, when the user mentions "implement design", "build screen", "match prototype", "Claude design", or points at tmp/manda. Do not use for Figma URLs — use figma-design-implementation instead.
---

# Implement Claude Design (Manda Mobile)

## Overview

This skill provides a structured workflow for translating the **Claude Design prototype** in `tmp/manda/` into production-ready **Expo · React Native** code. The prototype is the visual source of truth — there is no Figma file. Implementations must honor the project's architecture, `MANDA` design tokens, and existing `components/manda/*` primitives.

**Read first (loaded automatically via `.cursor/rules/`):**

- `.cursor/rules/architecture.mdc` — routing, auth, API, theming, conventions
- `.cursor/rules/behavioral-guidelines.mdc` — security posture (financial app)

## Skill Boundaries

| User intent                                   | Use this skill | Use instead                                                            |
| --------------------------------------------- | -------------- | ---------------------------------------------------------------------- |
| Build or update a screen to match `tmp/manda` | **Yes**        | —                                                                      |
| User provides a Figma URL or Figma MCP        | No             | `.cursor/skills/figma-design-implementation/SKILL.md` |
| Edit nodes inside Figma                       | No             | `figma-use` (Cursor Figma MCP)                                         |
| Backend/API-only work                         | No             | architecture.md §6–7                                                   |

## Design Reference Location

```
manda-app/tmp/manda/
├── Manda Prototype.html      # Canvas index — sections + artboard IDs (open in browser for visual QA)
├── brand.jsx                 # MANDA tokens, atoms (buttons, inputs, avatar, icons, skeleton)
├── screens-auth.jsx          # Welcome, login, register, OTP, forgot/reset, onboarding variants
├── screens-chat.jsx          # Conversations, search, 1:1 & group chat, empty/skeleton states
├── screens-groups.jsx        # Create group, add members
├── screens-group-settings.jsx# Group info by role (owner / admin / member)
├── screens-transaction.jsx   # P2P exchange flow (open → buyer → seller → done)
├── screens-profile-push.jsx  # Profile + lock-screen push mock (push is reference-only)
├── ios-frame.jsx             # Device chrome — **do not port to production**
└── design-canvas.jsx         # Canvas wrapper — **do not port to production**
```

**Preview:** Open `Manda Prototype.html` locally (static server or `file://`) to see every artboard. Artboard `id` values in the HTML map 1:1 to screen function names (e.g. `id="login"` → `ScreenLogin` in `screens-auth.jsx`).

---

## Required Workflow

**Follow these steps in order. Do not skip steps.**

### Step 1: Identify the Target Artboard

Determine exactly which screen(s) to implement.

| Source                                     | How to resolve                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| User names a screen ("login", "chat list") | Match to artboard `id` in `Manda Prototype.html` or `Screen*` function in `screens-*.jsx` |
| User names a file                          | Read the `Screen*` export(s) in that file                                                 |
| User names a route                         | Use the **Route map** table below, then open the matching `Screen*`                       |
| Broad feature ("groups")                   | Read `Manda Prototype.html` section + list all artboards in that `DCSection`              |

**If scope is ambiguous**, list candidate artboards and confirm before coding.

### Step 2: Read Design Context

Read the prototype source in this order:

1. **`Manda Prototype.html`** — section title, subtitle, artboard label (human intent).
2. **Matching `Screen*` function** in the relevant `screens-*.jsx` — layout, copy (Portuguese), spacing, colors, interaction hints.
3. **`brand.jsx`** — when the screen uses shared atoms (`PrimaryButton`, `TextField`, `Avatar`, `Icon`, `Amount`, `Skeleton`) not inlined in the screen file.

Extract explicitly:

- **Copy** — headings, labels, CTAs, hints (keep Portuguese unless i18n is requested).
- **Layout** — flex direction, gaps, padding, alignment, scroll vs fixed footer.
- **Typography** — font size, weight (map to `MANDA_FONT`), letter-spacing.
- **Colors** — map hex values to `MANDA.*` from `@/constants/manda-theme` (values already match `brand.jsx`).
- **States** — empty, skeleton, error, disabled, role variants (e.g. group settings owner vs member).
- **Navigation** — back affordance, links, primary CTA destination (wire with `expo-router`).

**Large screens:** Read top-down in sections (header → body → footer). For shared shells (e.g. `ScreenGroupSettings`), read the parameterized component and each role variant.

### Step 3: Capture Visual Reference

Establish a visual baseline before writing code:

- **Preferred:** Open `Manda Prototype.html` and locate the artboard by `id` or label.
- **Alternative:** Mentally reconstruct from inline `style={{ ... }}` in the `Screen*` function — the prototype uses explicit pixel values.

Treat the artboard content **inside** `<Phone>` as the target. Ignore `IOSDevice`, `IOSStatusBar`, `IOSNavBar`, and bezels from `ios-frame.jsx` — the real app uses `Screen` + `useSafeAreaInsets`, not a fake device frame.

### Step 4: Map to Production Structure

Before editing, plan the file layout:

| Layer        | Location                                 | Rule                                                                             |
| ------------ | ---------------------------------------- | -------------------------------------------------------------------------------- |
| Route (thin) | `app/(auth)/*.tsx`, `app/(app)/**/*.tsx` | Navigation, mutations, form state only — **no business logic soup**              |
| Reusable UI  | `components/manda/*.tsx`                 | Extend existing primitives; add new file only if used 2+ times or clearly shared |
| Data / API   | `lib/api/*`, hooks, `providers/*`        | All HTTP via axios client; TanStack Query for server state                       |
| Tokens       | `constants/manda-theme.ts`               | Never duplicate hex literals if `MANDA` already has the token                    |

**Route map (prototype artboard → expo-router):**

| Artboard `id`                   | `Screen*`                   | Production route                                          |
| ------------------------------- | --------------------------- | --------------------------------------------------------- |
| `welcome`                       | `ScreenWelcome`             | _(no route yet — new screen or merge into auth entry)_    |
| `login`                         | `ScreenLogin`               | `app/(auth)/login.tsx`                                    |
| `register`                      | `ScreenRegister`            | `app/(auth)/register.tsx`                                 |
| `otp`                           | `ScreenOTP`                 | `app/(auth)/verify-email.tsx`                             |
| `forgot`                        | `ScreenForgotPassword`      | `app/(auth)/forgot-password.tsx`                          |
| `reset`                         | `ScreenResetPassword`       | `app/(auth)/reset-password.tsx`                           |
| `onboarding`                    | `ScreenOnboarding`          | `app/(auth)/onboarding.tsx` or `app/(app)/onboarding.tsx` |
| `onboarding-skeleton`           | `ScreenOnboardingSkeleton`  | Loading state inside onboarding route                     |
| `onboarding-first-user`         | `ScreenOnboardingFirstUser` | Variant inside onboarding route                           |
| `chatlist`                      | `ScreenChatList`            | `app/(app)/(tabs)/index.tsx`                              |
| `chatlist-skeleton`             | `ScreenChatListSkeleton`    | Use `ConversationsSkeleton` or inline                     |
| `chatlist-empty`                | `ScreenChatListEmpty`       | Empty state in conversations tab                          |
| `search`                        | `ScreenSearch`              | New route under `(app)/` when built                       |
| `chat1to1`                      | `ScreenChat1to1`            | Conversation detail (1:1)                                 |
| `chatgroup`                     | `ScreenChatGroup`           | `app/(app)/groups/[id].tsx` (or shared chat route)        |
| `chat*-empty`, `chat*-skeleton` | various                     | Co-locate with parent route                               |
| `group-create-details`          | `ScreenCreateGroupDetails`  | `app/(app)/groups/create/index.tsx`                       |
| `group-create-members`          | `ScreenCreateGroupMembers`  | `app/(app)/groups/create/members.tsx`                     |
| `group-add-members`             | `ScreenAddGroupMembers`     | New route or modal from group settings                    |
| `group-settings-*`              | `ScreenGroupSettings*`      | `app/(app)/groups/[id].tsx` (role from API)               |
| `tx-open` … `tx-done`           | `ScreenTransaction*`        | New routes under `(app)/` when built                      |
| `profile`                       | `ScreenProfile`             | `app/(app)/(tabs)/profile.tsx`                            |
| `push`                          | `ScreenLockPush`            | **Reference only** — not an in-app route                  |

Update this table when new routes land. Prefer **one route file per artboard** for reviewability unless variants are truly the same screen with props.

### Step 5: Reuse the Design System (mandatory)

**Always reach for existing production primitives before creating new ones.**

| Prototype (`brand.jsx`)         | Production (`components/manda/`)                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `MANDA` colors                  | `@/constants/manda-theme` → `MANDA`, `MANDA_FONT`                                    |
| `MandaGlyph`                    | `manda-glyph.tsx`                                                                    |
| `MandaWordmark`                 | `manda-wordmark.tsx`                                                                 |
| `Avatar`                        | `avatar.tsx`                                                                         |
| `PrimaryButton` / `GhostButton` | `primary-button.tsx`                                                                 |
| `TextField`                     | `text-field.tsx`                                                                     |
| `OtpBoxes`                      | `otp-boxes.tsx`                                                                      |
| `Screen` wrapper                | `screen.tsx` (safe area, keyboard)                                                   |
| Chat rows / bubbles / composer  | `conversation-row.tsx`, `group-message-bubble.tsx`, `chat-composer.tsx`, etc.        |
| Skeleton shimmer                | `conversations-skeleton.tsx`, `group-chat-skeleton.tsx`, or local `Skeleton` pattern |

| Prototype only                             | Production approach                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| `Icon.*` SVG helpers                       | `@expo/vector-icons` (Feather) — match **semantics**, not SVG paths       |
| `Amount`                                   | `Text` + `fontVariant: ['tabular-nums']` + `Intl.NumberFormat('pt-AO')`   |
| `IOSDevice`, `IOSStatusBar`, `IOSKeyboard` | **Do not port** — use React Native safe area + system chrome              |
| `div`, `span`, `button`                    | `View`, `Text`, `Pressable`                                               |
| `style={{ flex: 1 }}`                      | Same on `View`; use `StyleSheet.create` only when reuse helps readability |

**Hard rules:**

- Import colors/fonts from `@/constants/manda-theme` — never copy hex from `brand.jsx` inline unless adding a **new** token to `manda-theme.ts` first.
- Use `@/` path alias — no deep relatives.
- Wrap screens in `<Screen>` with appropriate `edges` and `keyboardVerticalOffset` when under a Stack header.

### Step 6: Translate Web JSX → React Native

The prototype is **web React with inline styles**. It is a behavioral and visual spec, not copy-paste source.

| Web / prototype                       | React Native                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| `div`                                 | `View`                                                                                     |
| `span`, text in `div`                 | `Text` (all user-visible strings)                                                          |
| `button`                              | `Pressable` + `Text` or `PrimaryButton`                                                    |
| `input` / `TextField` display-only    | `TextField` with `value` / `onChangeText`                                                  |
| `onClick`                             | `onPress`                                                                                  |
| `position: 'absolute', inset: 0`      | `StyleSheet.absoluteFillObject` or flex layout                                             |
| `backdropFilter`                      | `BlurView` from `expo-blur` only if already in project; otherwise approximate with opacity |
| `linear-gradient` / `radial-gradient` | `expo-linear-gradient` if dependency exists; else layered `View` with opacity              |
| `fontFamily: MANDA.font`              | `fontFamily: MANDA_FONT.<weight>`                                                          |
| `fontWeight: 800`                     | `MANDA_FONT.extraBold`                                                                     |
| `gap: N`                              | `gap: N` on flex containers (RN 0.71+) or margins                                          |
| `textWrap: 'pretty'`                  | Omit or use reasonable `lineHeight`                                                        |
| Scrollable body                       | `ScrollView` / `FlatList` with `keyboardShouldPersistTaps="handled"`                       |
| `cursor: pointer`                     | `Pressable` with opacity feedback                                                          |

**Typography scale (common mappings):**

| Prototype                        | RN style                                                            |
| -------------------------------- | ------------------------------------------------------------------- |
| 44px / 800 / -1.6 letter-spacing | `fontSize: 44`, `MANDA_FONT.extraBold`, `letterSpacing: -1.6`       |
| 32px headline                    | `fontSize: 32`, `MANDA_FONT.extraBold`, `letterSpacing: -1`         |
| 17px body                        | `fontSize: 17`, `MANDA_FONT.regular`, `lineHeight: 24`              |
| 13px uppercase label             | `fontSize: 13`, `MANDA_FONT.semiBold`, `textTransform: 'uppercase'` |

### Step 7: Wire Behavior (architecture-compliant)

Route files stay thin. Follow existing patterns (see `app/(auth)/login.tsx`):

```tsx
// Pattern: route owns form state + mutation; Screen owns layout
export default function Login() {
  const { loginMutation } = useAuth();
  const [email, setEmail] = useState("");
  // ...
  return (
    <Screen>
      <TextField value={email} onChangeText={setEmail} /* ... */ />
      <PrimaryButton onPress={submit} disabled={!canSubmit}>
        Entrar
      </PrimaryButton>
    </Screen>
  );
}
```

| Concern             | Pattern                                                             |
| ------------------- | ------------------------------------------------------------------- |
| Auth                | `useAuth()` from `@/providers/auth-provider`                        |
| API errors          | `ApiError.message` (Portuguese) — never raw stack traces            |
| Navigation          | `useRouter()` from `expo-router` — `router.push`, `replace`, `back` |
| Protected screens   | Under `app/(app)/` — guard is in `(app)/_layout.tsx`                |
| Public auth screens | Under `app/(auth)/`                                                 |
| Lists               | `FlatList` + existing row components                                |
| Loading             | Skeleton components or `isPending` from queries                     |
| Empty               | Dedicated empty branch — match prototype empty artboards            |

**Security (non-negotiable):** See `.cursor/rules/behavioral-guidelines.mdc` — tokens only in SecureStore, no bearer headers in components, no logging secrets, validate API shapes.

### Step 8: Validate Against Prototype

Before marking complete, compare implementation to the artboard.

**Validation checklist:**

- [ ] Layout matches (padding, gaps, alignment, scroll regions)
- [ ] Typography matches (size, weight, letter-spacing, line height)
- [ ] Colors use `MANDA` tokens and match prototype intent
- [ ] Portuguese copy matches unless intentionally changed
- [ ] Interactive states: disabled, loading, error, pressed
- [ ] Empty and skeleton artboards implemented when in scope
- [ ] Safe area respected — no content under notch/home indicator
- [ ] Keyboard does not cover inputs (`Screen`, `KeyboardAvoidingView`)
- [ ] Uses `components/manda/*` — no duplicated primitive styling
- [ ] No `ios-frame` or `design-canvas` code in production
- [ ] Route is thin; API via `lib/api/*`

---

## Implementation Rules

### Component organization

- **One primary route file** per screen unless variants share >70% structure (then extract a shared component in `components/manda/` or `components/<feature>/`).
- Name feature components clearly: `group-settings-header.tsx`, not `helpers.tsx`.
- Export props types for reusable components.

### When to extend vs create

| Situation                         | Action                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `PrimaryButton` size/tone matches | Use `size` / `tone` props                                                    |
| Text field needs new suffix       | Pass `suffix` node to `TextField`                                            |
| New visual pattern used once      | Inline in route file                                                         |
| New pattern used 2+ screens       | Add to `components/manda/`                                                   |
| Prototype color not in `MANDA`    | Add to `manda-theme.ts` with comment — do not hardcode one-off hex in routes |

### Icons

Prototype `Icon` in `brand.jsx` is a custom SVG set. In production:

1. Prefer **Feather** from `@expo/vector-icons` with closest semantic match (`chevron-left`, `search`, `send`, …).
2. If no Feather equivalent and icon is brand-critical, add `components/manda/manda-icons.tsx` with SVG via `react-native-svg` — **one file**, named exports, do not scatter SVGs in routes.

### Assets

The prototype has **no image assets** — glyphs and icons are inline SVG. Do not add icon npm packages for a single screen. Reuse Expo vector icons or project SVGs.

### Accessibility

- `Pressable` → `accessibilityRole="button"` where appropriate
- `accessibilityState={{ disabled }}` on buttons
- `secureTextEntry` on password fields
- Touch targets ≥ 44pt where feasible

---

## Examples

### Example 1: Update login to match prototype

User: "Align login with the design reference."

**Actions:**

1. Artboard `login` → `ScreenLogin` in `screens-auth.jsx`.
2. Open `Manda Prototype.html` § Autenticação → artboard **Login**.
3. Read layout: back button, headline, two `TextField`s, forgot link, CTA, footer link.
4. Compare `app/(auth)/login.tsx` — adjust spacing, `TextField` labels, `PrimaryButton` size `lg`, link styles.
5. Map `Icon.chevronLeft` → `Feather` `chevron-left`.
6. Run validation checklist.

**Result:** Login route matches prototype; uses existing `Screen`, `TextField`, `PrimaryButton`.

### Example 2: Implement conversations empty state

User: "Add the empty conversations state from design."

**Actions:**

1. Artboard `chatlist-empty` → `ScreenChatListEmpty` in `screens-chat.jsx`.
2. Read copy and illustration layout (icon circle, title, subtitle, CTA).
3. In `app/(app)/(tabs)/index.tsx`, branch when `conversations.length === 0`.
4. Reuse `PrimaryButton`, `MANDA` colors; do not duplicate list row styling.
5. Validate against artboard.

### Example 3: Group settings by role

User: "Implement group info for admins."

**Actions:**

1. Artboard `group-settings-admin` → `ScreenGroupSettingsAdmin` → shared `ScreenGroupSettings({ role: 'admin' })`.
2. Read `screens-group-settings.jsx` for conditional rows (permissions, destructive actions).
3. Map to `app/(app)/groups/[id].tsx` — role from API, not hardcoded in production.
4. Extract row component if owner/admin/member share structure.

---

## Best Practices

### Always start with the prototype

Never implement from memory. Read the `Screen*` function and preview the artboard when possible.

### Design system first

When prototype styling conflicts with an existing `components/manda/*` default, **prefer the component** and adjust spacing minimally to match visuals. If the component is wrong globally, fix the component — not one route.

### Incremental validation

Compare layout after header, after form, after CTA — not only at the end.

### Document intentional deviations

If accessibility, security, or platform limits require a change (e.g. no blur on Android), add a brief `// Design: …` comment explaining the deviation.

### Keep tmp/manda read-only

Do not edit `tmp/manda/*` to "fix" the design during implementation. Change production code or discuss updating the prototype separately.

---

## Common Issues and Solutions

### Issue: Layout doesn't match after translation

**Cause:** Web flexbox nuances (`minHeight`, `margin: auto`, absolute decorative blobs).
**Solution:** Re-read the `Screen*` styles section by section. Use flex `justifyContent` / `marginTop: 'auto'` for footers. Decorative gradients are optional — prioritize structure and copy.

### Issue: Wrong font weight

**Cause:** Using `fontWeight: '800'` with wrong family.
**Solution:** Always pair `MANDA_FONT.extraBold` (etc.) — don't mix `fontWeight` with loaded Expo Google fonts unless required.

### Issue: Duplicated button/input styling

**Cause:**Inlining styles from `brand.jsx` instead of importing components.
**Solution:** Use `PrimaryButton`, `TextField`, `GhostButton` from `@/components/manda/*`.

### Issue: Device frame double padding

**Cause:** Porting `IOSDevice` padding plus `Screen` safe area.
**Solution:** Prototype phone chrome is non-authoritative. Only `Screen` + route padding (e.g. `paddingHorizontal: 24`).

### Issue: Static prototype values in production

**Cause:** Copying `value="joao.cangola"` from design `TextField`.
**Solution:** Wire `useState` / react-hook-form + API; prototype values are placeholders.

---

## Quick Reference: Screen Inventory

| Section             | Artboards                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1 · Auth**        | welcome, login, register, otp, forgot, reset, onboarding, onboarding-skeleton, onboarding-first-user                                             |
| **2 · Messaging**   | chatlist, chatlist-skeleton, chatlist-empty, search, chat1to1, chat1to1-empty, chat1to1-skeleton, chatgroup, chatgroup-empty, chatgroup-skeleton |
| **3 · Groups**      | group-create-details, group-create-members, group-add-members, group-settings-owner, group-settings-admin, group-settings-member                 |
| **4 · Transaction** | tx-open, tx-buyer, tx-seller, tx-done                                                                                                            |
| **5 · Account**     | profile, push (reference only)                                                                                                                   |

---

## Understanding This Workflow

**For product/design:** The HTML prototype is the contract; production should match artboards unless engineering documents a platform constraint.

**For engineering:** `tmp/manda` is JSX spec + visual canvas — translate through the design system and architecture, don't port web DOM or device frames.

**For agents:** Read → map → reuse → translate → wire → validate. Security and routing rules from `.cursor/rules/architecture.mdc` / `.cursor/rules/behavioral-guidelines.mdc` always apply.
