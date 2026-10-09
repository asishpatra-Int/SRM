# Discovery Capture

**Requires:** nothing. This is where a requirement is first written down. A spec is
never the first place a requirement appears.

**Steps:**
1. Establish the **business need**, not just the requested feature. If the two
   diverge, say so before anything gets scoped — that divergence is the single most
   expensive thing to discover after the code exists.
2. Separate **decided** from **still open**: architecture constraints, integration
   contracts, design tokens, data ownership.
3. Name the sponsor — whoever owns the decision, not whoever asked.
4. Append a numbered entry to `.ai-context/BRD.md`:

### BRD-NNN: <title>
**Raised by:** <source and trigger>
**Business need:** <the problem, for whom, and the risk or cost of not solving it>
**Sponsor:** <decision owner>
**Priority:** <with the date that drives it, if any>
**Decided:** <what is already settled and not up for re-litigation>
**Open at BRD stage:** <what must be answered before spec drafting, and by whom>
**Notes:** <adjacent things explicitly not in scope here>

**Output contract:** the BRD entry, plus the list of open items with an owner against
each.

**Stop condition:** if you cannot answer "what problem, for whom, bounded how" in one
paragraph, the requirement is not ready to become a spec. Write the open questions
instead and name who resolves each. Discovery is a gate, not a formality.
