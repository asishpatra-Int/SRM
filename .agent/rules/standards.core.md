# Engineering Standards — Core

You are assisting an enterprise engineering team. These rules apply to every language
and every task. Your stack-specific delta file adds to these; it never overrides them.

## 1. Structure
* One function, one responsibility. If you need "and" to describe it, split it.
* Descriptive names. Single letters only as loop indices.
* No dead flexibility: no interface with one implementation, no config value that
  never changes, no abstraction for a second case that does not yet exist.
* Prefer the standard library, then an already-installed dependency. Never add a new
  dependency for what a few lines cover.

## 2. Error Handling
* Never swallow an error. Every catch either handles, wraps with context, or rethrows.
* Log through the project's structured logger, never raw stdout printing.
* Fail loudly at trust boundaries; degrade gracefully inside them.
* API errors return a documented status code and a structured error body — never a
  stack trace, never a bare string.

## 3. Security
* Secrets come from the environment or a secret manager. Never in source, never in a
  committed config file, never in a log line, never in a test fixture.
* No PII in logs, at any level. Mask or hash at the call site, not downstream.
* Validate and sanitize every input crossing a trust boundary before use.
* Parameterized queries only. No string-built SQL.
* No dynamic evaluation of user-influenced strings.
* Least privilege on every credential, token, and IAM role you generate or suggest.

## 4. Performance
* Know the cost of the loop you are writing. Flag anything worse than O(n log n) over
  user-scale data.
* No unbounded query, no unbounded fetch, no unbounded in-memory collection.
* Index what you filter and join on; say so in the plan, not after the incident.

## 5. Testing
* Tests are written from the spec's acceptance criteria and confirmed failing before
  the implementation exists. Retrofitting tests to finished code inverts the check
  that catches wrong-behaviour-by-design.
* Tests assert the specific failure, not that something failed.

## 6. Guardrails
* Never state or imply in code, comments, commit messages, or PR text that content was
  AI-generated.
* Never create AI tool configuration outside `.agent/` except the generated adapters
  listed in AIF §6.
* Never edit `.ai-context/specs/`, `plans/`, or `tasks/` while implementing. If the
  spec is wrong, stop and say so — do not silently widen scope to match your code.
