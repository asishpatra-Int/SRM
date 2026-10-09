# Standards — Expo / React Native Delta

Extends standards.core.md.

> **No AIF v2.0 §5.2 template exists for this stack yet — flagged for developer
> review.** This delta is generated from this repo's pre-existing `AGENTS.md`
> (maintained by the `expo@claude-plugins-official` Claude Code plugin) plus
> observed project conventions. `AGENTS.md` stays the source of truth for
> Expo-version-specific doc-fetching instructions (SDK docs change every release) —
> this file does not restate those, it adds the engineering conventions layer.

* Routes live only in `src/app/` (Expo Router, file-based). Components, hooks, and
  utils stay outside `src/app/`.
* Before touching any Expo/EAS/React Native API, read the installed `expo` major
  version and consult the matching versioned docs — never answer from training data.
  Full procedure: `AGENTS.md` at repo root.
* TypeScript `strict` is on (`tsconfig.json`). No `any` without an adjacent comment
  naming what blocks the real type.
* `npx expo install <package>` only — never raw npm/yarn/pnpm/bun add — so native
  dependency versions stay SDK-compatible.
* Never hand-edit `ios/`/`android/` — they are Continuous Native Generation output.
  Native behaviour is configured in `app.json` / config plugins only.
* A library with native code requires a development build (`npx expo run:ios|android`
  or an EAS development profile) — it will not work in Expo Go.
* Prefer a recommended Expo module over a third-party package; a new UI or native
  dependency needs an ADR per AIF §7.4 step 5.
* Run `npx expo lint` and `npx tsc --noEmit` clean before any task is reported done.
