# Hotfix

Production is broken. **The chain compresses; it does not disappear.**

**Requires:** a production incident. **Writes:** Emergency-Merged → Retro-Documented.

**Steps:**
1. **Assign the hotfix ID:** `HOTFIX-<incident-slug>`, e.g.
   `HOTFIX-2026-0714-otp-lockout`.
2. **Write the lightweight spec first, even under pressure** —
   `.ai-context/specs/hotfix-<incident-slug>.spec.md`. One paragraph: what broke,
   correct behaviour as 1–2 ACs. Status starts at **Emergency-Merged**, a hotfix-only
   state. The Related field points back to the spec being patched.
3. **Root-cause before patching.** Grep every caller of the function you are about to
   change — patching only the path named in the incident leaves the sibling callers
   broken, which is how the same incident recurs under a different symptom.
4. **Add the regression test that fails without the fix.** Non-negotiable.
5. **Gate 1's reviewer-not-author rule may be skipped only in a genuine production
   emergency. Gate 2 is never skipped** — reviewed within 24 hours regardless, with the
   full security checklist.
6. **Same working day:** status moves **Emergency-Merged → Retro-Documented** once the
   spec entry is formalised, and the fix is folded into the originating feature's spec
   so the permanent artefact reflects reality.
7. **Check the occurrence count.** Third incident in the same area trips the ADR trigger
   (§7.13) — it is a design signal, not a third patch.

**Output contract:** the hotfix spec, the diff, the regression test, the list of sibling
call sites you checked, and the `status.md` entry.
