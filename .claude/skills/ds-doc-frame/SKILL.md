---
name: ds-doc-frame
description: >
  How to document a component in the lcd-ds Figma file: the component
  description, the header intro on the light doc frame, the "Dark mode" label on
  the dark frame, and the accessibility frame. Use when documenting a component on the canvas, writing a component description,
  or reviewing a doc frame.
---

# Doc frames

A component in the Figma file is documented in three places, and each has one job:

| Place | Reader | Contents |
| --- | --- | --- |
| Component description | Agents through MCP, Dev Mode, the assets panel | The structured text below |
| Header intro on the light doc frame | Designers on the canvas | The first paragraph of the description |
| Accessibility frame | Designers and agents | Each state with its own focus or ARIA behaviour, with notes, and a contrast table |

The dark doc frame has no text of its own. Its header shows a "Dark mode" label.

State each fact once, in the broadest frame it applies to. Text that applies to a family of components, such as all the Button variants, goes in the family overview.

Write the text to [ds-writing](../ds-writing/SKILL.md). ADRs: [0009 Documentation](../../../design-system-specification/decisions/0009-documentation.md), [0010 Figma conventions](../../../design-system-specification/decisions/0010-figma-conventions.md), [0019 Accessibility](../../../design-system-specification/decisions/0019-accessibility.md).

Don't use Figma annotations. Put accessibility facts in a frame on the canvas.

## Sources

For each component, read:

- the `@component` JSDoc comment in its `.svelte` file, for the summary, the props and the alternatives it names
- the markup and classes in the same file, for the rendered element, ARIA attributes, focus and disabled behaviour
- the form, focus and colour rules in `packages/themes/styles/system.css` and `tokens.css`
- the Figma component itself, for its properties and the text style on each text layer
- [ADR 0019](../../../design-system-specification/decisions/0019-accessibility.md) for focus and contrast

If a public component has no `@component` comment, write the comment in code first and take the description from it. Internal parts and private `.` components don't need one.

Leave out anything you can't trace to one of these.

## Component description

Set it on the component set, or on the component when there is no set. Private `.` components keep an empty description. A component that is only in Figma starts with `Pending: not yet in code.`

Use plain text with uppercase section headers, not markdown. Aim for 120 to 200 words.

```text
<What it is and when to use it, in one or two sentences.>

IN CODE
<Component> from @ldn-viz/<package>. <Which Figma properties match which props.>

TEXT STYLES
<Part>: <text style>. <Part>: <text style>.

USAGE
<When to use it, and which component to use instead in which case.>

ACCESSIBILITY
<The rendered element, focus, and anything a screen reader announces.> The Accessibility: <name> frame shows each state and the contrast.

ANTI-PATTERNS
<One prohibition per line, each with its reason.>
```

### IN CODE

Map the Figma property names to the props. Write "The State variants Error and Disabled match the error and disabled props", not "State Error is the error prop": there is no prop called State. Say which properties have no prop, such as a Focus state that the browser sets, or a Figma axis that code doesn't have. Don't list every prop; Storybook does that.

### TEXT STYLES

Read the text style on each text layer of the default variant. Give the Figma style name, such as `Typeset/product/label-md` or `Usage/product/ui/button-label`. If a style differs by size, say so.

### USAGE

Take the alternatives from the `@component` comment. Give the reason for each choice.

### ACCESSIBILITY

The accessibility frame has the details. Write the rendered element, how focus shows, and what a screen reader announces in an error or disabled state.

### Kits

A chart or table kit uses summary, IN CODE, TEXT STYLES, COLOURS and USAGE. COLOURS names each variable the kit binds, read from Figma, with the ADR 0007 or 0008 role it plays. A kit's parts get one or two sentences.

### ANTI-PATTERNS

Two or three, specific to the component, each with a reason. Don't repeat a USAGE sentence as a prohibition.

## Archetypes

| Archetype | Pages | What it gets |
| --- | --- | --- |
| Family | Buttons; form fields; overlays | A family overview frame for what the members share, and a header intro on each member's frame. `Button — family overview` covers the Button variants. `Form fields — family overview` (node `909:286874`, left of the Input row) covers what `InputWrapper` draws for Input, Select, the checkbox and radio groups and LayerControlGroup: label, hint tag, description, error message and optional marker. Their accessibility frames cover only their own control, and their ACCESSIBILITY section points to the overview. `Overlays — family overview` (node `909:288364`, left of the Tooltip row) covers the trigger, `hintLabel`, `Overlay` and when to use Tooltip, Popover or Modal |
| Light/dark pair | Components - Ui | Light frame: header intro. Dark frame: "Dark mode" label. An accessibility frame in a third column, to the right of the dark frame |
| Composite | Modal, Sidebar, Tabs, Header | The intro and the accessibility frame go on the parent. The parts get descriptions only |
| Foundation | Typography, Elevation, Colour, Spacing | Leave the existing doc frames unchanged |
| Kit, screen or layout | Charts, Tables, Maps, Application Shells, Dashboard Layouts | Descriptions on the main components. No new frames during W6c |

A frame with absolute positioning (`layoutMode` `NONE`), such as Spinner, doesn't grow with its header. List it and place its intro by hand.

## The header

Every doc frame starts with an instance of `.DS-Section-header` (node `552:16495` in ver 4.0; find it by name in a new session). Its properties:

| Property | Light frame | Dark frame | Accessibility frame |
| --- | --- | --- | --- |
| `Title` | Component name | Component name | `Accessibility: <name>` |
| `Show intro` | On | Off | On |
| `Intro` | The description's first paragraph | | The rendered element, in one sentence |
| `Show mode` | Off | On | Off |
| `Mode` | | `Dark mode` | |

When you turn `Show intro` on, set the instance's vertical sizing to hug, or the intro is clipped at 110px.

## The accessibility frame

Copy the structure of `Accessibility: Input` (node `908:283239`).

```text
<Name> — Accessibility        VERTICAL · width of the light frame · fill bound to surface
├── .DS-Section-header        Title "Accessibility: <name>", intro on
└── content                   VERTICAL · padding 40 60 60 60 · gap 48
    ├── states                VERTICAL · gap 40
    │   └── <state> × N       HORIZONTAL · gap 60
    │       ├── example       400 wide · an instance in that state
    │       └── notes         Doc/Subheading title, Doc/Body-sm text 640 wide
    └── contrast              VERTICAL · gap 16
        ├── title, intro      Doc/Subheading, Doc/Body-sm
        └── table             Part · Variable · Needs · Light · Dark
```

States: focus, error, disabled, and any state with its own ARIA, such as selected, expanded or optional. Write what the code does in each state.

Contrast: measure each part's colour against the colour behind it in both modes, resolving variable aliases for each mode. Text needs 4.5:1 (WCAG 1.4.3). A field border, a control's fill and a focus indicator need 3:1 (WCAG 1.4.11). Disabled parts are exempt (ADR 0019); leave them out of the table. Mark a ratio below its threshold with the word "below" and the `interactive/error` colour, so colour isn't the only signal. Check each failing value against `packages/themes/styles/tokens.css` and log it in SNAGS.

The Buttons page has contrast frames. Add the focus and disabled notes to them.

## Text styles and colours on the frame

Text on a doc frame uses the `Doc/*` styles, never product roles ([0010](../../../design-system-specification/decisions/0010-figma-conventions.md)). Components shown in the frame keep their own styles.

| Text | Style | Colour variable |
| --- | --- | --- |
| Intro | `Doc/Body` (set by the header) | `text` |
| Section title | `Doc/Subheading` | `text` |
| Notes | `Doc/Body-sm` | `text` |
| Table head | `Doc/Body-sm` | `text-muted` |
| Table values | `Doc/Mono` | `text` |
| Caption | `Doc/Caption` | `surface-accent` |

Bind the fill to the colour variable after setting the text style, because the style doesn't set a colour.

## Steps for each group

1. Read the code sources and the Figma components for the group. Compare them with Storybook and report differences before changing anything.
2. Write the descriptions. Run the ds-writing language review on them.
3. Set the descriptions, then the header properties on the light and dark frames.
4. Build the accessibility frame for each component that has states to show.
5. Check every frame in the group for overlap, clipped content and the gap to the next frame.
6. Take screenshots and show them before starting the next group.

## Figma plugin API

- The file uses dynamic pages, so use the async calls: `getNodeByIdAsync`, `getLocalTextStylesAsync`, `getMainComponentAsync`, `getInstancesAsync`, `figma.variables.getVariableByIdAsync`.
- `globalThis` doesn't persist between `figma_execute` calls. Put all data in each call.
- Pass `fileKey` on every call, and lock the file with `figma_navigate` before taking screenshots. If the REST screenshot fails, use `figma_capture_screenshot`, which goes through the plugin.
- `resize()` sets the primary axis to fixed. Set it back to auto if the frame should hug.
- Load the font before setting characters on a text layer, including a layer inside an instance.

## Before you finish

- Each published component has a description in the template.
- The light frame has its intro, and the dark frame has its label and no text.
- Each component with states to show has an accessibility frame.
- Contrast failures are in SNAGS.
