---
id: '0001'
title: Version 4 — specification, skills and governance
status: accepted
date: 2026-09-28
authors: [Chris Knight]
reviewers: [James Scott-Brown]
---

# RFC 0001 — Version 4: specification, skills and governance

## Summary

This RFC started the version 4 work. It proposed three pieces of work: a new way to record design system decisions, a breaking change to the specification, and an update to the skills that read and write the record. The RFC was not written out in full. Its governance work is the cutover to the current decision record, made in [#1427](https://github.com/Greater-London-Authority/ldn-viz-tools/pull/1427) and described in the [ADR lifecycle](../governance/ADR-LIFECYCLE.md). The specification change was split into [RFC 0002](./0002-v4-typesets-and-flow.md) and [RFC 0003](./0003-v4-token-pipeline-and-outputs.md).

## Motivation

The version 3 decision log was one file, `DECISIONS.md`, of dated entries. It grew with every change, it mixed decisions with open items and work in progress, and a reader had to reconcile several entries to find the rule in force.

## Outcome

The reviewers accepted this RFC. Its outcome was recorded on 20 October 2026.

### Governance and decision record

- The record is in three layers. `RULES.md` states what is true now, the ADRs in `decisions/` say why, and pull requests and commits hold the evidence.
- `DECISIONS.md` was removed. Its rules were restated as baseline ADRs 0001 to 0010, and `RULES.md` was written from them, with each rule citing its ADR. `decisions/INDEX.md` replaces `DECISIONS.md` as the list of decisions. `adr_check.py --write-index` generates it.
- `SPEC-CHANGE-PROTOCOL.md` moved to `governance/`. A change that rests on a decision now needs an accepted ADR, and the protocol lists the steps in order.
- Templates for ADRs and RFCs are in `governance/templates/`.
- `adr_check.py` checks the decision record against the ADR lifecycle. It was added under RFC 0003, workstream 6.

The cutover did not tag `spec-v3-final` or keep a frozen copy of `DECISIONS.md`. The file's history is in Git. The baseline ADRs were not sealed at a version 3 release. They are sealed with the other ADRs at the version 4 release.

### Specification

The breaking change to the specification was planned in RFC 0002 (typesets and flow) and RFC 0003 (token pipeline and outputs).

### Skills

The governance skills (`decision-record`, `governance-encoder`, `contribution-workflow`, `deprecation-process`, `version-bump-advisor` and `change-communication`) are not in the repository. They are in `.claude/skills/design-system-ops`, which Git ignores.

## Decisions this RFC produced

- Baseline ADRs [0001](../decisions/0001-sources-of-truth.md) to [0010](../decisions/0010-figma-conventions.md).
- The process itself is recorded in [`governance/`](../governance/), not in ADRs.
