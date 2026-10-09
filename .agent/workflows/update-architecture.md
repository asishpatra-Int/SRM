# Architecture Sync

**Requires:** a merged change that added a service, endpoint, table, integration,
queue, or external dependency. **Writes:** no state change.

**Steps:**
1. Diff `.ai-context/architecture.md` against what the code now actually does.
2. Update the drifted sections. Keep it a description of reality, not intent.
3. If a decision behind the change is non-obvious or was contested, write
   `.ai-context/decisions/ADR-NNNN-<slug>.md` — context, decision, consequences,
   including what the decision explicitly does *not* solve — and link it from the
   architecture section it explains.
4. If the change contradicts `constitution.md`, stop. That needs an owner decision, not
   a doc edit. If the owner amends the constitution, the new rule is inherited
   automatically by every future spec touching that area — which is the point.

**Output contract:** the doc diff, plus any new ADR. State explicitly if nothing
drifted. Documentation currency is a standing Gate 2 item, so "nothing drifted" is a
real and expected answer, not an evasion.
