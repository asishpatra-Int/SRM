# Business Requirements Ledger

One file, not one per feature. A requirement is raised during discovery, before a slug
exists — numbered `BRD-NNN`, and a spec links back to its entry via `Linked BRD`.

Numbering: sequential, never reused, starting at `BRD-001`. An entry is never deleted —
a superseded requirement is marked as such in its own `Notes` field, not removed.

## Entry Template

```markdown
### BRD-NNN: <title>
**Raised by:** <source and trigger>
**Business need:** <the problem, for whom, and the risk or cost of not solving it>
**Sponsor:** <decision owner>
**Priority:** <with the date that drives it, if any>
**Decided:** <what is already settled and not up for re-litigation>
**Open at BRD stage:** <what must be answered before spec drafting, and by whom>
**Notes:** <adjacent things explicitly not in scope here>
```

---

_No entries yet. Run `/capture-brd` to add the first one._
