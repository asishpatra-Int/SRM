# Plan Review — Gate 1 Continued

**Requires:** Plan Drafted. **Writes:** Plan Reviewed, or back to Approved on rejection.

**Checks:**
1. **Constitution, line by line.** A plan that violates a non-negotiable is rejected
   here. It does not proceed to tasks with a note to revisit.
2. **Integration points and data model are stated, not implied.** "Uses the existing
   cache" is not a data model. Which key, which TTL, which eviction.
3. **The approach section names rejected alternatives.** A plan with one option was not
   a decision, it was the first idea.
4. **Deferrals are explicit and dated or triggered** — "later" is not a deferral.
5. **ADR check:** is there a decision here whose reversal costs more than a day? If yes
   and no ADR exists, that is a rejection.
6. **No plan skips straight from spec to code** — except the trivial-change tier (§3.3).

**Output contract:** verdict with the constitution check table filled in, and any ADR
required before the plan can pass.
