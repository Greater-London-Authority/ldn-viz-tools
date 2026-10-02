---
id: 'NNNN'
title: The Title
status: draft
date: YYYY-MM-DD
authors: []
reviewers: []
---

# RFC NNNN — The Title

_Outline. Headings and the notes under them show what each section needs to cover; the content is still to be written._

## Summary

One paragraph on what will be changed and why these changes are planned together.

## Motivation

- Why a change is needed
- What happens if nothing changes.

## Scope

The workstream(s), each with its own section below:

## Non-goals

What is deliberately left alone, such as parts of the specification that are unchanged, the deferred items that stay deferred, and Figma work that is out of scope.

## Workstream 1 — The title

- **The change.** What the rule is now and what it becomes.
- **Why it has to break.** The options that would have avoided a breaking change, and why they were not taken.
- **Affected surface.** Tokens, classes, plugin rules, components, Figma variables and styles, and docs content, counted by a full scan that includes `.md` files under `apps/web/src/content`.
- **Migration.** Whether there is a deprecation window or an alias, codemods, and the order of consumer migration.
- **Change-sets.** How the change is split into separately reviewable pull requests.
- **ADRs this produces.** A list of expected ADR titles, each marked as new, amending or superseding a baseline ADR.

## Sequencing

A table of numbered Phases, description of the Work they include, and their Exit conditions/definitions of done.

## Verification

How we will know each phase is complete: the checks that must pass, the browser checks that tooling cannot cover, and a review of the skills against the released specification.

## Communication

Who needs to hear about these changes, when, and through what: consuming teams, designers who work in Figma, and the public docs site.

## Risks

For example: things taking too long or necessary changes being overlooked.

## Open questions

Decisions this RFC needs from reviewers before it can be accepted.

## Decisions this RFC will produce

A running list of ADRs, filled in as the RFC is written. Once the RFC is accepted, these ADRs outline the decisions and this document is not updated again.
