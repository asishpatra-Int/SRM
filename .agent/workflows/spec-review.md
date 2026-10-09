# Spec Peer Review — Gate 1

**Requires:** Status = Draft or Changes Requested.
**Writes:** Approved, or Changes Requested with a version bump.

**This is the most consequential review in the lifecycle — more than code review.**
An approved spec deterministically generates code, tests, and documentation
simultaneously. A miss here does not cost one bad diff; it costs a bad diff, tests that
pass because they were derived from the same bad premise, and documentation that
faithfully records the wrong intent. A code review miss is contained to its PR. A spec
review miss propagates into every artefact downstream.

**Who reviews:**
* A named reviewer who is **not the author**. Non-negotiable outside a genuine
  production emergency (§7.12).
* For a spec with an API Contract, at least one reviewer should be someone who will
  also work Gate 2 on this feature, or a domain SME — reading for "does this contract
  make sense against what already exists," not just "is this readable."
* Security or Architecture sign-off is **required, not optional**, whenever the spec or
  plan touches a constitution rule under Security Posture or Architectural Constraints.

**Read for seven distinct failure modes — not one pass of general impressions:**
1. **Ambiguity** — could two competent engineers build materially different things from
   this intent?
2. **Testability** — is every AC given/when/then, individually IDed, and free of
   adjectives?
3. **Scope creep** — does "explicitly out of scope" actually cover what this feature
   will be tempted to also fix?
4. **Contract sanity** — does the payload shape match existing conventions in this
   service? Is the exception table exhaustive, or happy path plus one error?
5. **Constitution compliance** — does the spec violate, or stay silent on, anything in
   `constitution.md`?
6. **Overlap** — does an existing spec already cover part of this? Cheap here.
   Expensive later, as a merge conflict of intent.
7. **Dependency** — are the specs this one builds on actually in Approved or Released
   state, or is it quietly depending on something not yet real?

**Turnaround:** same working day for a spec with 5 or fewer ACs. 48 hours is the outer
bound before it is an escalation, not a delay.

**Outcome is binary at the status level even when feedback is nuanced:**
* **Approved** — status moves to Approved; plan drafting may start.
* **Changes Requested** — status stays In Peer Review, spec is revised, and the version
  marker bumps (`Draft v1.0` → `Draft v1.1`) so revision history lives in the file, not
  only in git blame.

**Output contract:** findings grouped by the seven failure modes above, skipping any
with nothing to report; the binary outcome; the updated Status line. Never leave the
status ambiguous.

**A worked example of this gate earning its cost:** a reviewer catches that an AC
reading "after 5 failed attempts the session is invalidated" is silent on what happens
when the user then logs in correctly on the first try afterwards — does the new session
start fresh, or inherit the lockout? The plan would have had to guess, and the agent
generating from it would guess differently depending on the day. Cost of catching it
here: minutes. Cost of catching it in QA three sprints later: a defect with a
non-obvious root cause.
