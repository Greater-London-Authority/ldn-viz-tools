# ADR lifecycle

_Status: **draft**, proposed in [RFC 0001](../rfcs/0001-v4-spec-and-governance.md)._

This document describes how design system decisions are recorded, how they change over time, and how the record is kept concise.

The aim of this proposal is that each change to a decision makes the record no harder to read, and that the number of documents a reader must open to understand any one rule stays fixed, however many times that rule has changed.

## Three layers, three jobs

The record is split into three layers. Each has one job and one editing rule.

| Layer         | File                   | Job                                                     | Editing rule                                          |
| ------------- | ---------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| **Rules**     | `RULES.md`             | What is true now, one short statement per rule          | Edited in place; every rule cites the ADR it rests on |
| **Decisions** | `decisions/NNNN-*.md`  | Why a decision was made: context, options, consequences | Mutable until released, then sealed (see below)       |
| **Evidence**  | Pull requests, commits | How the rule was implemented and verified               | Never copied into the ADR; linked from it             |

The rules layer states each rule in one to three sentences and cites an ADR such as `[ADR-0007]`. It does not explain the rationale for rules; these belong in the ADR.

Work in progress belongs in GitHub issues. An open question becomes an issue; it becomes a `proposed` ADR only once someone has a concrete proposal to evaluate.

## Folder layout

```
design-system-specification/
├── README.md                          reading order for people and agents
├── RULES.md                           current truth; cites ADRs; GEN:pinned block
├── design-system-specification.md     unchanged: prose by hand, values generated
├── token-architecture-and-naming.md   unchanged
├── decisions/
│   ├── INDEX.md                       generated: one line per ADR, grouped by status
│   ├── 0001-sources-of-truth.md       active ADRs only (proposed, accepted)
│   ├── 0002-…
│   └── archive/
│       └── 0004-….md                  superseded, retired and declined ADRs
├── rfcs/
│   └── 0001-v4-spec-and-governance.md programmes that span several decisions
└─── governance/
    ├── ADR-LIFECYCLE.md               this document
    ├── SPEC-CHANGE-PROTOCOL.md        moved from the folder root
    └── templates/adr.md
```

Only live decisions sit in `decisions/`. Superseded, retired and declined records are moved into `decisions/archive/` with `git mv`, keeping their number and filename, so links resolve with a one-segment change and `git log --follow` keeps the history. The effect is that listing the folder shows the current decision set and nothing else.

ADR numbers are sequential, four digits, and never reused. A date-based scheme is avoided because two decisions on the same day would collide, and because the date is already in the front matter.

An RFC is used only for a programme of work that will produce several ADRs, such as version 4. A single decision goes straight to a `proposed` ADR. When an RFC is accepted, the ADRs it lists carry the decisions and the RFC itself is not updated again.

## Statuses

An ADR has one of five statuses. Two are live and three are terminal.

| Status       | Meaning                                                                       | Lives in     |
| ------------ | ----------------------------------------------------------------------------- | ------------ |
| `proposed`   | Under discussion; may change freely                                           | `decisions/` |
| `accepted`   | In force                                                                      | `decisions/` |
| `declined`   | Considered and turned down; records the conditions for revisiting             | `archive/`   |
| `superseded` | Replaced by a later ADR, named in `superseded-by`                             | `archive/`   |
| `retired`    | No longer applies and nothing replaces it (the thing it governed was removed) | `archive/`   |

"Amended" is deliberately not a status. An amended ADR is still in force; the amendment is a relationship between two records, recorded in `amends` and `amended-by`.

## Sealing: the main defence against bloat

An ADR is **mutable until the release that includes it, and sealed after**. Sealing is recorded by setting `released-in` to the package version.

Before sealing, an ADR is edited in place, whether the change is a correction, a narrowing of scope or a reversal. Changes to the ADR are tracked in Git.

After sealing, the body of an ADR is not rewritten, because consumers may have acted on it and the record of what they were told has to stay intact.

## Changing a sealed decision

Once an ADR is sealed, there are four kinds of change.

**Clarification** — the wording was unclear or wrong, but the rule is the same. Edit the ADR in place and add a line to its _Revisions_ footer giving the date and pull request.

**Amendment** — part of the rule changes and the rest stands. Write a new ADR with `amends: [NNNN]`, and add `amended-by` to the original. The original stays `accepted`. Update the rule in `RULES.md` and cite both ADRs.

**Supersession** — the rule is replaced in full. Write a new ADR with `supersedes: [NNNN]`. The old ADR becomes `superseded`, gains `superseded-by`, and moves to the archive. `RULES.md` cites only the new ADR.

**Retirement** — the thing the rule governed no longer exists. Set the status to `retired`, add a one-line reason and the pull request, and move the ADR to the archive. A new ADR is written only if the reason for removal is itself a decision worth explaining.

## Consolidation: keeping chains short

A rule that has been amended several times becomes hard to read. To prevent this, **an accepted ADR can have at most two amendments**. The third change to that rule must be a consolidating supersession: a new ADR that restates the whole rule as it now stands, supersedes the original and both amendments, and moves all three to the archive.

This keeps a firm limit on how much a reader has to open. To understand any rule you read its line in `RULES.md` and at most three ADRs. In practice it is usually one. The same limit applies to agents, which load `RULES.md` and `INDEX.md` into context and open an ADR only when they need the reasoning.

Consolidation can also be done by choice, for example at each major release; any rule with an amendment chain should be consolidated so the release starts with each rule stated in one place.

## Size discipline within an ADR

An ADR should fit on one screen, around 60 lines. If an ADR is running long, it usually holds more than one decision.

## Cutover from the current log

Backfilling one ADR for every line in the existing changelog would recreate the bloat this proposal is meant to remove. Instead, the cutover applies consolidation once, to everything:

1. The current `DECISIONS.md` is moved to `history/DECISIONS-v3.md` and a final line is added pointing to `RULES.md` and `decisions/`. It is not edited again.
2. A small set of **baseline ADRs** is written, one per section of the current Reference: sources of truth, token and naming grammar, typography contexts and sealing, the chart type set, the spacing public layer, flow, visual rules, tables and charts as code-authoritative, and Figma conventions. Each one restates the rules as they stand, with a _History_ section that links the relevant dated headings in the frozen log. Baseline ADRs are marked `baseline: true` and sealed at the last version 3 release.
3. `RULES.md` is written from the Reference section, with each rule citing its baseline ADR.
4. The Open and In flight items become GitHub issues.

The version 4 breaking change then follows as the first ADRs written under the new process.

## Front matter

```yaml
id: '0012'
title: A declared context seals its subtree
status: accepted # proposed | accepted | declined | superseded | retired
date: 2026-08-19 # date accepted (or proposed, while proposed)
released-in: null # package version once sealed, e.g. 4.0.0
deciders: [] # [unknown — to be agreed in RFC 0001]
areas: [typography, flow] # foundations the rule governs
breaking: true # requires consumer migration
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Composition & Hierarchy Resolution'] # spec headings this ADR shapes
```

`guards` connects a decision to what enforces it, and `spec` connects it to where it is described. Together they let a tool answer "if this ADR is superseded, what else has to change?"

## Automation

An `adr_check.py` is added, that fails when:

- front matter is missing a field or holds an unknown status;
- `supersedes` and `superseded-by`, or `amends` and `amended-by`, are not symmetric;
- a file in `decisions/` has a terminal status, or a file in `archive/` has a live one;
- an accepted ADR has more than two entries in `amended-by`;
- a sealed ADR's body differs from its sealed version without a matching _Revisions_ line;
- `RULES.md` cites an ADR that is not live, or a live ADR is cited nowhere in `RULES.md`;
- `decisions/INDEX.md` is stale.

The sealed-body check compares against the file as it was at the tag named in `released-in`, so it needs no stored hash.

## Governance

These points need agreeing before this document is accepted. The proposals are starting points.

- **Who can accept an ADR.** Proposed: one maintainer review for non-breaking ADRs; for `breaking: true`, one design and one engineering maintainer. Names: [unknown — to be agreed].
- **Where discussion happens.** Proposed: on the pull request that adds the `proposed` ADR. Once merged, the status becomes `accepted`.
- **Who can seal.** Sealing happens during the release, set by whoever cuts the release, as a step in the release checklist.
- **Declined proposals.** Proposed: always recorded, so the same idea is not proposed again without new information. They are written short, go straight to the archive, and state the conditions under which the idea could be revisited.
- **Skills.** `decision-record`, `governance-encoder`, `deprecation-process` and `change-communication` in `design-system-ops`, and the Skills section of the current Reference, need updating to write and read this format. Agents should be told to read `RULES.md` and `INDEX.md` first and never to treat an archived ADR as current.
