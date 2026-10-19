---
id: '0001'
title: Version 4 — specification, skills and governance
status: draft
date: 2026-09-28
authors: [Chris Knight]
reviewers: [James Scott-Brown]
---

# RFC 0001 — Version 4: specification, skills and governance

## Summary

One paragraph on what version 4 changes and why these three pieces of work (the breaking specification change, the skills update and the new governance) are planned together.

## Motivation

- What the current specification cannot express, or gets wrong, that makes a breaking change necessary.
- Where the current decision log is struggling: size, mixed purposes, rules that have to be reconciled across dated entries (see [ADR lifecycle](../governance/ADR-LIFECYCLE.md), "Why the current log needs replacing").
- What happens if nothing changes.

## Scope

Three workstreams, each with its own section below:

1. Governance and decision record
2. The breaking specification change
3. Skills

## Workstream 1 — Governance and decision record

- Adopt the [ADR lifecycle](../governance/ADR-LIFECYCLE.md): the three layers, sealing, the amendment limit and consolidation, and the folder layout.
- Cutover plan: freeze `DECISIONS.md`, write baseline ADRs, write `RULES.md`, move open items to issues.
- Changes to `SPEC-CHANGE-PROTOCOL.md`: the "decision" direction writes an ADR rather than a changelog line, and the end-of-thread ritual runs the ADR checks.
- Tooling: a generated `INDEX.md`.
- Roles: who accepts, who seals, where discussion happens.

## Workstream 2 — Skills

An inventory of every skill affected, sorted by what it depends on:

| Skill                   | Depends on        | Change needed | Phase |
| ----------------------- | ----------------- | ------------- | ----- |
| `decision-record`       | Governance format |               | 1     |
| `governance-encoder`    | Governance format |               | 1     |
| `contribution-workflow` | Governance format |               | 1     |
| `deprecation-process`   | Governance format |               | 1     |
| `version-bump-advisor`  | Governance format |               | 1     |
| `change-communication`  | Governance format |               | 1     |

## Sequencing

| Phase | Work                                                                              | Exit condition                                     |
| ----- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| 0     | Baseline: `verify-build` and `check` pass; tag `spec-v3-final`; this RFC accepted | Tag exists; RFC accepted                           |
| 1     | Governance cutover and process skills                                             | ADR checks pass; baseline ADRs accepted and sealed |
