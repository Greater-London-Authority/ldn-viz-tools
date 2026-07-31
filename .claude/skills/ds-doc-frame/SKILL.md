---
name: ds-doc-frame
description: >
  Build a documentation frame for a component in the GLA/ldn-viz Figma design
  system, EXACTLY matching the established pattern. Use this whenever creating a
  doc/overview frame that presents a component (title + intro prose + optional
  captioned states strip) on any component page. Trigger on: "doc frame",
  "documentation frame", "overview frame", "housing frame", "document this
  component", or any time a component is being written up on-canvas in this file.
  This skill exists because the pattern is exacting and easy to approximate wrong
  from memory — follow it, do not reconstruct it.
---

# DS Doc Frame

Constructs a component documentation frame that matches the canonical pattern
used across the design system (reference: `Product/DashboardTitle` doc frame,
node `6411:203767`). **Do not hand-roll titles or pick product type roles for
doc chrome.** Docs have their own `.DS-Section-header` component and a dedicated
`Doc/*` text-style family. Using product roles (`dashboard-head`, `label`,
`body-sm`, etc.) for doc chrome is the classic drift — this skill prevents it.

## Golden rules (read first)

1. **The header is a component, not hand-built.** Instantiate
   `.DS-Section-header` (`425:7094`) and set its `Title#425:0` text property to
   the doc title. Never build a title text layer by hand.
2. **Doc chrome uses `Doc/*` styles, never product roles.** Intro prose =
   `Doc/Body`. Captions = `Doc/Caption`. Section titles inside the header are
   handled by the component itself. This is about the _frame's own_ chrome
   (title, intro, captions) — the **content specimens** placed inside a doc
   frame keep whatever styles they legitimately use (product roles for UI
   components, the `Chart/*` subset for chart specimens, etc.). Doc chrome and
   specimen content are two different layers; only the chrome is `Doc/*`. The
   `Doc/*` family is separate from
   `altSemantic/Product/*` — do not substitute.
3. **Fixed frame geometry.** Outer width 1280, padding 0. Content frame padding
   `[32, 60, 32, 60]`, gap 40. These are not adjustable "to taste".
4. **Colours are tokens.** `text` for prose, `surface-accent` for captions and
   the mono tag. Bind variables — never raw hex.
5. **Build from ground truth, not memory.** If any ID below looks stale, re-read
   the reference frame (`6411:203767`) and the section-header component
   (`425:7094`) before building. IDs can change between file versions.
   (All IDs below verified live in file "Design System ver 3.1"; re-verify if
   the version has since changed.)

## Exact anatomy

```
Outer frame                     VERTICAL · AUTO/FIXED · padding 0 · gap 0 · width 1280
  named after the component it documents
├── .DS-Section-header (instance of 425:7094)   padding [0,60,0,60]
│     set property  Title#425:0 = "<doc title>"
│     (internally renders the title on Doc/Title + a "Ldn-viz design system v3"
│      Doc/Mono tag on surface-accent, and a divider line — all inside the
│      component; you only set the Title prop)
└── content                     HORIZONTAL · FIXED/AUTO · padding [32,60,32,60] · gap 40
    ├── intro prose (TEXT)      style Doc/Body · fill text · width ~440
    └── states (FRAME)          VERTICAL · AUTO/AUTO · gap 32        [OPTIONAL]
        └── state (FRAME) × N   VERTICAL · AUTO/AUTO · gap 8
            ├── caption (TEXT)  style Doc/Caption · fill surface-accent
            └── <component instance>  (a chosen meaningful variant/state)
```

The **states strip is optional** and, per the standing docs-scope decision, is
part of the _fuller_ documentation tier. For a lightweight intro/overview frame,
build the header + intro prose and omit the states strip (or include 2–3
genuinely meaningful states only). Do NOT exhaustively enumerate every variant —
responsive behaviour and full state matrices are documented centrally, not
per-frame.

## Canonical IDs (verify before use)

Text styles (`Doc/*` family):

- `Doc/Title` — `S:e919a6afd0c314b2fee6d29b86e743c61a693f7d,` (Inter Semi Bold 30)
- `Doc/Heading` — `S:9bf5a4b49eb03b5920538dd954bb4279b7137b48,` (Inter Semi Bold 24)
- `Doc/Subheading`— `S:522d9faf209d6a75e98e39d781c367b375ad2f39,` (Inter Medium 20)
- `Doc/Body` — `S:4891d18cde867dae4cac5d19534cfb3fb9caaa33,` (Inter Regular 16) ← intro prose
- `Doc/Body-sm` — `S:4a93108c6f3ae8aa40c8a787c6c0a9615764a132,` (Inter Regular 14)
- `Doc/Caption` — `S:db9d0e4998e97d76268401b3524d22f3f5175659,` (IBM Plex Mono 13) ← state captions
- `Doc/Mono` — `S:3b3019f652bd8fbfaa76b361af5833f8ad65c6f1,` (IBM Plex Mono 13)

Component:

- `.DS-Section-header` — component `425:7094`, text property `Title#425:0`

Tokens (semantic-color):

- `text` — `VariableID:598:26405`
- `surface-accent` — `VariableID:600:26430`

Reference frame to copy from if unsure: `6411:203767` (`Product/DashboardTitle`).

## Procedure

1. **Re-verify** the section-header component and `Doc/*` style IDs are current
   (a quick `getLocalTextStylesAsync` name→id check + `getNodeByIdAsync 425:7094`).
   If the file version changed, prefer re-reading the reference frame.
2. Create the **outer frame** (VERTICAL, padding 0, width 1280, hug height),
   named after the component.
3. Instantiate **`.DS-Section-header`**, append it, set `Title#425:0`.
4. Create the **content frame** (HORIZONTAL, padding `[32,60,32,60]`, gap 40).
5. Add the **intro prose** text on `Doc/Body`, fill `text`, width ~440.
   - Load the font before setting characters (`figma.loadFontAsync`).
   - Bind the fill variable — do not use raw hex.
6. (Optional) Add the **states** strip: for each chosen state, a `state` frame
   (gap 8) with a `caption` on `Doc/Caption` fill `surface-accent`, then a
   component instance configured to that state.
7. **Screenshot to verify** (`figma_capture_screenshot`) — check the header
   renders, prose wraps at ~440, spacing matches. Iterate up to 3×.
8. **Placement:** doc-frame placement is currently deferred/batched (no decided
   home). Place in the working column near siblings with an 80px vertical gap,
   OR leave for the batched docs pass — check the current standing decision, do
   not invent a placement.

## Known gotchas (this file)

- Dynamic-page file: in `figma_execute`, use async variants
  (`getNodeByIdAsync`, `getStyleByIdAsync`, `getLocalTextStylesAsync`,
  `getMainComponentAsync`, `figma.variables.getVariableByIdAsync`).
- `globalThis` does NOT persist across `figma_execute` calls — inline all data.
- `resize()` resets `primaryAxisSizingMode` to FIXED — set it back to AUTO after
  any resize if the frame should hug.
- Read-after-write size measurements can lag one step (stale) — re-read to verify.
- Setting a text style does not carry the colour — re-bind the fill variable
  after `setTextStyleIdAsync`.

## Self-check before finishing

- [ ] Header is a `.DS-Section-header` instance with `Title#425:0` set (NOT a
      hand-built title).
- [ ] Intro prose is on `Doc/Body`; captions on `Doc/Caption`. No product roles
      used for doc chrome.
- [ ] Content padding `[32,60,32,60]`, gap 40; outer width 1280, padding 0.
- [ ] Fills are bound tokens (`text`, `surface-accent`), no raw hex.
- [ ] Screenshot verified.
