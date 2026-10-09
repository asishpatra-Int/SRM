# Release

**Requires:** every constituent spec at Ready for Release in status.md.
**Writes:** Released (vX.Y.Z) on each.

A release is not just a git tag — it is a set of specs whose state changes together.

**Steps:**
1. Confirm every included spec is **Ready for Release** in `status.md`. That table is
   the release-readiness source of truth, alongside the tag convention.
2. **Draft release notes from spec intents, not commit messages.** The intent paragraph
   was written for a human audience; a commit log was not.
3. Flip each included spec's Status to **Released (vX.Y.Z)** — permanent, dated, and
   traceable from the release tag back to the exact spec that produced it.
4. Move those rows from the Active Specs table to the Released archive table in
   `status.md`, same day, so the board stays a true reflection of what is still in
   flight.
5. Record the release:

## Release vX.Y.Z — YYYY-MM-DD
### Specs included
- <slug> → Released (vX.Y.Z)
### Release notes
- <user-facing sentence drawn from the spec's Intent> (<slug>)

**Output contract:** the release record, the updated status.md, and the list of spec
Status lines changed.
