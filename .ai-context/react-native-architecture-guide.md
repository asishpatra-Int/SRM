# 📱 React Native Architecture Guide

**TypeScript · Expo · Layered · Package-by-Layer**

A compact, reusable blueprint for building cross-platform mobile apps with React Native and Expo. It defines where code lives, what each layer is allowed to do, and how everything is tested.

| | |
|---|---|
| **Pattern** | Layered client: Routing → Screen → Query → Service, with a separate Global State layer |
| **Framework** | React Native + Expo |
| **Navigation** | Expo Router (file-based) |
| **Server state** | TanStack React Query |
| **Global state** | Zustand (persisted) |
| **Network** | axios |
| **Forms** | React Hook Form + Zod |
| **Local storage** | react-native-mmkv, expo-secure-store |
| **Language** | TypeScript (strict mode) |
| **Testing** | Jest, React Native Testing Library, MSW, jest-expo |

---

## Contents

1. [Core Principles](#1-core-principles)
2. [Project Structure](#2-project-structure)
3. [Layer Responsibilities](#3-layer-responsibilities)
4. [Data Models & Schemas](#4-data-models--schemas)
5. [State Management](#5-state-management)
6. [Navigation](#6-navigation)
7. [Network & Auth](#7-network--auth)
8. [Environment Configuration](#8-environment-configuration)
9. [Testing](#9-testing)
10. [Naming Conventions](#10-naming-conventions)
11. [Good Practices](#11-good-practices)
12. [Anti-Patterns](#12-anti-patterns)
13. [Evolving the Architecture](#13-evolving-the-architecture)
14. [Quick Reference](#14-quick-reference)

---

## 1. Core Principles

| # | Principle | What it means |
|:-:|---|---|
| 1 | **Layered** | Route → Screen → Query hook → Service → HTTP client. Imports point downward only. |
| 2 | **Thin routes** | Route files only render a screen. No hooks, no logic. |
| 3 | **Screens orchestrate** | Form state, query hooks, navigation and store access meet in the screen's `index.tsx`. |
| 4 | **Server state ≠ client state** | Server data lives in React Query's cache; app-wide client state lives in Zustand. |
| 5 | **One HTTP client** | All outbound calls go through a single configured client with auth and refresh built in. |
| 6 | **Types everywhere** | Every request and response has a model interface; every form has a Zod schema. |
| 7 | **Package-by-layer** | Top-level folders are layers; inside them, code is grouped by feature. |

```text
┌──────────────┐     ┌───────────────┐     ┌───────────────┐     ┌────────────────┐     ┌──────────┐
│    Route     │ ──► │    Screen     │ ──► │  Query hook   │ ──► │    Service     │ ──► │  Server  │
│    app/      │     │   screens/    │ ◄── │    query/     │ ◄── │   service/     │ ◄── │          │
└──────────────┘     └───────┬───────┘     └───────────────┘     └───────┬────────┘     └──────────┘
                             │                                           │ reads token
                             ▼                                           ▼
                     ┌─────────────────────────────────────────────────────────┐
                     │                 store/   (Zustand, persisted)           │
                     └─────────────────────────────────────────────────────────┘

   ──►  calls / user actions          ◄──  typed data / loading & error flags
```

---

## 2. Project Structure

### 2.1 Main source tree

```text
project-root/
│
├── android/ · ios/                 Generated native projects — never edit by hand
├── assets/                         Images, fonts
│   └── svg/                        SVG React Native components
├── app.config.ts                   Expo config; forwards env values into `extra`
├── .env · .env.<variant>           Environment files (see §8)
│
└── src/
    ├── app/                        Expo Router routes ONLY — no logic
    │   ├── _layout.tsx             Root providers (QueryClient, Toast, theme)
    │   ├── index.tsx               Auth guard: reads store, <Redirect>s
    │   ├── (auth)/
    │   │   ├── _layout.tsx
    │   │   └── <route-name>.tsx    Renders one screen — nothing else
    │   └── (main)/
    │       ├── _layout.tsx
    │       └── <route-name>.tsx
    │
    ├── screens/
    │   └── <featureGroup>/
    │       ├── <Feature>Screen/
    │       │   ├── index.tsx       ★ orchestration: form, hooks, navigation, store
    │       │   └── components/     Screen-private, props-only sub-components
    │       │       ├── <SubComponent>.tsx
    │       │       └── index.ts
    │       └── index.ts            Barrel export
    │
    ├── components/                 Shared, stateless, cross-screen UI
    │   ├── AppButton.tsx
    │   ├── AppText.tsx
    │   ├── AppTextInput.tsx
    │   ├── LoadingView.tsx
    │   ├── ErrorView.tsx
    │   └── index.ts
    │
    ├── core/                       App-wide infrastructure
    │   ├── base/
    │   │   ├── AppBar/             App bar with configurable slots
    │   │   ├── BaseScreen/         Screen wrapper: app bar + loading overlay
    │   │   └── index.ts
    │   └── theme/                  Colors, typography, spacing
    │
    ├── schema/
    │   └── <featureGroup>/
    │       ├── <Feature>Schema.ts  Zod schema + inferred <Feature>FormValues
    │       └── index.ts
    │
    ├── query/
    │   ├── use<Feature>Query.ts    useQuery / useMutation wrappers, one per domain
    │   └── index.ts
    │
    ├── service/
    │   └── network/
    │       ├── ApiClient.ts        The single axios instance (auth header, 401 retry)
    │       ├── ApiEndpoints.ts     Every endpoint string, in one place
    │       └── api/
    │           ├── <Feature>Service.ts
    │           ├── TokenService.ts Token refresh on a SEPARATE axios instance
    │           └── index.ts
    │
    ├── store/
    │   ├── use<Concern>Store.ts    One Zustand store per concern
    │   ├── local/
    │   │   ├── LocalStorage.ts     MMKV instance + Zustand storage adapter
    │   │   ├── SecureStorage.ts    expo-secure-store adapter for tokens
    │   │   └── index.ts
    │   └── index.ts
    │
    ├── models/
    │   └── <featureGroup>/
    │       ├── <Entity>Model.ts    Domain entity shape
    │       ├── <Action>Request.ts  API request payload
    │       ├── <Action>Response.ts API response payload
    │       └── index.ts
    │
    └── utils/
        ├── Constants.ts            APP_VERSION, APP_ENVIRONMENT, …
        ├── <Concern>.ts            Pure helpers grouped by concern
        └── index.ts
```

### 2.2 Test tree

Tests **mirror the `src/` tree** under `__tests__/` (or sit beside the file as `<File>.test.ts(x)` — pick one and apply it everywhere).

```text
__tests__/                                  Jest · npm test
│
├── testutil/
│   ├── renderWithProviders.tsx             Wraps QueryClient, theme, navigation mocks
│   ├── createTestQueryClient.ts            retry: false, gcTime: 0
│   ├── server.ts                           MSW server setup
│   └── testData.ts                         Builders: aUserModel(), aBookingResponse()
│
├── fixtures/
│   └── <feature>_<case>.json               API fixtures: booking_list_success.json
│
├── service/
│   └── network/
│       ├── ApiClient.test.ts               Auth header injection, 401 → refresh → retry once
│       └── api/
│           └── <Feature>Service.test.ts    Paths, payloads, response typing (MSW)
│
├── query/
│   └── use<Feature>Query.test.ts           Renamed fields, loading/error, cache invalidation
│
├── store/
│   └── use<Concern>Store.test.ts           Actions, partialize, reset on logout
│
├── schema/
│   └── <featureGroup>/
│       └── <Feature>Schema.test.ts         Valid / invalid input, error messages
│
├── utils/
│   └── <Concern>.test.ts                   Pure helpers
│
├── components/
│   └── App<X>.test.tsx                     States, press handlers, accessibility labels
│
└── screens/
    └── <featureGroup>/
        └── <Feature>Screen.test.tsx        Loading / empty / error / content, submit, navigation

e2e/                                        Maestro or Detox flows (few, critical paths only)
```

### 2.3 Dependency rules

| From | May import | Must never import |
|---|---|---|
| `app/` | `screens/` | everything else |
| `screens/` | `query/`, `store/`, `components/`, `core/`, `schema/`, `models/`, `utils/` | `service/`, `app/` |
| `query/` | `service/`, `models/` | `screens/`, `components/`, `store/` |
| `service/` | `models/`, `store/` (auth tokens only) | `query/`, `screens/`, UI |
| `store/` | its own `store/local/` | any other `src/` layer |
| `components/`, `core/` | `utils/`, theme | `query/`, `service/`, store writes |
| `schema/` | `zod` only | any `src/` layer |
| `models/` | nothing | everything |

> **Rules of thumb**
> - Use the **same feature-group name** in every layer: `screens/booking/`, `schema/booking/`, `models/booking/`, `useBookingQuery.ts`, `BookingService.ts`.
> - Always import through the `@/*` alias; never climb more than one level with `../`.
> - Create a folder when its first file appears, never before.

> **Shared components (`components/`)**
> - Prefix with `App` (`AppButton`, `AppText`) so they don't clash with React Native's `Button` and `Text`.
> - Keep them **stateless**: props and `on…` callbacks in; no queries, no store writes.
> - Style them only through `core/theme/`, so a theme change updates the whole app.
> - A component used by one screen stays in that screen's `components/` until a second screen needs it.

---

## 3. Layer Responsibilities

| Concern | Service | Query hook | Store | Screen | Route |
|---|:---:|:---:|:---:|:---:|:---:|
| HTTP calls, endpoint selection | ✅ | | | | |
| Auth header, token refresh | ✅ (client) | | | | |
| Caching, refetch, invalidation | | ✅ | | | |
| Renaming `data` / `isLoading` / `error` | | ✅ | | | |
| App-wide persisted state (session, prefs) | | | ✅ | | |
| Form state and validation wiring | | | | ✅ | |
| Error → user-facing message | | | | ✅ | |
| Navigation, toasts | | | | ✅ | |
| Mapping a URL to a screen | | | | | ✅ |
| Drawing | | | | ✅ (via components) | |

| Layer | Never |
|---|---|
| **Route** | Calls hooks, holds JSX beyond the screen component |
| **Screen** | Calls a service or axios directly, hardcodes URLs |
| **Sub-component** | Contains business logic or fetches data |
| **Query hook** | Exports its query keys, exposes raw React Query fields |
| **Service** | Navigates, shows UI, creates its own axios instance |
| **Store** | Imports from `service/`, `query/` or UI layers |
| **Model** | Contains functions, classes or logic |

---

## 4. Data Models & Schemas

| Type | Naming | Location | Purpose |
|---|---|---|---|
| Request | `<Action>Request` | `models/<featureGroup>/` | Body sent to the API |
| Response | `<Action>Response` | `models/<featureGroup>/` | Mirrors the API contract |
| Entity | `<Entity>Model` | `models/<featureGroup>/` | Domain shape used by screens |
| Form schema | `<Feature>Schema` | `schema/<featureGroup>/` | Zod validation rules |
| Form values | `<Feature>FormValues` | `schema/<featureGroup>/` | `z.infer<typeof <Feature>Schema>` |

```text
API JSON ─► <Action>Response ─► Service ─► Query hook ─► Screen ─► components
                                                          ▲
User input ─► React Hook Form ─► <Feature>Schema (Zod) ───┘ ─► <Action>Request ─► mutation
```

- Models are **interfaces only** — no functions, no classes.
- Every API request and response has a model file; services return typed responses.
- Schemas never live inside screen folders and import nothing from other layers.
- If response shapes need cleaning (nulls, renames), do it in the service and return an `<Entity>Model`.

---

## 5. State Management

```text
┌────────────────────────────┐        ┌─────────────────────────────┐
│  Server state              │        │  Client state               │
│  TanStack React Query      │        │  Zustand                    │
│  query/ hooks              │        │  store/ use<Concern>Store   │
│  cache, refetch, retries   │        │  session, user prefs        │
└────────────────────────────┘        └──────────────┬──────────────┘
                                                     │ persist
                                     ┌───────────────┴───────────────┐
                                     │ MMKV (general)  │ SecureStore │
                                     │                 │ (tokens)    │
                                     └───────────────────────────────┘
```

- **Never copy server data into Zustand.** Read it from the query hook; React Query is its cache.
- One store per concern (`useAuthStore`, `useUserStore`, `useSettingsStore`).
- Persist with `zustand/middleware/persist`; use `partialize` to persist only what must survive restarts.
- Tokens go to **SecureStore**; MMKV is unencrypted and holds non-sensitive state only.
- Never persist passwords, secrets or PII.
- Outside React (e.g. in `ApiClient.ts`): `useXxxStore.getState().field` / `useXxxStore.setState({ … })`.
- Inside React: call the hook with a selector — `useAuthStore((s) => s.isLoggedIn)`.

---

## 6. Navigation

```text
App start → app/index.tsx
   isLoggedIn = true   →  /(main)        main screens
   isLoggedIn = false  →  /(auth)/login  auth screens
```

- File-based routes in `app/`; group folders `(auth)`, `(main)` split sections.
- The **auth guard** lives in `app/index.tsx` and redirects with `<Redirect>`.
- `router.replace()` when crossing sections (auth ↔ main) — clears the back stack.
- `router.push()` for navigation within a section.
- Pass data between screens via typed route params; pass IDs, not whole objects.
- Session expiry (refresh failed) clears the store; the guard sends the user to login.
- Services and query hooks **never** navigate.

---

## 7. Network & Auth

```text
Screen ─► use<Feature>Query ─► <Feature>Service ─► ApiClient ─► Server
                                                      │
                          request interceptor:  inject Authorization: Bearer <token>
                          response interceptor: 401 ─► TokenService.refresh()
                                                       ─► store new token
                                                       ─► retry original request ONCE
```

- `ApiClient.ts` is the **only** axios instance used by feature services.
- `baseURL` comes from config (`expoConfig.extra.apiBaseUrl`), never a literal.
- All endpoint strings live in `ApiEndpoints.ts`.
- ⚠️ **`TokenService` must use its own axios instance without the retry interceptor.** Using the main client causes an infinite 401 loop.
- If refresh fails, clear the session and let the auth guard redirect.

---

## 8. Environment Configuration

```text
.env                  Shared / secrets (gitignored)
.env.development      ENVIRONMENT=Dev,        EXPO_PUBLIC_API_BASE_URL=<dev url>
.env.production       ENVIRONMENT=Production, EXPO_PUBLIC_API_BASE_URL=<prod url>
```

- Load with a cascade (e.g. `dotenv -c <variant>`): `.env.<variant>` first, then `.env`.
- Don't rely on `NODE_ENV` to pick the variant — Expo tooling overrides it. Use an explicit `APP_VARIANT`.
- Values flow `.env.*` → `app.config.ts` → `extra.*` → `utils/Constants.ts` / `ApiClient.ts`.
- `APP_VARIANT` drives the native app id and name in `app.config.ts`.
- Commit variant files without secrets; keep secrets in the gitignored `.env` or the build service.

---

## 9. Testing

### 9.1 Test pyramid

```text
               ▲   E2E flows          few     e2e/                 critical journeys
              ╱ ╲
             ╱   ╲  Screen tests      some    __tests__/screens/
            ╱     ╲
           ╱       ╲  Hook & store     many    __tests__/query/, store/
          ╱         ╲
         ╱___________╲ Service, schema, utils  MOST  __tests__/service/, schema/, utils/
```

### 9.2 What to verify

| Target | Verify |
|---|---|
| **ApiClient** | Bearer header injected; 401 triggers one refresh and one retry; refresh failure clears session |
| **Service** | Correct endpoint and method, payload shape, typed response (MSW fixtures) |
| **Query hook** | Renamed fields, loading → success / error, invalidation after mutations |
| **Store** | Actions update state, `partialize` persists only the allowed keys, logout resets |
| **Schema** | Accepts valid input, rejects each invalid case with the right message |
| **Component** | Renders each visual state, fires callbacks, has accessibility labels |
| **Screen** | Loading / empty / error / content; submit calls the mutation; navigation fires |

### 9.3 Workflow (TDD)

| Step | Action |
|---|---|
| 🔴 **Red** | Write a failing test for the rule (schema, service or hook) |
| 🟢 **Green** | Write the minimum code to pass |
| 🔵 **Refactor** | Clean up while tests stay green |
| 🔁 **Repeat** | Move up: hook → screen |

> **Testing rules:** one behavior per test · tests are independent · mock the network with MSW, not axios internals · fresh `QueryClient` per test with retries off · use fake timers, never real delays.

---

## 10. Naming Conventions

### 10.1 Files and folders

| Item | Case / pattern | Example |
|---|---|---|
| Route file | kebab-case | `booking-details.tsx` |
| Route group | `(kebab-case)` | `(main)` |
| Feature group folder | camelCase | `screens/booking/` |
| Screen folder | PascalCase + `Screen` | `BookingListScreen/` |
| Component | PascalCase; shared ones `App<X>` | `AppButton.tsx` |
| Schema | `<Feature>Schema.ts` | `LoginSchema.ts` |
| Model | `<Entity>Model` / `<Action>Request` / `<Action>Response` | `BookingModel.ts` |
| Service | `<Feature>Service.ts` | `BookingService.ts` |
| Query hook | `use<Feature>Query.ts` | `useBookingQuery.ts` |
| Store | `use<Concern>Store.ts` | `useAuthStore.ts` |
| Utility | PascalCase by concern | `DateUtils.ts` |

### 10.2 Code

| Item | Convention | Example |
|---|---|---|
| Interfaces | PascalCase | `BookingModel` |
| Zod schema / inferred type | `<X>Schema` / `<X>FormValues` | `LoginSchema`, `LoginFormValues` |
| Exported constants | SCREAMING_SNAKE_CASE | `APP_VERSION` |
| Hook return fields | prefixed with query name | `bookingsData`, `isBookingsLoading`, `bookingsError` |
| Mutation function | `call<Action>` | `callCreateBooking` |
| Service functions | verb + noun | `getBookings`, `createBooking` |
| Component callbacks | `on<Event>` | `onBookingPress` |
| Booleans | `is` / `has` / `can` / `should` | `isLoggedIn` |

### 10.3 Tests

| Item | Pattern | Example |
|---|---|---|
| Test file | `<FileUnderTest>.test.ts(x)` | `useBookingQuery.test.ts` |
| Test name | `it('<action> when <condition> <result>')` | `it('retries once when the token refresh succeeds')` |
| Test data builder | `a<Model>()` | `aBookingModel({ status: 'CONFIRMED' })` |
| Fixture | `<feature>_<case>.json` | `booking_list_success.json` |

### 10.4 Import order (ESLint-enforced)

1. `react`, `react-native`
2. External packages
3. Internal `@/*` aliases
4. Parent `../` and sibling `./`

---

## 11. Good Practices

### TypeScript
- `strict: true`; no `any`, no non-null `!` without a reason.
- Prefer `type`-safe unions and `as const` over raw strings.
- Infer form types from Zod; never hand-write a duplicate type.

### React & hooks
- Keep components small; lift state only as far as needed.
- Memoize list items and callbacks passed into lists; use stable `keyExtractor`s.
- Side effects only in `useEffect` / event handlers; clean up subscriptions.

### React Query
- Query keys stay private to the hook file.
- Invalidate related queries after mutations rather than updating them by hand.
- Set sensible `staleTime`; disable retries for 4xx errors.

### Zustand
- Select the smallest slice you need to avoid re-renders.
- Keep actions inside the store; components don't `setState` directly.

### Forms
- React Hook Form + `zodResolver`; one schema per form.
- Show field errors from the schema; disable submit while a mutation is pending.

### Network
- One client with timeouts; logging in development only.
- Never log tokens or personal data; retry only idempotent calls.

### Security
- Tokens in SecureStore; nothing sensitive in MMKV or AsyncStorage.
- No secrets in committed env files or the JS bundle (`EXPO_PUBLIC_*` is public).
- Clear stores and query cache on logout.

### Performance
- `FlashList` / `FlatList` for long lists; paginate large data.
- Cache and size images; avoid inline anonymous components in render.
- Profile before optimizing.

### Workflow
- CI runs typecheck, lint and tests on every PR.
- Keep PRs small; review layer violations first; record decisions as ADRs.

---

## 12. Anti-Patterns

| ❌ Don't | ✅ Do instead |
|---|---|
| Put hooks or logic in route files | Render the screen and nothing else |
| Call a service or axios from a screen | Go through a `query/` hook |
| Use the main client in the token refresh | Give `TokenService` its own axios instance |
| Hardcode URLs | `ApiEndpoints.ts` + env-driven `baseURL` |
| Copy server data into Zustand | Read it from React Query |
| Store tokens in MMKV / AsyncStorage | Use SecureStore |
| Persist passwords, secrets or PII | Persist tokens and preferences only |
| Expose raw `data` / `isLoading` from hooks | Rename with the query's prefix |
| Export query keys | Keep them inside the hook file |
| Put Zod schemas in screen folders | `schema/<featureGroup>/` |
| Add functions to `models/` | Interfaces only; logic goes to `utils/` or the service |
| Business logic in sub-components | Keep it in the screen's `index.tsx` |
| `../../../` imports | `@/*` alias |
| Mixed naming within a folder | Follow the naming table |
| Edit `android/` or `ios/` by hand | Change `app.config.ts` / config plugins and prebuild |
| Scaffold empty folders | Create folders with their first file |

---

## 13. Evolving the Architecture

Keep the structure simple until one of these signals appears:

| Signal | Action |
|---|---|
| A screen's `index.tsx` grows past ~300 lines | Extract a screen-local hook (`use<Feature>Screen.ts`) for orchestration |
| Same logic duplicated across screens | Move it to a shared hook or `utils/` |
| A service file covers several domains | Split into one service per domain |
| Response shapes leak awkward API quirks | Add mapper functions in the service layer, return `<Entity>Model` |
| A flow spans several services | Add a dedicated orchestration hook in `query/` for that flow only |
| `components/` passes ~15 files | Group by type: `components/button/`, `components/input/` |
| Slow builds or team collisions | Split into workspace packages: `app`, `ui`, `api` |

---

## 14. Quick Reference

```text
SOURCE                                         TESTS
app/          Routes only, auth guard          e2e/                      critical flows
screens/      <Feature>Screen orchestration    __tests__/screens/        <Feature>Screen.test.tsx
components/   App<X> shared UI                 __tests__/components/     App<X>.test.tsx
core/         AppBar, BaseScreen, theme
query/        use<Feature>Query                __tests__/query/          use<Feature>Query.test.ts
service/      ApiClient, Endpoints, Services   __tests__/service/        ApiClient / <Feature>Service tests
store/        use<Concern>Store, local/        __tests__/store/          use<Concern>Store.test.ts
schema/       <Feature>Schema + FormValues     __tests__/schema/         <Feature>Schema.test.ts
models/       Model / Request / Response
utils/        Constants, helpers               __tests__/utils/          <Concern>.test.ts
                                               __tests__/testutil/ · fixtures/
```

**Adding a feature:** models → endpoints → service → query hook → schema (if form) → screen → route.

- **Layers:** Route → Screen → Query → Service → Client, one direction only.
- **Ownership:** Service = data access · Query = caching · Store = app state · Screen = orchestration · Components = drawing.
- **State:** server data in React Query, client state in Zustand, tokens in SecureStore.
- **Network:** one client; refresh on a separate instance; URLs from config.
- **Tests:** mirror the tree; services, schemas and hooks carry the most weight.
- **Growth:** evolve only when a real signal appears.
