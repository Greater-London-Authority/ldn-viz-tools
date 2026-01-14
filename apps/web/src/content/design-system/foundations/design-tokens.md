---
title: Design Tokens
description: A single source of truth
section: Foundations
navLabel: Design Tokens
---

<script>
	import { Callout, theme } from '@ldn-viz/ui'
</script>

## Principles

Design tokens are the single source of truth for naming and storing design decisions such as colors, typography, spacing, and more. They ensure consistency, scalability, and maintainability across all our applications.

We have developed our token taxonomy to be:

- Easy to understand
- A straight-forward structure that can be reproduced as variables in Figma, css and Javascript

Our objective is to:

- Keep the number of tokens (and therefore the choices) contained
- Keep a clear rationale to identify correct token use

### Token names

Tokens are named following an object-orientated taxonomy.
Each token name is made up from a maximum of 5 words that describe how and where to apply the token

<code>(category)-[type-element-property-(purpose/condition)-emphasis-(size/scale)-state]</code>

Following our naming convention ensures that each token is clearly defined and easily understandable.

[Read the Practice section for more on token use](#practice) and a full listing of available tokens.

#### Category

Tokens are categorised at the top level into: **Global**, **Semantic**, **Spacing** and **Typography**

The key differentiation is between **Global** and other tokens. Although it is important to understand this top level categorisation it is not usually referenced as part of token use.

<div class="ml-8">

##### Global

Think of **Global** tokens as the **_well_** from which values are drawn and poured into other tokens.
As a general rule you should not need to directly reference tokens in the **Global** category. Direct reference of global tokens usually indicates an mis-application of token logic.

##### Semantic

Tokens in the **Semantic** category are those most often referenced as part of development. Semantic tokens give an understandable intent to the raw value defined in a global token. In our system semantic color tokens are responsible for theme switching between light and dark.

</div>

#### Type

The token **type** is how we know what the token controls. Values can be `color`, `spacing`, `typography`

#### Element

This defines the target element of the token. These are conceptual groupings of elements and **_not_** components. This is an important distinction as we have actively tried to avoid component level tokens. For example the **_canvas_** element is an abstract surface, not inherently an HTML `<canvas>` element. Our semantic tokens are designed to emphasise meaning over mechanics.

#### Property

The specific property being targeted by the token eg. `border`

#### Purpose/ condition

The purpose defines the intent of the target element eg. `notice`.
Condition is used to define a changed condition eg. `negative`

#### Emphasis

Emphasis values are most commonly `primary` or `secondary`

#### Size/ Scale

Size ranges from `xxs, xs, sm, md, lg...` to `8xl`.

Scales can be numbered `100, 200...` as in the case of color shades. Or can be 0 index numbers `0, 1, 2...`

#### State

Only applicable to certain stateful elements. `on`, `off`, `active` etc.

### Bringing it together

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

`$color-action-primary-hovered` - Its a color token representing an element inviting action with primary emphasis that is in a hovered state

## Practice

### Via npm using tailwind

If using the `@ldn-viz` package via npm in a project using tailwind css our tokens are accessible as part of tailwind's utility class pattern.

`text-($token-name)` will apply the token to text elements. `bg-($token-name)` will apply the token to the background element etc.

In the two examples above `text-color-text-primary` and `bg-color-container-level-0` show tokens applied via tailwind classes.

Spacing tokens are available in the same patter: `mb-spacing-lg` will apply the `$spacing-large` token to the bottom margin of the targeted html element.

### CSS variables

If using as css variables the color tokens can be used by replacing the color type with `theme`

```css
color: var(--theme-text-primary);
```

### As Javascript variables

Color Tokens are available from `@ldn-viz/themes` package and can be accessed under both light and dark themes. You need to step into the relevant theme object `[theme][mode]` (this should be handled programmatically by your app) then you can access the token variable under the regular naming convention:

```js
let color = color.data.categorical.blue;
```
