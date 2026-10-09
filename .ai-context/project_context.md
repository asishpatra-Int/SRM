# Project Context — SRM Community App

**One-page orientation. What you'd hand a new hire, or a fresh agent session, before
anything else.**

## Objective

The SRM Community mobile application provides a unified digital platform for:
- Spiritual content delivery
- SwaRaj Kriya practice guidance
- Offline activity tracking (practice sessions logged without requiring connectivity)
- Premium subscriptions
- Community engagement

...for the Retail Dept's SRM initiative, via a mobile app and a web-based admin
portal. **This repository covers the mobile app only** — the admin portal is a
separate system (repo/stack TBD, not inferred).

## Stack

- Expo SDK 57 (managed workflow), React Native 0.86.3, React 19.2.3
- TypeScript (`strict`), Expo Router (file-based routing, `src/app/`)
- No backend/API, state-management library, or test framework chosen yet — this is an
  early-stage scaffold (two files under `src/app/`: root layout + index screen).

## Agent Tools In Use

Claude Code, Cursor, Antigravity. Tool adapters generated under AIF §6:
`CLAUDE.md`, `.cursor/rules/aif.mdc`; Antigravity reads `.agent/` natively.

Note: `AGENTS.md` at repo root predates this AIF bootstrap (maintained by the
`expo@claude-plugins-official` Claude Code plugin) and remains the source of truth for
Expo-SDK-version-specific doc-fetching instructions. `.agent/rules/standards.expo.md`
adds the engineering-conventions layer on top of it rather than duplicating it.

## Stakeholders

- Sponsor / decision owner: TBD — owner decision (not yet named in discovery).
- Gate 1 reviewer pool, Security/Architecture sign-off owner: TBD — owner decision.

## Where To Look

- Non-negotiables: `.ai-context/constitution.md` (mostly `TBD` — this is a greenfield
  scaffold; fill in as decisions land).
- Requirements ledger: `.ai-context/BRD.md`.
- What's in flight: `.ai-context/status.md`.
- Living architecture: `.ai-context/architecture.md`.
