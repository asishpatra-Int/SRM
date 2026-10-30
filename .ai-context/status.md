# Project Status Board

_Last updated: 2026-10-30_

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
- **Off-process exception (continued):** extended the Kriya UI prototype — same
  explicit no-spec bypass as the landing screen above, still mock-data/no-backend.
  Added: tapping either practice card on the Kriya landing screen opens a "Get Ready"
  bottom sheet (Figma node 757:4242) via a new reusable `core/base/BottomSheet`
  (Reanimated-driven fade+slide, `Modal` for backdrop/back-button handling, no new
  dependency); its "Next" CTA navigates to a new full-screen session/player route
  `src/app/session/[practiceId].tsx` → `screens/kriya/KriyaSessionScreen` (Figma node
  757:4054), styled off a shared `components/GradientImageBackground` (extracted from
  `GlowBackground` once a second screen needed the same image+gradient pattern).
  Practice-session mock data moved from `KriyaLandingScreen/mockData.ts` up to
  `screens/kriya/mockData.ts` so both screens in the feature group can read it
  (`getPracticeSessionById`). No new dependencies added. `tsc --noEmit`, `eslint .`,
  `prettier --check`, and an `expo start --web` bundle smoke test (including the new
  dynamic route) are all clean.

### 2026-10-15

- **Off-process exception (continued):** implemented the Practice screen's content
  details page (Figma node 1589:4018) — same explicit no-spec bypass as the Kriya
  prototype work above, still mock-data/no-backend, UI-only. Tapping a track card on
  the Practice screen (`screens/practice/PracticeScreen`) now pushes a new dynamic
  route `src/app/content/[contentId].tsx` → `screens/practice/
  PracticeContentDetailsScreen` (back chevron, title/meta/thumbnail row, a "30 Min"
  playback pill with download/bookmark actions, description copy, and a "Listening
  ritual" guidance card), reusing the Practice tab's existing hero background/colour
  tokens and the download/bookmark icons already used by `TrackListItem`. Extended
  `screens/practice/mockData.ts` with per-track `description` and `pillDurationLabel`
  fields plus a shared `MOCK_LISTENING_RITUAL` list and a `getPracticeTrackById`
  lookup (mirrors `getPracticeSessionById` in the Kriya feature group). Added new SVG
  icon assets (`ChevronLeftIcon`, `PlayTriangleIcon`, `ContentProgressBarIcon`,
  `LeafIcon`, `MusicIcon`, `SparklesIcon`) downloaded from the Figma frame; reused
  existing `DownloadIcon`/`BookmarkOutlineIcon` rather than downloading duplicates
  once comparing their paths confirmed they were the same icons at a different
  export size. No new dependencies added, no backend/business logic. Verified via
  `expo export --platform web` (bundles the new route) and by deep-linking into a
  running Expo Go session on an iOS Simulator — both `exp://.../--/practice` and
  `exp://.../--/content/<id>` — and screenshotting each; screens match the Figma
  reference with per-track mock data substituted correctly (thumbnail, title,
  genre/duration all vary per the tapped track's id). Did not confirm the actual
  tap gesture on the card (no idb/UI-automation tool available in this environment
  to drive a touch on the simulator); the `onPress` wiring itself is a single-line
  `router.push` call, the same pattern already used and working elsewhere in this
  codebase (`KriyaLandingScreen` → session screen, `KriyaSessionScreen` → mood
  screen). `tsc --noEmit`, `eslint .`, and `prettier --check` (scoped to the
  touched files) are all clean.

- **Off-process exception (continued):** implemented the Bookmarks (Figma node
  1589:4590) and Downloads (node 1589:4801) screens — same bypass as above,
  mock-data/no-backend, UI-only. Both are new top-level stack routes
  (`src/app/bookmarks.tsx`, `src/app/downloads.tsx`) wired from the two
  previously-unwired icon buttons already sitting in `PracticeHeader`
  (`onBookmarksPress`/`onDownloadsPress` — now `router.push("/bookmarks")` /
  `"/downloads"`). Added `screens/practice/mockData.ts: isBookmarked` plus
  `getBookmarkedTracks()`/`getDownloadedTracks()` filters (mirrors
  `getPracticeTrackById`); Downloads filters `isDownloaded`, which was already
  true only for the forest-path track, so that screen shows exactly the one
  item the Figma frame shows.
  Since both frames need the same back button, hero background, search field,
  and track-card pattern as a 3rd/4th consumer, promoted
  `PracticeContentDetailsScreen`'s local `ContentBackButton` up to a new shared
  `screens/practice/components/` folder (mirrors the existing
  `screens/kriya/components/` precedent) as `PracticeBackButton`, and added
  `PracticeHeroBackground` (same hero image/gradient/glow as
  `PracticeBackground`/`ContentDetailsBackground`), `SavedTracksSearchField`
  (the search pill minus `PracticeSearchRow`'s filter button — neither frame
  has one), `SavedTracksHeader`, and `SavedTrackCard` (same content as
  `TrackListItem` but trailing a white play-circle button instead of a bare
  triangle) there. `PracticeScreen`, `TrackListItem`, and `PracticeSearchRow`
  were not otherwise touched. New SVG asset: `PlayCircleIcon` (Figma's
  "Group 890") — the two download/bookmark/check icons it also needed were
  already in `assets/svg/` (confirmed by diffing the Figma export's SVG paths
  against the existing files before reusing them). No new dependencies, no
  backend/business logic. Verified via `expo export --platform web` (bundles
  both new routes) and by deep-linking into Expo Go on an iOS Simulator;
  screenshots match both Figma frames. `tsc --noEmit`, `eslint .`, and
  `prettier --check` are all clean.

- **Off-process exception (continued):** reworked `core/base/AppTabBar`'s
  selected-tab styling on user request — was a discrete icon-size swap
  (17×23 active / 22×22 inactive, warping each icon's own aspect ratio) with
  Kriya's flower permanently gold (baked into `KriyaTabIcon.svg`) regardless
  of selection. Now every tab (Kriya included) renders at one fixed,
  aspect-correct size always, and only the color + the existing rounded
  highlight pill change on selection: white when inactive, the brand gold
  (`colors.accentGold`) when active — a plain conditional style, no
  Animated/Reanimated involved either before or after. To make the four tab
  icons colorable at all, changed `KriyaTabIcon.svg`/`PracticeTabIcon.svg`/
  `ExploreTabIcon.svg`/`ProfileTabIcon.svg`'s baked `fill` to `currentColor`
  and pass a `color` prop from `TabBarButton` (react-native-svg's standard
  tinting mechanism) — confirmed this must be exercised with a real tap
  (`cliclick` on the booted iOS Simulator window, calibrated against a
  `simctl io screenshot`), not a deep link: opening an `exp://.../--/<tab>`
  URL renders that tab's screen content fine but does not drive the Tabs
  component's own focused-tab bookkeeping the way an actual TabTrigger press
  does, so the tab bar's own highlighting can't be verified that way. Briefly
  considered (per user messages mid-session) giving Kriya a permanent-white
  exception; confirmed via `AskUserQuestion` that Kriya should stay uniform
  with the other three tabs instead, so no per-tab override exists in the
  final code. No new dependencies, no backend logic. `tsc --noEmit`,
  `eslint .` clean; verified visually with real taps on the Kriya and
  Practice tab buttons in Expo Go on an iOS Simulator.

- **Off-process exception (continued):** fixed the mood/feeling check-in
  slider (`screens/kriya/components/MoodSlider.tsx`, shared by
  `KriyaMoodScreen` and `KriyaFeelingScreen`) on user request — it previously
  rendered the thumb at a fixed `left: {ratio}%` with no touch handling at
  all (not draggable, not tappable), and that positioning let the thumb's own
  half-width overhang past the track edges at ratio 0/1. Rewrote it with
  `react-native-gesture-handler`'s `Gesture.Pan()` + `react-native-reanimated`
  shared values (both already project dependencies, already used elsewhere —
  no new ones added): a single Pan gesture (`minDistance(0)`) reads each
  touch's absolute `event.x` so one code path covers both tapping anywhere on
  the track and dragging, clamps the thumb's pixel position every frame to
  `[0, trackWidth - THUMB_SIZE]` (accounts for the thumb's own radius, so it
  always stays fully inside the track), and only reports the committed ratio
  back to JS via `scheduleOnRN` (reanimated 4's replacement for the now
  `@deprecated` `runOnJS`). `MoodSlider` changed from a controlled
  `valueRatio` prop to an uncontrolled `initialValueRatio` +
  `onValueChange(ratio)` — it now owns the live drag position itself instead
  of round-tripping every touch frame through the parent's React state, so
  `KriyaMoodScreen`/`KriyaFeelingScreen` each just keep a `useState` to retain
  the latest value (nothing downstream reads it yet — mock data, no backend).
  Also added `GestureHandlerRootView` to `src/app/_layout.tsx` (required by
  `GestureDetector`, wasn't set up anywhere in the app before) and memoized
  the `Gesture.Pan()` builder with `useMemo` — building a fresh one on every
  render (which happens on every `onValueChange` during a drag unless
  memoized) left the native gesture handler in a state where a *second* drag
  after the first one completed silently failed to activate; this was by far
  the trickiest bug and only surfaced through actual on-device touch testing,
  not code review. Verified via real drags on a booted iOS Simulator
  (`cliclick`, screen coordinates derived from analyzing `simctl io
  screenshot` pixels rather than guessed): confirmed correct centered initial
  position and the right-boundary clamp holding with zero overshoot even when
  the drag gesture continued past the track's edge. Note for future sessions
  testing touch gestures in this environment: the Simulator window's
  reported AppleScript position/size excludes its title bar, and this
  sandbox's foreground app silently reverts to another window (observed:
  Chrome) between shell commands, so re-`activate` Simulator and reconfirm
  frontmost status immediately before every `cliclick`, and expect to
  recalibrate coordinates (e.g. by self-calibrating off a known UI element's
  measured on-screen position, not the window frame) after any simulator
  restart. `tsc --noEmit`, `eslint .`, `prettier --check` clean.

- **Off-process exception (continued):** on user request, made
  `KriyaImproveScreen` scrollable (`ScrollView` inside a
  `KeyboardAvoidingView`, `behavior: "padding"` on iOS / `"height"` on
  Android) so the note `TextInput` and the "Next" button stay reachable once
  the keyboard is up, instead of being statically laid out with no way to
  scroll past the keyboard. Also changed `NoteInput`'s "Note:" from the
  `TextInput`'s `placeholder` (which disappears the moment the user types,
  and — per the user's report — reads as lower-contrast than the screen's
  other solid-white labels even at the same explicit color, sitting as it
  does on the lighter blurred glass panel) to a persistent `Text` label above
  the input, styled with the same `typography.noteLabel` + `colors.textPrimary`
  already used for the typed text itself. `tsc --noEmit`, `eslint .`,
  `prettier --check` clean; visually confirmed the screen's layout is
  otherwise unchanged via a fresh Expo Go relaunch on the iOS Simulator
  (did not confirm the keyboard-avoidance itself live, for the same
  touch-testing environment reasons noted above — focusing the TextInput
  needs a real tap).

### 2026-10-28

- **Off-process exception (continued):** implemented the app-launch auth flow
  on explicit user request — Splash animation (Figma 1577:261 → 285 → 311,
  one screen, three stages) → Onboarding (1580:820) → Login (1580:882) → OTP
  (1580:971) → existing Kriya home tabs. Same no-spec bypass as above:
  UI-only, mock data, no backend/auth/OTP services. New
  `screens/auth/{SplashAnimation,Onboarding,Login,OtpVerification}Screen`,
  shared `screens/auth/components` (`AuthBackground`, `AuthFormHeader`,
  `GlassInputSurface`), `screens/auth/mockData.ts`, and an `(auth)` route
  group (`splash`, `onboarding`, `login`, `otp-verification`). Root
  `_layout.tsx` now gates `(tabs)` and `(auth)` with `Stack.Protected` on a
  new in-memory `store/useAuthStore` (`useSyncExternalStore`, Zustand-shaped
  selector API; Zustand is not installed and adding it needs an ADR). Signing
  in (mock OTP verify, or the mock Google/Apple buttons) flips the guard, so
  the router drops the auth stack and lands on the existing home. Splash uses
  `router.replace` and a run-once guard, so it can't replay via back.
  Mock rules: 10-digit number required, any complete 5-digit OTP passes, the
  resend countdown is 59s. `AppButton` gained optional `isDisabled`/`isLoading` props
  (existing callers unchanged). Figma exposes no prototype/motion data for
  the splash frames (`get_motion_context` returned empty), so timing is
  inferred: 0.6s hold, portrait + purple glow rise in (0.9s), "Welcome to
  SRM" fades in (0.7s), 1.3s hold, then a fade to onboarding. Reused existing
  assets where Figma's export was byte-identical (`explore-blog-aum-bg.png`,
  `kriya-card-bg.png`) or the same glow (`GlowBlobLarge.png`); new
  `GlowBlobSplash.png` is Figma's blurred "Ellipse 17" baked to PNG (same
  technique as the Kriya glows). Verified end-to-end in Expo Go on an Android
  emulator with real taps: splash stages, onboarding → login, validation
  error, Send OTP → OTP, Verify validation, countdown → Resend, Verify → home,
  Google sign-in → home, Explore tab, and hardware back from home exits rather
  than returning to auth. iOS was not run (no simulator on this Windows host).
  `tsc --noEmit` clean; `eslint` and `prettier --check` clean on the touched files
  (the repo-wide CRLF `prettier/prettier` noise is pre-existing).
  Follow-up not done: the native `expo-splash-screen` config in `app.json`
  is still the template blue (#208AEF), which flashes before the JS splash
  in a dev/production build.

### 2026-10-29

- **Off-process exception (continued):** guest mode and auth-entry fixes (ad-hoc
  bug-fix request, no spec). `useAuthStore` gained `isGuest`/`enterGuestMode()`;
  `logIn`/`logOut` clear it. Onboarding: "Start Exploring" now enters guest mode
  (no login/OTP) and a new outlined "Login" button (`AppButton` gained a
  `variant="secondary"`) pushes `/login`. Root layout opens `(tabs)` to guests
  and replaces to `/explore` from an effect. Navigating from the press handler
  raced React Navigation's route-name ref, which updates in an effect, so the
  guard was still closed. `(tabs)/_layout` drops the Kriya and Profile triggers
  for guests, so those routes leave the navigator rather than only the bar.
  `AppTabBar` shows Sign Up (Profile icon, `button` role, never active) in
  Profile's slot, and it pushes `/login`. Login: "Sign in with Apple" renders
  on iOS only. Guest tab order keeps the existing relative order: Practice,
  Explore, Sign Up. The Login button style follows existing design tokens;
  Figma was not checked (the connector isn't authenticated). Verified in Expo
  Go on the Android emulator with real taps: Start Exploring → Explore active,
  bar shows Practice/Explore/Sign Up only; Practice works; Sign Up → Login (no
  Apple button) → back returns to tabs; Sign Up → OTP → all four tabs incl.
  Kriya/Profile; back from home exits; cold start → Login → back → onboarding;
  Login → Google → Kriya home; guest back from Explore exits. iOS not run.
  `tsc --noEmit` clean; Prettier clean on touched files. ESLint reports only
  the existing CRLF `prettier/prettier` noise.

### 2026-10-30

- **Off-process exception (continued):** Profile, Certificates, Subscription
  and Payment Done screens (Figma 1671:1324, 1643:12940, 1643:13304,
  1640:12188, plus the language popover 1640:12245 and the certificate
  preview 1640:12255), on explicit user request. No spec exists: UI only,
  mock data, no payment gateway and no backend. Feature group `profile`:
  `screens/profile/{Profile,Certificates,Subscription,PaymentSuccess}Screen`,
  `models/profile` (purchase request/response), mock
  `ProfileService.purchaseSubscription`, `useProfileQuery`, and routes
  `/certificates`, `/subscription`, `/payment-success`. Flow: Profile →
  certificates heading/cards → Certificates → card or eye → preview modal;
  Profile → Subscription row → Pay Now (mock 600ms purchase) → replace to
  Payment Done → Back to Home (`router.dismissTo("/")`). Profile content
  follows the dummy user type (`getMockProfile`). Only SK users get the
  program chips and the My Kriya streak. A null (social) user gets the
  Free profile. Reuses the Explore `ExploreBackground`, `EventCard`,
  `SectionHeading` and `getEventById` across feature groups. Image assets
  that are byte-identical to the Figma exports are reused. New assets are
  `profile-certificate-sample.png` and `assets/svg/profile/*`. `AppButton`
  gained `variant="light"`; existing callers are unchanged. Inert by design (no
  destination yet): Account Settings, Help & Support, certificate download,
  I Want to Pay Offline, Need Help with Payment. Language selection is
  screen-local state only (no i18n). Payment Done's Lottie slot is kept as
  empty space (blank preview frame, Lottie not installed). `tsc --noEmit`
  is clean. ESLint and Prettier are clean on the touched files, apart from
  the existing resolver/CRLF noise. The Android `expo export` bundles. Not
  verified on a device: Expo Go download failed on the network's TLS
  interception. The web static export fails on the existing `bookmarks`
  route, which is out of scope.
