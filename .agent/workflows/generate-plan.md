# Plan Generation

**Requires:** Status = Approved. **Writes:** Plan Drafted.

**Steps:**
1. Write `.ai-context/plans/<slug>.plan.md`:

# Plan: <Feature Name>
## Derived From
<slug>.spec.md (v1.N, Approved <date>)
## Architecture Approach
<the approach, and why — including alternatives rejected and the reason>
## Data Model
<tables, columns, indexes, migrations — explicit, not inferred later>
## Constitution Check
| Rule | Verdict | Note |
## Explicitly Deferred
<what this plan will not do, and when it should be revisited>
## Sequencing
<order of work and what blocks what>

2. **Name integration points and the data model explicitly.** Do not leave these for
   the agent to infer at implementation time — inference at implementation time is how
   a per-session cache key gets chosen when a per-user one was needed.
3. **Constitution check is line-by-line**, each relevant rule marked pass or conflict.
   A conflict stops the plan; it is a Gate 1 rejection, not a Gate 2 comment.
4. **Explicitly Deferred is verified at Gate 2** — implementation must not scope-creep
   into what the plan deferred.
5. Write an ADR stub for any decision whose reversal would cost more than a day of
   rework. A line in the plan is not an ADR.

**Output contract:** the plan file, plus any ADR stub under `.ai-context/decisions/`.

**Rule:** no code in a plan. If you are writing implementation, you are past the gate.
