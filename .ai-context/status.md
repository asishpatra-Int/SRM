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
