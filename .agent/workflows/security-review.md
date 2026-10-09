# Security Review

**Requires:** any state from In Development onward. **Writes:** findings only.

Run at Gate 2 for any change touching auth, data, input handling, or dependencies —
and on every hotfix without exception.

**Steps:**
1. **Boundaries** — enumerate every point where untrusted data enters. Confirm each
   validates before use.
2. **AuthN/AuthZ** — for each new endpoint or handler: who may call it, and where is
   that enforced? A missing check is a finding even if no caller exploits it today.
3. **Secrets and PII** — scan the diff for literals resembling keys, tokens, connection
   strings, private keys. Check nothing sensitive reaches a log line at any level.
   Check the same for spec, plan, and task files.
4. **Injection** — SQL, NoSQL, command, template, path traversal, deserialization.
5. **Rate limiting** — every new endpoint has an explicit decision recorded, including
   an explicit "none needed, because…".
6. **Dependencies** — new or bumped packages: state the reason for each; flag any
   unmaintained, typo-squat-adjacent, or bringing transitive risk. A package doing what
   the standard library already does correctly is rejected by default.
7. **Data exposure** — does an error response, an API payload, or a log leak more than
   the caller is entitled to?
8. **Constitution** — check against this project's Security Posture section, not just
   against the spec. The spec can be silent on something the constitution forbids.

**Output contract:** findings ranked by exploitability × impact, each with a concrete
failure scenario — inputs and resulting harm, not a category label. Say plainly when
you find nothing rather than padding the list.
