# Task Implementation — Green Phase

**Requires:** In Development, and the target task's tests confirmed Red.
**Writes:** task → In Review.

**Inputs:** exactly one task ID, e.g. `2fa-otp-login.T03`.

**Steps:**
1. Read the task, its parent spec's referenced ACs, and the plan's approach section.
2. Read the files the task names — **and their callers** — before editing. Trace the
   real flow. A minimal diff in the wrong place is a second bug.
3. Implement only that task. Do not touch tasks marked In Review or Merged.
4. Make the Red tests green. Do not edit a test to fit the implementation. If a test
   is wrong, that means the spec is wrong — stop and say so.
5. Self-check against each AC ID the task claims, and state the result per AC.
6. Stop. One task, then review, then commit. Do not continue to the next task.

**What the agent gets wrong, and the engineer therefore owns (§18):**
* **Boundary and failure paths.** Agents nail the happy path. Null/undefined edge
  cases, partial-failure states, and error handling get skipped unless an AC forces
  them.
* **Performance characteristics invisible to a unit test.** N+1 queries, missing
  indexes, a synchronous call in a hot path. Agents optimize for "passes the test," not
  "performs at production load."
* **Consistency with existing codebase patterns.** `architecture.md` alone does not
  guarantee it; this needs a human eye.

**Output contract:**
* The diff.
* Per-AC self-check result.
* The test run, green.
* Anything you noticed but did not fix, as a list — not as extra edits.

**Stop condition:** if the spec is ambiguous or the plan does not survive contact with
the code, stop and report. Do not re-prompt yourself against the same ambiguity — that
is vibe coding with extra steps. And do not widen the spec to match what you already
wrote; that turns the artefact chain into fiction.
