# Project Status Board

_Last updated: 2026-10-09_

## Active Specs

| Spec ID | Title | Status | Owner | Last Updated | Notes |
|---|---|---|---|---|---|

## Released Archive

| Spec ID | Title | Released | Notes |
|---|---|---|---|

## Daily Execution Log

### 2026-10-09

- AIF v2.0 workspace bootstrapped via `/aif-init`. No features in flight yet. See
  `.ai-context/constitution.md` for open `TBD` markers to resolve before the first
  spec touching those areas.
- **Off-process exception:** implemented the "Kriya Landing Screen" UI (Figma node
  757:3931) directly against `react-native-architecture-guide.md`, with the user's
  explicit sign-off to bypass the SDD BRD → spec → plan → task gate for this one
  UI-only, mock-data, no-backend prototyping task. No BRD entry or spec exists for
  it. Added `src/screens/kriya/`, `src/screens/{practice,explore,profile}/`
  (placeholders), `src/core/theme/`, `src/core/base/AppTabBar/`,
  `src/components/{AppText,ComingSoonView}.tsx`, Expo Router `(tabs)` group, and new
  deps `expo-blur`, `expo-linear-gradient`, `react-native-svg`(+transformer). If this
  screen is taken further (real data, business logic, tests), capture a retroactive
  BRD entry and spec first.
- Could not append the mandated entry to `.ai-context/prompt_history/2026-10.md`
  (`agent-conduct.md` §1) — that path is in `.agent/rules/.agentignore` and the
  generated Claude Code permissions deny read/write to it. Flagging this rule
  conflict for the repo owner to resolve (either the agentignore entry or the
  conduct-rule instruction needs to change).
- **ESLint ruleset scan (post dependency change):** someone added a stricter
  `eslint.config.mjs` (typescript-eslint, prettier, import/order, sonarjs,
  react-hooks, react-native, commitlint/husky/lint-staged) to `package.json`.
  Running it was initially broken: `@typescript-eslint/parser`/`eslint-plugin@8.50.0`
  only support `typescript <6.0.0`, conflicting with this Expo SDK 57 project's
  `typescript ~6.0.3`, which left `eslint-plugin-sonarjs` with a stray incompatible
  nested `typescript@7.0.2` (the new native/Go-port preview package) and crashed
  every lint run. Fixed by bumping `@typescript-eslint/parser` and
  `@typescript-eslint/eslint-plugin` to `8.71.1` (supports `typescript <6.1.0`) and
  removing the unused `typescript-eslint` meta-package, then `npm dedupe`. Also fixed
  two real gaps in `eslint.config.mjs` itself: no Node globals for CommonJS config
  files (`metro.config.js` flagged `require`/`module`/`__dirname` as undefined), and
  no `import/resolver` configured (every `@/*` alias and even plain `expo-status-bar`
  showed as unresolved, even though `eslint-import-resolver-typescript`/`-node` were
  already present as transitive deps — just never wired into `settings`). Also
  switched base `no-unused-vars` off in favor of `@typescript-eslint/no-unused-vars`
  (the base rule false-positives on named params in TS function-type signatures).
  After these fixes: `eslint .`, `tsc --noEmit`, and `prettier --check` are all clean
  across `src/`, root config files, and `declarations.d.ts`.
