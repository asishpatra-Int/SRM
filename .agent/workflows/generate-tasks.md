# Task Decomposition

**Requires:** Plan Reviewed. **Writes:** Tasks Generated.

**Steps:**
1. Write `.ai-context/tasks/<slug>.tasks.md`.
2. Number tasks `<slug>.T01`, `T02`, … in dependency order. Each carries a checkbox
   state: Not Started / In Progress / In Review / Merged.
3. Each task states: what to build, which files it touches, which AC IDs it satisfies,
   and what "done" means for it specifically.
4. **One task = one reviewable change.** If a task touches more than roughly three
   files or satisfies more than two ACs, split it. A task that produces a diff too
   large to review against its ACs in one sitting was not decomposed.
5. **Every AC maps to at least one task.** Report any AC left unmapped — that is a hole
   in the plan, not an oversight to paper over.
6. Boundary and failure-path behaviour gets its **own** tasks where the ACs call for
   it. Folded into a happy-path task, it is what gets skipped under time pressure.

**Output contract:** the tasks file, plus the AC→task coverage table.
