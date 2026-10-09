# Spec Generation

**Requires:** a `BRD-NNN` entry with no unresolved blocking items, plus
`constitution.md` and `architecture.md`. **Writes:** Status = Draft.

**Before writing, confirm all three (§11.1). If any is "not yet," stop:**
1. Can the feature be described in one unambiguous paragraph a zero-context engineer
   could build from?
2. Is every artefact the agent needs gathered — modules touched, prior related spec,
   API contract, design tokens, constraints carried forward?
3. Is this aligned with whoever signs off?

**Steps:**
1. Assign the slug per AIF §2. Verify it is unique across `specs/`, including archived
   and deprecated specs.
2. Write `.ai-context/specs/<slug>.spec.md` to this shape:

# Spec: <Feature Name>
## Spec ID
<slug>
## Status
Draft v1.0
## Linked BRD
.ai-context/BRD.md#BRD-NNN
## Intent
<One paragraph: what changes, for whom, under what condition>
## Context
- Builds on: .ai-context/architecture.md (<section>)
- Related: .ai-context/specs/<related-spec>.spec.md
## API Contract
### <slug>.API01 — <METHOD> <path>
**Request payload / Success response / Exception table**
## Acceptance Criteria
1. <slug>.AC1 — Given <state>, when <action>, then <outcome>.
## Unit Test Cases (spec-derived)
| Test ID | Maps to AC | Scenario | Expected |
| <slug>.UT01 | AC1 | <scenario> | <expected> |
## Explicitly Out of Scope
## Non-Functional Constraints (from constitution.md)

3. **Every AC is given/when/then.** "Secure," "fast," "robust," and "works correctly"
   are adjectives, not criteria. If you cannot state how it would be verified, it is
   not finished being specified.
4. **The API Contract section is mandatory only when the feature has an API surface** —
   an endpoint it exposes or a contract it consumes. A pure refactor or an internal
   batch job has none, and a reviewer should not demand one where there is nothing to
   contract. Where it does apply, the exception table is exhaustive, not happy-path
   plus one error. Payload shape, status codes, and exceptions are product decisions,
   which is why they live in the spec and not the plan.
5. **The UT table holds acceptance-level cases only** — those directly derived from
   this spec's own ACs. Broader QA concerns live in `test_cases/` (§7.7) and reference
   back rather than duplicating.
6. **Link, don't restate.** Reference `.ai-context/` paths; never paste unrelated
   blocks into the spec.
7. Fill "Explicitly Out of Scope." An empty section means the boundary was never drawn
   — and it must cover what this feature will be *tempted* to also fix.
8. Check every constraint in `constitution.md` and carry the relevant ones into
   Non-Functional Constraints.

**Output contract:** the spec file, plus a list of every ambiguity you resolved by
assumption. Do not silently choose. An unstated assumption becomes a defect three
gates later.

**Stop condition:** if the requirement is too vague to produce testable ACs, write the
questions instead of the spec. One feature, one spec — "the user module" is a project;
"OTP-based 2FA for existing users" is a spec.
