# Incident Triage

**Requires:** a production incident. **Writes:** the correct artefact per the mapping.

Incidents map to artefacts, not to ad hoc chat threads. The mapping is what makes
production learning durable instead of tribal.

**Step 1 — Classify. Exactly one:**

| Trigger | Artefact created | Linked to |
|---|---|---|
| Traces to a **spec gap** | Hotfix spec (§7.12) or standard bug-fix spec | Original spec via Related; logged in status.md |
| Traces to an **implementation defect**, spec was fine | Lightweight bug-fix spec, no spec-gap flag | Original spec unchanged |
| **Same class recurs — 3rd occurrence in the same area** | ADR | New ADR-NNNN, referenced from architecture.md; constitution.md amended if it changes a non-negotiable |
| A **genuine new requirement** surfaced via support | New BRD entry | BRD.md, feeds a new spec through the normal lifecycle |

**Step 2 — Create it.** Do not skip to the fix. The classification determines whether
this is a code problem or a process problem, and only one of those is solved by a patch.

**Step 3 — Count.** Check how many times this class of incident has occurred in this
area. **Third time is an ADR, not another silent patch.** A recurring incident that
keeps getting patched is a design decision nobody has made yet.

**Step 4 — Close the loop.** Update the original spec's Related field or
`architecture.md` to reflect the learning, and add a `status.md` Daily Execution Log
entry the same day.

**Output contract:** the classification with its justification, the artefact created,
the occurrence count, and the status.md entry.
