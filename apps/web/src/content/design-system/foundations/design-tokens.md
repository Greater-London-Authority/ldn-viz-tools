---
title: Design Tokens
description: A single source of truth
section: Foundations
navLabel: Design Tokens
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-3.svg
---

<script>
	import { theme } from '@ldn-viz/ui';
	import tokens from '@ldn-viz/themes/docs/tokens/tokens.js';
	import TokenTable from '$lib/components/tables/colorTokenTables/TokenTable.svelte'

    const getTokenByConcept = (startKey = null, obj= tokens.mode[theme.currentMode ?? 'light']) => {
        // Determine the starting point
        let start = obj;
        if (startKey) {
            if (!(startKey in obj)) return []; // key not found
            start = obj[startKey];
        }

        // Recursive search
        const results = [];

        function recurse(current) {
            if (!current || typeof current !== 'object') return;

            if ('value' in current) results.push(current);

            for (const k in current) {
            if (typeof current[k] === 'object') {
                recurse(current[k]);
            }
            }
        }

        recurse(start);

        results.sort((a, b) => {
            const nameA = a.name?.toString().toLowerCase() || '';
            const nameB = b.name?.toString().toLowerCase() || '';
            return nameA.localeCompare(nameB);
        });

        return results;
    }

    const staticTokens = $derived(getTokenByConcept('static'))
    const canvasTokens = $derived(getTokenByConcept('canvas'))
    const containerTokens = $derived(getTokenByConcept('container'))
    const surfaceTokens = $derived(getTokenByConcept('surface'))
    const interactiveTokens = $derived(getTokenByConcept('interactive'))
	const textTokens = $derived(getTokenByConcept('text'))
    const labelTokens = $derived(getTokenByConcept('label'))
    const borderTokens = $derived(getTokenByConcept('border'))

    const geoTokens = $derived(getTokenByConcept('geo'))
    const chartTokens = $derived(getTokenByConcept('chart'))
    const dataTokens = $derived(getTokenByConcept('data'))

</script>

## Principles

Design tokens are the single source of truth for naming and storing design decisions such as colours, typography, spacing, and more. They ensure consistency, scalability, and maintainability across all our applications.

### Token Tiers

Tokens are defined in two tiers with reference to a raw value.

![An image illustrating the conceptual hierarchy of design tokens](/design-tokens/tiers.png)

#### Primitive

Primitive tokens represent all available **options** within the system. These tokens should not be directly referenced in an application.

#### Semantic

Semantic tokens encapsulate **design decisions** giving an understandable intent to the raw value defined in a primitive token.

Semantic colour tokens allow for mode switching between light and dark, as each semantic token is associated with a primitive value for both modes.

### Token names

Tokens are named following a logical structure that flows from left to right to make it simple to understand how they should be used.

`(tier) -> category -> variant -> concept -> role -> emphasis -> state`

Token names don't need to contain every element of this convention.

`category -> concept`

is the minimum required:

```html
<!-- // category - concept -->
$color-text

<!-- // category - concept - emphasis -->
$color-text-muted

<!-- // category - concept - role - emphasis -->
$color-surface-positive-muted
```

**Implied defaults**
We do not enforce a 'default' keyword for default values. For example the correct token to apply the default text colour is `$color-text` rather than `$color-text-default`

Following our naming convention ensures that each token is clearly defined and easily understandable.

**Notation** The `$` prefix used above denotes a token rather than an implementation of one. The values of design tokens can be accessed in different forms in different contexts: as custom properties in CSS stylesheets, utility classes in Tailwind projects, and variables within Figma. The Practice section below shows how each form is written in code.

[Read the Practice section for more on token use](#practice) and a full listing of available tokens.

#### Category

Token categories are **color**, **spacing**, **typography**, **flow** and **grid**

| Category     | Detail                                                                                                                                                              |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color`      | Semantic colour tokens enable mode switching. They encode the fundamental design decisions for colour and have been tested to conform with accessibility standards. |
| `spacing`    | Spacing tokens are used to give a consistent rhythm and flow to our user interfaces.                                                                                |
| `typography` | Typography tokens define font family, size, weight, line-height and letter-spacing for text and typographic elements.                                               |
| `flow`       | Flow tokens hold the vertical space between stacked blocks, as a set of four relationships resolved per context.                                                    |
| `grid`       | Grid tokens hold the horizontal structure of a layout — the gutter between columns and the padding at the edge of a container, per breakpoint.                      |

#### Variant

Many colour tokens are defined with an **inverse** counterpart that is used to invert the current light/ dark mode. This usage is different from mode switching at an application level.

| Variant   | Details                                                         |
| :-------- | :-------------------------------------------------------------- |
| `inverse` | Applies a colour that is inverse to the currently selected mode |

![Swatches showing tokens with inverse variant in light and dark mode](/design-tokens/inverse-variant.png)

#### Concept

The token **concept** guides us in how to apply the token. For colour tokens, values include **brand**, **text** and **surface**. These are conceptual groupings of elements and **_not_** specific components. For example the **_canvas_** element is an abstract surface, not inherently an HTML `<canvas>` element. Our semantic tokens are designed to emphasise meaning over mechanics.

![An isometric illustration showing a user interface structured as conceptual layers raising towards the user](/design-tokens/mental-model.svg)

<figcaption>Conceptual model of application ui layering</figcaption>

| Concept       | Detail                                                          |
| :------------ | :-------------------------------------------------------------- |
| `static`      | Colours that stay the same regardless of mode                   |
| `canvas`      | The base layer of an application                                |
| `container`   | Containers are organisational elements that form page structure |
| `surface`     | Information layer that sits in front of the canvas layer        |
| `interactive` | Objects on the information layer that are interactive           |
| `text`        | Text elements                                                   |
| `label`       | Specific text used for labelling                                |
| `border`      | Borders around surfaces and containers                          |

Icons take the colour of the element they sit in rather than having a concept of their own. An icon on a filled control uses the inverse text token, and an icon beside a label uses the same token as the label.

**Component-type exceptions**

The system deliberately avoids component tier tokens with the exception of tokens for charts and geographic features. Rather than extending the naming hierarchy these tokens are group-prefixed at the 'concept' level.

| Concept         | Detail                                                       |
| :-------------- | :----------------------------------------------------------- |
| `chart-surface` | The base layer of a chart                                    |
| `chart-axis`    | The colour of chart axes                                     |
| `chart-grid`    | Grid-line elements for charts                                |
| `chart-label`   | Label elements for use on charts, with a `muted` counterpart |

These describe chart _chrome_ — the scaffold around the data. The colour of the data itself comes from the `data` concept, listed in the reference tables below.

| Concept           | Detail                                                                                     |
| :---------------- | :----------------------------------------------------------------------------------------- |
| `geo-feature`     | A geographic feature, with a `muted` counterpart                                           |
| `geo-interactive` | Geographic elements that are interactive, carrying the full set of states                  |
| `geo-label`       | Label elements for use with maps and geographic visualisations, with a `muted` counterpart |
| `geo-annotation`  | Annotations over maps and geographic visualisations, with a `muted` counterpart            |

Both `chart-*` and `geo-*` have an `inverse` variant for use against an inverted background.

#### Role

The **role** signifies _intent_. Roles **primary**, **secondary** define a hierarchical role. **Positive**, **negative**, **caution** define a feedback role.

| Role        | Detail                                                                          |
| :---------- | :------------------------------------------------------------------------------ |
| `primary`   | Ranking first in importance or consideration over others                        |
| `secondary` | Supporting or less critical                                                     |
| `positive`  | Success and confirmation                                                        |
| `negative`  | Errors and danger                                                               |
| `caution`   | Warnings and potential hazards                                                  |
| `neutral`   | Informational or inactive (this is different from `disabled` which is stateful) |

`primary` and `secondary` appear on interactive elements. The feedback roles appear on surfaces as well, as tinted status backgrounds. `neutral` is a surface and data role rather than an interactive one — an interactive element that is inactive takes the `disabled` state.

#### Emphasis

The majority of colour tokens are defined with a **muted** counterpart which lets us create further visual hierarchy in our designs.

| Emphasis | Detail                                 |
| :------- | :------------------------------------- |
| `muted`  | Reduces the emphasis of colour         |
| `wash`   | Reduces the emphasis of colour further |

`muted` is available across most concepts. `wash` is a third step for text only, where a reading hierarchy needs more than two levels.

**Container level exception**

`$container-*` tokens, applied to organisational elements that form page structure, use a `level-*` modifier to give them relative distance from the canvas.

<div class="grid grid-cols-4 grid-gutter">
    <div class="flex flex-col space-y-1">
        <div class="bg-color-container h-8 w-full"></div><code>$color-container</code>
    </div>
    <div class="flex flex-col space-y-1">
        <div class="bg-color-container-level-1 h-8 w-full"></div><code>$color-container-level-1</code>
    </div>
    <div class="flex flex-col space-y-1">
        <div class="bg-color-container-level-2 h-8 w-full"></div><code>$color-container-level-2</code>
    </div>
    <div class="flex flex-col space-y-1">
        <div class="bg-color-container-level-3 h-8 w-full"></div><code>$color-container-level-3</code>
    </div>
</div>

| Emphasis  | Detail                                      |
| :-------- | :------------------------------------------ |
| `level-1` | One level of elevation above the default    |
| `level-2` | Two levels of elevation above the default   |
| `level-3` | Three levels of elevation above the default |

#### State

Interactive elements have states such as **hover**, **active**, **focus**, **disabled**

| State      | Detail                                                                                                                  |
| :--------- | :---------------------------------------------------------------------------------------------------------------------- |
| `hover`    | Triggered when a user places a cursor over an element without clicking it.                                              |
| `active`   | Occurs at the exact moment an element is being pressed or clicked.                                                      |
| `focus`    | Indicates an element is currently highlighted to receive input, typically via keyboard navigation (Tab key) or a click. |
| `selected` | Represents a persistent choice made by the user among several options                                                   |
| `disabled` | Indicates an element exists but is currently non-interactive and cannot be used.                                        |
| `error`    | Signals that a user's input is invalid or that a system failure has occurred.                                           |
| `on`       | Represents the "active" or "enabled" state of a binary toggle or switch.                                                |
| `off`      | Represents the "inactive" or "disabled" state of a binary toggle or switch.                                             |
| `dragged`  | Occurs when a user clicks and moves an element from its original position to another.                                   |

---

### Spacing Tokens

The structure of our spacing tokens is a numbered scale, where the index is the multiplier of the 4px base unit (`$spacing-4` = 4 × 4px = 16px). Naming the step by its multiplier rather than by a size word means the relationship between two steps can be read from the names.

The scale is dense at the lower end, where most interface spacing sits, and thins out above 32px where a finer distinction would not be perceived:

| Whole steps                     | Value        |
| :------------------------------ | :----------- |
| `1` `2` `3` `4` `5` `6` `7` `8` | 4px to 32px  |
| `10` `12` `14` `16`             | 40px to 64px |
| `20` `24`                       | 80px, 96px   |

The intermediate indices are deliberately absent — there is no `9`, `11` or `13`. Four sub-steps cover finer gaps below the base unit, alongside a single-pixel step: `px`, `0-5`, `1-5`, `2-5` and `3-5`, giving 1px, 2px, 6px, 10px and 14px.

Spacing tokens define the spacing between and around elements of the application interface, and are expressed in `rem` units based on the root `<html>` font size.

```css
--spacing-4: 1rem;
```

Vertical rhythm between stacked blocks — paragraph to paragraph, or the break above a section heading comes from the flow tokens described below, and is dependant on the density context.

[Read more about relative units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units#lengths)

[Read the documentation on application layout](/design-system/application-design/layout)

---

### Flow tokens

Flow tokens define the vertical space between one block and the next. Rather than a scale of sizes, they are four **relationships**, describing how closely two stacked blocks sit together.

| Token           | The relationship it describes                             |
| :-------------- | :-------------------------------------------------------- |
| `$flow-tight`   | Two things that belong together — a caption and its image |
| `$flow-default` | The ordinary gap between one block and the next           |
| `$flow-loose`   | Deliberate breathing room, as around a figure or a chart  |
| `$flow-section` | A major break, as above a heading beginning a new part    |

The distance each one produces is decided by the **context** it is used in. Three contexts are defined — `prose`, `product` and `compact` — each mapping the same four relationships onto different rungs of the spacing scale. A relationship therefore travels with the content, while the density travels with the surface.

Because a token here names a relationship rather than a specific size, a value should never be substituted for one. Using a spacing token where a flow token belongs pins that one gap to a fixed distance, and it will no longer follow when the surface around it changes.

[Read the chapter dedicated to content flow for the values and their use](/design-system/foundations/flow).

---

### Grid tokens

Grid tokens define the horizontal structure of a layout: the gutter between columns, and the padding at the edge of a container.

These are the source of the space between tiled objects — cards in a row, panels side by side. That space belongs to the grid rather than to the objects in it.

[Read the documentation on application layout for the values](/design-system/application-design/layout).

---

### Typography tokens

#### Role

A typographic role names the job a piece of text does and contains every property that job requires: font family, size, weight, line-height and letter-spacing. Roles hold a value at each breakpoint and resolve themselves as the viewport changes, so a descriptive name is all an author needs.

#### Type set

Roles are grouped into three **type sets**, one for each kind of surface.

| Type set  | Intended for                                                 |
| :-------- | :----------------------------------------------------------- |
| `product` | Applications and dashboards, where information is condensed  |
| `prose`   | Long passages of reading — articles, guidance, documentation |
| `chart`   | Text in and around a chart                                   |

A set defines only the roles its surface needs, so the three do not hold the same list. Several role names appear in more than one set as the same job in a different reading situation takes a different treatment, not a different name.

| `product`      | `prose`             | `chart`      |
| :------------- | :------------------ | :----------- |
| `page-head`    | `display`           | `title`      |
| `section-head` | `headline`          | `subtitle`   |
| `title`        | `subhead`           | `eyebrow`    |
| `subtitle`     | `title-1`–`title-4` | `axis-title` |
| `eyebrow`      | `subtitle`          | `label`      |
| `metric`       | `lead`              | `tick`       |
| `metric-sm`    | `body`              | `tick-sm`    |
| `body`         | `body-sm`           |              |
| `body-sm`      | `caption`           |              |
| `label`        | `eyebrow`           |              |
| `label-sm`     |                     |              |
| `caption`      |                     |              |

#### Variants

Two suffixes recur. Neither is a general scale that can be applied to any role.

| Suffix  | Detail                                                                                                 |
| :------ | :----------------------------------------------------------------------------------------------------- |
| `sm`    | A smaller sibling of a role, for a denser context.                                                     |
| `tight` | A `label` or `label-sm` with its line-height reduced to match the font size, for single-line controls. |

[Read the chapter dedicated to typography for the values and their use](/design-system/foundations/typography).

---

## Practice

### Semantic token reference tables

<TokenTable title="Static" tokenData={staticTokens} />
<TokenTable title="Canvas" tokenData={canvasTokens} />
<TokenTable title="Container" tokenData={containerTokens} />
<TokenTable title="Surface" tokenData={surfaceTokens} />
<TokenTable title="Interactive" tokenData={interactiveTokens} />
<TokenTable title="Text" tokenData={textTokens} />
<TokenTable title="Label" tokenData={labelTokens} />
<TokenTable title="Border" tokenData={borderTokens} />
<TokenTable title="Geo" tokenData={geoTokens} />
<TokenTable title="Chart" tokenData={chartTokens} />
<TokenTable title="Data" tokenData={dataTokens} />

### Using tokens in code

A token reaches code in three forms: Tailwind utility classes, CSS custom properties and as a Javascript object. Which one you use depends on the project rather than on the token — the decision it encapsulates is the same.

#### Tailwind utility classes

In a project using `@ldn-viz/themes` as a Tailwind preset, tokens are available through Tailwind's utility patterns.

The token name follows the utility prefix eg:

`text-` (utility prefix) `color-text` (token reference)

```html
<p class="body text-color-text">Default text on a container</p>
<div class="border border-color-border bg-color-container">…</div>
```

Spacing follows the same pattern, using the numbered scale: `p-4` applies 16px of padding, `mt-2` an 8px top margin.

Flow relationships have their own utilities, `mt-flow-{relationship}` and `gap-flow-{relationship}`.

Typographic roles are applied as the bare role name — `body`, `title`, `label`.

#### CSS custom properties

Where the tokens are consumed as CSS rather than through Tailwind, each is a custom property named after the token, prefixed `--`:

```css
color: var(--color-text-muted);
padding: var(--spacing-4);
margin-top: var(--flow-section);
```

The stylesheets are imported from the themes package. Colour, spacing, flow and grid each have their own file.

#### JavaScript

Colour tokens are also published as a JavaScript object, for cases where a value has to be passed to a library rather than declared in CSS — a chart's series colours, for instance. Step into the relevant mode, then follow the token name:

```js
import tokens from '@ldn-viz/themes/styles/js/color-tokens.js';

const seriesColor = tokens.mode.light.data.categorical.blue;
```

The mode should be selected programmatically from the application's current theme rather than hard-coded, so that a value passed to a library follows a mode switch in the same way a CSS token does.

**Note:** a token with no emphasis suffix appears under the key `default`.
