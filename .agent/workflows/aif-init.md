# AIF Workspace Bootstrap

You are setting up an AI-First workspace in this repository. Do not write application
code. Do not modify anything in src/ or tests/.

## Step 1 — Gather

Ask the developer, and wait for answers before proceeding:

1. **Project name and one-line business objective.**
2. **Primary stack(s)** — e.g. Node/TypeScript backend + React frontend. Ask which,
   do not infer from files alone; a repo may be mid-migration.
3. **Agent tools in use by this team** — Claude Code, Cursor, Copilot, Windsurf,
   Antigravity. Multiple answers allowed.

If this is an existing repo, also read `package.json` / `pyproject.toml` / `pom.xml`,
`README.md`, and the directory layout, and state what you inferred so the developer
can correct you before you write anything.

## Step 2 — Generate

Create the tree defined in AIF v2.0 §1.

* `.agent/rules/standards.core.md` — copy verbatim from §5.1.
* `.agent/rules/standards.<stack>.md` — one file per stack named in Step 1, using the
  delta templates in §5.2. If a stack has no delta template, generate one following the
  same section structure and flag it to the developer for review.
* `.agent/rules/agent-conduct.md` — copy verbatim from §5.3.
* `.agent/rules/.agentignore` — copy from §5.4, then add stack-specific entries.
* `.agent/workflows/*.md` — copy each template from §7.
* `.ai-context/constitution.md` — scaffold from the blueprint template (§29); fill in
  what you can infer, leave `TBD — owner decision` markers for the rest. Do not invent
  non-negotiables. A constitution rule must be specific enough that a Gate 1 reviewer
  can point at a line and say "the plan violates this."
* `.ai-context/project_context.md` — fill from Step 1 answers.
* `.ai-context/architecture.md` — if existing repo, write what you actually observe.
  If greenfield, scaffold headings only.
* `.ai-context/BRD.md` — headings and the numbering convention only. No entries.
* `.ai-context/status.md` — empty board: Active Specs table, Released archive table,
  Daily Execution Log heading.
* Artefact directories — create with a `.gitkeep`. Do not invent a first feature.
* Tool adapters — generate only for the tools named in Step 1, per §6.

## Step 3 — Report

Output a file-tree diff of what you created, and a list of every `TBD` marker left
behind with the file it sits in. Do not mark the workspace ready while unresolved
`TBD`s exist in `constitution.md` — an unfilled constitution means Gate 1 has nothing
to check a plan against.

> **Idempotency:** re-running `/aif-init` on an initialized repo must diff, not overwrite. Report what differs from the template and let the developer choose per file.
