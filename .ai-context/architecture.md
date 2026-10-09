# Architecture — SRM Community App

_Living document. If this contradicts the code you are reading, stop and report it —
a stale architecture doc misleads every session after this one (AIF §agent-conduct.4)._

## Current State (as observed, 2026-10-09)

This is an early-stage Expo/React Native scaffold, not yet a built system. Observed
directly from the repo:

- **Navigation:** Expo Router, file-based, rooted at `src/app/`.
  - `src/app/_layout.tsx` — root layout, renders a bare `<Stack />`.
  - `src/app/index.tsx` — single placeholder screen.
- **Config:** `app.json` — Expo app name/slug `SRM`, scheme `srm`, `expo-router` and
  `expo-splash-screen` plugins, `typedRoutes` and `reactCompiler` experiments enabled.
- **TypeScript:** `strict: true`, path aliases `@/*` → `src/*`, `@/assets/*` →
  `assets/*` (`tsconfig.json`).
- **No native projects committed** (`ios/`, `android/` gitignored — CNG-managed).
- **No backend, API client, state-management library, auth, or persistence layer
  present yet.**
- **No test framework installed yet.**

## Integrations

None yet. TBD as specs are written for content delivery, practice tracking sync,
subscriptions, and community features.

## Data Model

None yet — no datastore chosen. To be defined per-feature in each spec's/plan's Data
Model sections as the artefact chain produces them; this section rolls up what lands
in production, not what a plan proposes.

## Decisions In Force

None recorded yet. See `.ai-context/decisions/` for ADRs as they're written.

## Admin Portal Boundary

The web-based admin portal referenced in the project objective is **out of scope for
this repository** per the `/aif-init` Step 1 answers. Any integration surface between
this mobile app and the admin portal (shared auth, content schema, subscription state)
must be captured as an explicit API Contract in the spec that introduces it — do not
assume a shared database or implicit coupling.
