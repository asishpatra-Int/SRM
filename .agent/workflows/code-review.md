# Code Review — Gate 2

**Requires:** task In Review. **Writes:** task → Merged; last task merged → spec In QA.

Act as a senior technical lead. Do not rewrite the file. Report under these headers,
most severe first, skipping any header with no findings — an empty section is noise.

## 1. Acceptance Criteria — by ID
Verify each AC the task claims, individually, against the diff. Not "looks reasonable."
State the AC ID and the evidence. An AC you cannot verify from the diff is a finding.

## 2. Scope
Does the change do anything the spec did not authorize? Did it scope-creep into what
the plan explicitly deferred? Unrequested scope is a finding regardless of quality.

## 3. Security — the checklist, not a vibe
- [ ] No PII in logs at any level
- [ ] No secrets, credentials, or tokens hardcoded or logged
- [ ] Every new or changed endpoint has an explicit rate-limit decision
- [ ] New dependencies vetted — maintained, real, approved — before entering the
      manifest
- [ ] Auth boundaries and least-privilege IAM checked, not assumed
- [ ] Data-at-rest and in-transit handling matches constitution.md
- [ ] SAST/DAST and dependency scan clean, or exceptions explicitly signed off

## 4. Correctness & Reliability
Edge cases, null/undefined paths, race conditions, partial-failure handling, retry and
idempotency, unhandled rejections.

## 5. Performance
Event-loop blocking, N+1 queries, unbounded result sets, missing index, avoidable
allocation in a hot path.

## 6. Test Integrity
Were the tests written first and confirmed Red, or retrofitted? Retrofitted tests are a
Gate 2 finding, not a style note.

## 7. Maintainability
Over-complex functions, tight coupling, duplication, speculative abstraction, naming.

## 8. Currency
`architecture.md` and ADRs updated if the change warrants it. `test_cases/<slug>` and
the spec Status updated. `status.md` updated same day.

**Per finding:** `path:line — severity — what is wrong — the fix.`
Then supply isolated snippets for critical findings only. Skip formatting nits that do
not change meaning.

**"The AI wrote it" is never a valid response to a finding.** The engineer who ran the
agent owns the diff.
