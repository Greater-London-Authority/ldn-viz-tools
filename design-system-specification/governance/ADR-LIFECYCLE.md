# ADR lifecycle

_Accepted with [RFC 0001](../rfcs/0001-v4-spec-and-governance.md)._

This document describes how design system decisions are recorded, how they change over time, and how the record is kept concise.

The aim is that each change to a decision makes the record no harder to read, and that the number of documents a reader must open to understand any one rule stays fixed, however many times that rule has changed.

## Three layers.

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
├── RULES.md                           current truth; cites ADRs
├── design-system-specification.md     prose by hand, values generated
├── writing-documentation.md           which document answers which question
├── SNAGS.md                           problems found, not yet fixed
├── decisions/
│   ├── INDEX.md                       generated: one line per ADR, grouped by status
│   ├── 0001-sources-of-truth.md       active ADRs only (proposed, accepted)
│   ├── 0002-…
│   └── archive/
│       └── 0004-….md                  superseded, retired and declined ADRs
├── rfcs/
│   └── 0001-v4-spec-and-governance.md programmes that span several decisions
├── governance/
│   ├── ADR-LIFECYCLE.md               this document
│   ├── SPEC-CHANGE-PROTOCOL.md        the steps for changing the specification
│   └── templates/                     adr.md and rfc.md
└── scripts/                           build checks, spec generation, adr_check.py
```

Only live decisions sit in `decisions/`. Superseded, retired and declined records are moved into `decisions/archive/` with `git mv`, keeping their number and filename, so links resolve with a one-segment change and `git log --follow` keeps the history. The effect is that listing the folder shows the current decision set and nothing else.

ADR numbers are sequential, four digits, and never reused. A date-based scheme is avoided because two decisions on the same day would collide, and because the date is already in the front matter.

An RFC is used only for a programme of work that will produce several ADRs, such as version 4. A single decision goes straight to a `proposed` ADR.

An RFC has one of three statuses. It is `open` while reviewers comment on it. It becomes `accepted` when they sign it off, or `rejected` if the work does not go ahead. An accepted RFC sets the scope of the work. The ADRs record each decision as it is made, and the scope can change once the work starts. When the work is done, the RFC's outcome, open questions and list of decisions are brought up to date, and it is not changed after that.

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

## Cutover from the old log

Backfilling one ADR for every line in the old changelog would have recreated the bloat this process is meant to remove. Instead, the cutover applied consolidation once, to everything ([RFC 0001](../rfcs/0001-v4-spec-and-governance.md)):

1. `DECISIONS.md` was removed. Its history is in Git, and no frozen copy was kept.
2. Its rules were restated as **baseline ADRs** 0001 to 0010, one for each area: sources of truth, token naming, typography, spacing, flow, visual rules, tables, charts, documentation and Figma conventions. They are sealed with the other ADRs at the version 4 release.
3. `RULES.md` was written from the baseline ADRs, with each rule citing its ADR.

The version 4 breaking change then followed as the first ADRs written under the new process, from 0011.

## Front matter

```yaml
id: '0012'
title: Title Groupings
status: accepted # proposed | accepted | declined | superseded | retired
date: 2026-10-05 # date accepted (or proposed, while proposed)
released-in: null # package version once sealed, e.g. 4.0.0
deciders: [Chris Knight, James Scott-Brown] # who has signed this off
areas: [Typography] # foundations the rule governs
breaking: false # requires consumer migration
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Title groups', 'Which step each child takes'] # spec headings that describe this ADR
pr_url: '' # optional: the pull request that accepted the ADR
```

`spec` names the headings in the specification that describe the decision, so that when an ADR is amended or superseded, the sections to update are listed. `pr_url` links the ADR to its evidence.

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

- **Who accepts an ADR.** The maintainers, Chris Knight and James Scott-Brown. Both have signed off every ADR so far, and both are named in its `deciders`.
- **Where discussion happens.** An ADR is written on a feature branch, as `proposed`, and discussed there and on its pull request. Its status becomes `accepted` when the maintainers sign it off, before or with the merge.
- **Who seals.** Sealing happens during the release, as a step in the release checklist, set by whoever cuts the release. No ADR is sealed yet. The first are sealed at the version 4 release.
- **Declined proposals.** A declined proposal is recorded, so the same idea is not proposed again without new information. It is written short, goes straight to the archive, and states the conditions under which the idea could be revisited. None has been declined yet.
- **Skills.** The governance skills, such as `decision-record` and `governance-encoder`, are in `.claude/skills/design-system-ops`, which Git ignores, so they are not part of this repository. Agents read `RULES.md` and `INDEX.md` first, and never treat an archived ADR as current.
