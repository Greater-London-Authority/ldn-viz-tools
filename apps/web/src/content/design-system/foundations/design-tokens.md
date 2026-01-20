---
title: Design Tokens
description: A single source of truth
section: Foundations
navLabel: Design Tokens
---

<script>
	import { Callout, theme } from '@ldn-viz/ui'

	//images
	import  tiers  from '$lib/assets/design-tokens/tiers.png'
	import  mentalModel  from '$lib/assets/design-tokens/mental-model.png'
	import  inverseVariant  from '$lib/assets/design-tokens/inverse-variant.png'
</script>

## Principles

Design tokens are the single source of truth for naming and storing design decisions such as colors, typography, spacing, and more. They ensure consistency, scalability, and maintainability across all our applications.

### Token Tiers

Tokens are defined in two tiers.

<div class="px-4">
	<img alt="Tokens divided into tiers" src={tiers} />
</div>

#### Primitive

Primitive tokens represent all available **options** within the system. These tokens should not be directly referenced in an application. Think of **primitive** tokens as the well from which values are drawn and poured into other tokens.

#### Semantic

Semantic tokens encapsulate **design decisions** giving an understandable intent to the raw value defined in a primitive token.

Semantic color tokens allow for mode switching between light and dark.

### Token names

Tokens are named following a logical taxonomy structure that flows from left to right in an ascending order of specificity. `(category-> concept -> role -> emphasis -> state -> mode)`

**Implied defaults**
We do not enforce a 'default' keyword for default values. For example the correct token to apply the default text color is `$color-text` rather than `$color-text-default`

Following our naming convention ensures that each token is clearly defined and easily understandable.

[Read the Practice section for more on token use](#practice) and a full listing of available tokens.

#### Category

Tokens categories are **color**, **spacing** and **typography**

| Category     | Detail                                                                                                                                                            |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`      | Semantic color tokens enable mode switching. They encode the fundamental design decisions for color and have been tested to conform with accessibility standards. |
| `spacing`    | Spacing tokens are used to give a consistent rhythm and flow to our user interfaces.                                                                              |
| `typography` | Typography tokens define fonts, size, line-height and spacing for text and typographic elements.                                                                  |

The following applies to tokens in the color category. Spacing and Typography are documented subsequently.

#### Concept

The token **concept** guides us in how to apply the token. For color tokens values include **brand**, **text** and **surface**. These are conceptual groupings of elements and **_not_** specific components. For example the **_canvas_** element is an abstract surface, not inherently an HTML `<canvas>` element. Our semantic tokens are designed to emphasise meaning over mechanics.

##### Conceptual model of application ui layering

<img alt="An isomorphic illustration showing a user interface structured as conceptual layers raising towards the user" src={mentalModel} />

| Concept               | Detail                                                                   |
| :-------------------- | :----------------------------------------------------------------------- |
| `brand`               | The consistent color used for brand reinforcement                        |
| `canvas`              | The base layer of an application                                         |
| `container`           | Containers are organisational elements that form page structure          |
| `surface`             | Information layer that conceptually sitting in front of the canvas layer |
| `surface-interactive` | Objects on the information layer that afford user interaction            |
| `text`                | Text elements                                                            |
| `label`               | Specific text used for labelling                                         |
| `icon`                | Icons                                                                    |
| `border`              | Borders around surfaces and containers                                   |

##### Component-type exceptions

The system eschews component tier tokens with the exception of tokens for charts and geographic features. Rather than extending the naming hierarchy these tokens are group-prefixed at the 'concept' level.

| Concept        | Detail                           |
| :------------- | :------------------------------- |
| `chart-canvas` | The base layer of a chart        |
| `chart-axis`   | The color of chart axes          |
| `chart-grid`   | Grid-line element fo charts      |
| `chart-label`  | Label elements for use on charts |

| Concept                   | Detail                                                         |
| :------------------------ | :------------------------------------------------------------- |
| `geo-feature`             | A geographic feature                                           |
| `geo-feature-interactive` | Geographic features that afford user interaction               |
| `geo-label`               | Label elements for use with maps and geographic visualisations |
| `geo-annotation`          | Annotations over maps and geographic visualisations            |

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

#### Emphasis

The majority of color tokens are defined with a **muted** counterpart which lets us create further visual hierarchy in our designs.

| Emphasis | Detail                                |
| :------- | :------------------------------------ |
| `muted`  | Reduces the emphasis of color         |
| `wash`   | Reduces the emphasis of color further |

##### Container level exception

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

#### Variant

Many color tokens are defined with an **inverse** counterpart that is used to invert the current light/ dark mode. This usage is different from mode switching at an application level.

| Variant   | Details                                                         |
| :-------- | :-------------------------------------------------------------- |
| `inverse` | Applies a colour that is inverse to the currently selected mode |

<div class="px-4">
	<img alt="Swatches showing tokens with inverse variant in light and dark mode" src={inverseVariant} />
</div>

### Spacing Tokens

`category === spacing`

The structure of our spacing tokens is relatively simple. They run from **xxs, xs, sm, md, lg...** though to **8xl**

### Typography tokens

`category === typography`

#### Role

Typographic roles are responsive to screen size allowing use of semantic, descriptive names. The definitions encompass font-family, font-size, font-weight, line-height and letter-spacing.

The different role groupings are:

| Role       | Use Case                                                                                 |
| :--------- | :--------------------------------------------------------------------------------------- |
| `Display`  | Large, impactful text for grabbing attention                                             |
| `Headline` | To create immediate impact and guide the reader's eye                                    |
| `Subhead`  | To immediately follow a headline and provide further clarification                       |
| `Title`    | To provide waymarkers, define hierarchy and impart information throughout an application |
| `Subtitle` | To immediately follow a title element and provide further clarification                  |
| `Body`     | Passages of copy and bodies of text                                                      |
| `Label`    | Used for single-line scenarios, and labelling discrete elements of the ui                |

#### Emphasis

Certain roles have an emphasis scale that can be applied.

| Emphasis | Detail      |
| :------- | :---------- |
| `lg`     | Large       |
| `md`     | Medium      |
| `sm`     | Small       |
| `xs`     | Extra small |

[Read the chapter dedicated to typography for more details](/design-system/foundations/typography).

<!-- ### Bringing it together

#### Example one

The color token for a container at level 0 is: `$color-container-level-0`

`$color` - Its a color token

`$color-container` - Its a color token representing a container element

`$color-container-level-0` - Its a color token representing a container element at level 0

#### Example two

The color for primary text is: `$color-text-primary`

`$color` - Its a color token

`$color-text` - Its a color token representing a text element

`$color-container-primary` - Its a color token representing a text element with primary emphasis

#### Example three

The color token for an element that invites a user to take a primary action is: `$color-action-primary`

`$color` - Its a color token

`$color-action` - Its a color token representing an element inviting action

`$color-action-primary` - Its a color token representing an element inviting action with primary emphasis

As actions are usually stateful there are also modifier tokens:

`$color-action-primary-hovered` - Its a color token representing an element inviting action with primary emphasis that is in a hovered state -->

## Practice

<!-- ### Via npm using tailwind

If using the `@ldn-viz` package via npm in a project using tailwind css our tokens are accessible as part of tailwind's utility class pattern.

`text-($token-name)` will apply the token to text elements. `bg-($token-name)` will apply the token to the background element etc.

In the two examples above `text-color-text-primary` and `bg-color-container-level-0` show tokens applied via tailwind classes.

Spacing tokens are available in the same pattern: `mb-spacing-lg` will apply the `$spacing-large` token to the bottom margin of the targeted html element.

### CSS variables

If using as css variables the color tokens can be used by replacing the color type with `theme`

```css
color: var(--theme-text-primary);
```

### As Javascript variables

Color Tokens are available from `@ldn-viz/themes` package and can be accessed under both light and dark themes. You need to step into the relevant theme object `[theme][mode]` (this should be handled programmatically by your app) then you can access the token variable under the regular naming convention:

```js
let color = color.data.categorical.blue;
``` -->
