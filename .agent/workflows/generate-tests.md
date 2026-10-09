# Test Generation — Red Phase

**Requires:** Tasks Generated. **Writes:** In Development, tests confirmed Red.

**This runs BEFORE implementation. That ordering is the point, not a preference.**
Tests written after the code confirm the bug as readily as they catch it — they inherit
whatever the implementation assumed. Tests written from the spec catch
wrong-behaviour-by-design, which is the failure mode agents produce most often and
reviewers spot least.

**Steps:**
1. Start from the spec's UT table. Those IDs (`<slug>.UT01`) carry through unchanged.
2. Expand into `.ai-context/test_cases/<slug>.test_cases.md` — the QA-owned superset:
   same IDs, more coverage. Data variations, negative paths the AC did not spell out,
   boundary values.
3. Cross-feature and full-journey scenarios go in `test_cases/_integration.md`, not in
   the per-feature file.
4. Implement the tests under `tests/`.
5. Cover: happy path, each stated failure mode, boundary values, and the
   null/empty/malformed input case for every trust boundary.
6. Mock external dependencies — database, third-party APIs, filesystem, clock,
   randomness. A test depending on real time or real network is not a unit test.
7. Assert the specific error or value, never merely that something threw.
8. **Run the suite and confirm the new tests fail.** A test that passes before the
   implementation exists is testing nothing. Report any that pass — that is a finding,
   not a convenience.

**Output contract:** the test files, the confirmed-Red run output, and an AC→UT
coverage table naming any AC with no test.

**Standing rule:** generated tests are a starting point QA validates, not a substitute
for QA judgement. QA owns data volumes, device and browser matrices, accessibility, and
the grey-area calls the spec did not resolve.
