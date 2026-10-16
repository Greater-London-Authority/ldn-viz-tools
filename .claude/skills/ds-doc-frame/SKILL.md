---
name: ds-doc-frame
description: >
  How to write and build a documentation frame for a component in the lcd-ds
  Figma file: the header, intro text, optional captioned states, and the
  component description. Applies ds-writing to Figma. Use when documenting a
  component on the canvas, writing a component description, or reviewing a
  doc frame.
---

# Doc frames

A doc frame presents a component on its Figma page: a header, a short introduction, and optionally a few captioned states. The text follows [ds-writing](../ds-writing/SKILL.md). This skill covers what is different in Figma.

ADRs: [0009 Documentation](../../../design-system-specification/decisions/0009-documentation.md), [0010 Figma conventions](../../../design-system-specification/decisions/0010-figma-conventions.md).

## Scope

During a sweep, a component gets its metadata, its description and an intro doc frame. Usage guidance, accessibility notes and full strips of states wait for a separate documentation pass ([0009](../../../design-system-specification/decisions/0009-documentation.md)).

## Writing the text

### Component description

The description is the text in the component's Figma properties. It shows in the assets panel and in Dev Mode.

Write one or two sentences: what the component is and when to use it. Name the code component if there is one (`ChartContainer`, `Card`). Don't list props or variants; Figma shows those.

> A container for a chart, with a title group, a slot for the plot and legend, and a footer for notes and sources. Use it around charts drawn with Observable Plot or D3.

### Intro

The intro sits beside the component in the frame. Write two to four sentences:

1. What the component is.
2. When to use it, and when to use something else instead.
3. Anything a designer must know to use it correctly, such as which title group treatment it takes.

Leave out what the canvas already shows, such as colours, sizes and variant names. Leave out how it is built in code.

### Captions

A caption names the state below it: `Default`, `With eyebrow`, `Disabled`. Use the variant or property value as it appears in Figma, in sentence case. No full stops.

### Checking

Check every claim against the component and the spec, as in ds-writing. Then check the text against the AI tells table in ds-writing. In Figma the common ones are slogans in the intro, a bold label before each sentence, and a closing sentence that repeats the first.

## Building the frame

### Text styles and colours

Text on the frame itself uses the `Doc/*` text styles, never product roles. Components shown in the frame keep their own styles ([0010](../../../design-system-specification/decisions/0010-figma-conventions.md)).

| Text | Style | Colour |
| --- | --- | --- |
| Title | Set inside the header component | Set inside the header component |
| Intro | `Doc/Body` | `--color-text` |
| Caption | `Doc/Caption` | `--color-surface-accent` |

The family also has `Doc/Title`, `Doc/Heading`, `Doc/Subheading`, `Doc/Body-sm` and `Doc/Mono`.

Figma variables map to the code tokens, so find each by its token name. Bind colours to variables. Setting a text style doesn't set its colour, so bind the fill after setting the style.

### Anatomy

```
<Component name>                VERTICAL · hug height · fixed width · padding 0 · gap 0
├── .DS-Section-header          instance; set its Title property to the component name
└── content                     HORIZONTAL · padding [32, 60, 32, 60] · gap 40
    ├── intro                   TEXT · Doc/Body · fixed width
    └── states                  VERTICAL · gap 32 · optional
        └── state × N           VERTICAL · gap 8
            ├── caption         TEXT · Doc/Caption
            └── <instance>      the component in that state
```

The header is always an instance of `.DS-Section-header`. Don't build a title by hand. Names starting `.DS-` are documentation scaffolding.

The measurements above come from the v3.1 file: outer width 1280, intro width about 440. The file is moving to a new version, so check them against an existing doc frame in the open file and follow that frame where they differ.

### Steps

1. Find the header component, the `Doc/*` styles and the `--color-text` and `--color-surface-accent` variables by name in the open file. Don't reuse node or style IDs from another session or another file.
2. Find an existing doc frame in the file to compare against.
3. Create the outer frame, named after the component.
4. Add a `.DS-Section-header` instance and set its title.
5. Add the content frame and the intro text. Load the font before setting the characters.
6. If the frame needs states, add two or three that a designer needs to see. Leave full state matrices for the documentation pass.
7. Take a screenshot and compare it with the existing frame. Fix and repeat, up to three times.
8. Place the frame. Foundation doc frames go on the foundation's page. Component doc frames have no agreed home yet, so leave them for the batched placement pass ([0009](../../../design-system-specification/decisions/0009-documentation.md)).

### Figma plugin API

- The file uses dynamic pages, so use the async calls: `getNodeByIdAsync`, `getLocalTextStylesAsync`, `getMainComponentAsync`, `figma.variables.getVariableByIdAsync`.
- `globalThis` doesn't persist between `figma_execute` calls. Put all data in each call.
- `resize()` sets the primary axis to fixed. Set it back to auto if the frame should hug.
- A size read straight after a change can be out of date. Read it again to check.

## Before you finish

- The header is a `.DS-Section-header` instance with its title set.
- Intro and captions use `Doc/*` styles, and their fills are bound to variables.
- Components in the frame keep their own styles.
- The description and intro have been checked against the component, the spec and the ds-writing tells.
- A screenshot has been compared with an existing doc frame.
