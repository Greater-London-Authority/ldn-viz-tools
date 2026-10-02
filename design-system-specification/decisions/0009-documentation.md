---
id: '0009'
title: Documentation
status: accepted
date: 2026-10-01
released-in: null
deciders: [Chris Knight]
areas: [Documentation]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0009 — Documentation

## Context

When we work through the Figma components one by one to bring them up to date (a sweep), we may find documentation that is missing or out of date. If we stop to write all of it as we go, the sweep slows to a crawl. If we write it whenever someone happens to get to it, doc frames end up scattered around the file, each in a slightly different style.

So we needed to agree three things: how much documentation gets done during a sweep, what can wait, and what a doc frame should look like.

## Decision

- **AI can be used to assist in documentation, but every output must be read and checked** Ai generated output has proven to be verbose and confusing for human readable docs. It's ok to use AI to scaffold component documentation, but it _must_ be verified by a human.
- **Sweeps only do the basics.** While sweeping a component, we fill in its metadata and description and add an intro doc frame. Usage guidance, accessibility notes and full strips of states are left for a separate documentation pass.
- **All doc frames follow the same pattern.** The pattern is written up in the `ds-doc-frame` skill. Text in a doc frame uses the `Doc/*` styles rather than the product typography roles.
- **Foundation doc frames go on the page for that foundation.** We haven't yet agreed where component doc frames should live, so until we do, we'll place them together in batches rather than one at a time wherever they happen to land.

## Options considered

- **Write everything during the sweep.** Rejected because it holds up the sweep.
- **Write documentation as and when.** Rejected because it leads to inconsistent frames scattered across the file.
- **Do the basics during the sweep and the rest in a dedicated pass** (chosen).

## Consequences
