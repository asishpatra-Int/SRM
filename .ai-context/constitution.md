# Project Constitution — SRM Community App

_Scaffolded by `/aif-init` on 2026-10-09. Owner: TBD — owner decision. Amendments go
through the same review rigor as a spec (SDD_BluePrint_v1.0 §8)._

## Testing Discipline

- Test-first is mandatory for every acceptance criterion and every state-changing
  operation (practice session logging, subscription state, community posts); no
  exceptions for "simple" screens.
- Framework: TBD — owner decision. No test runner is installed yet (no Jest/RNTL in
  `package.json`). Recommended default per Expo guidance: Jest + React Native Testing
  Library — confirm before the first spec with testable UI logic.
- Coverage floor: TBD — owner decision.

## Security Posture

- No PII appears in logs at ANY log level, including debug. For this app PII includes,
  at minimum: name, email/phone, payment/subscription identifiers, and any
  practice-activity data that could identify health or spiritual-practice habits of a
  specific user.
- Premium subscriptions: payment instrument data is never stored or logged directly by
  this app — handled only via a PCI-compliant provider's tokenized flow. Provider: TBD
  — owner decision (e.g. RevenueCat, Stripe, App Store/Play Billing).
- Offline activity tracking: data captured offline and synced later must not leak a
  user's data to another user's device/session on shared devices. Sync conflict
  resolution rule: TBD — owner decision.
- Secrets (API keys, provider credentials) come from EAS Secrets / environment config,
  never committed to the repo, never in `app.json` plaintext, never in a log line.
- Community engagement features (posts, profiles, comments) require a moderation and
  reporting path before shipping to production. Specifics: TBD — owner decision.

## Architectural Constraints

- Mobile client: Expo SDK 57 (managed workflow / Continuous Native Generation), React
  Native 0.86, React 19, TypeScript `strict`, Expo Router for navigation. No committed
  `ios/`/`android/` directories — native config lives in `app.json` / config plugins
  only (see `.agent/rules/standards.expo.md`).
- No new native dependency without first checking Expo's recommended modules; a new
  native or UI dependency requires an ADR (AIF §7.4 step 5).
- Backend / API surface: TBD — owner decision. Not yet chosen; no API client or backend
  SDK is present in `package.json` as of this scaffold.
- Admin portal (web) is explicitly a separate system/repo from this mobile app per the
  Step 1 bootstrap answers — any shared contract between them (auth, content schema,
  subscription state) needs an explicit API Contract in the relevant spec(s), not an
  assumed shared database.
- Offline-first data layer (local storage/sync engine for activity tracking): TBD —
  owner decision.

## Non-Functional Baselines

- Latency, availability, and offline-sync SLAs: TBD — owner decision (no backend chosen
  yet to measure against).
- Target platforms (iOS/Android minimum OS versions, web support via `react-native-web`
  if any customer-facing): TBD — owner decision.

## Versioning Rules

- App release cadence and store-submission process: TBD — owner decision (EAS Build /
  Submit is available per `AGENTS.md` but no `eas.json` exists yet).
- Public API versioning (once a backend exists): TBD — owner decision.
