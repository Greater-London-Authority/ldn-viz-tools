---
title: Colour
description: Contrast and differentiation
section: Foundations
navLabel: Colour
---

<script>
	import { Callout, theme } from '@ldn-viz/ui'
    import tokens from '@ldn-viz/themes/docs/tokens/tokens.js';
    import SwatchGrid from '$lib/components/swatch/SwatchGrid.svelte'

    let paletteTokens = $derived(
        Object.fromEntries(
            Object.entries(
                tokens.mode[theme.currentMode ?? 'light'].palette
            ).map(([key, value]) => [
                key,
                { ...value }
            ])
        )
	);

    let dataTokens = $derived(
        Object.fromEntries(
            Object.entries(
                tokens.mode[theme.currentMode ?? 'light'].data
            ).map(([key, value]) => [
                key,
                { ...value }
            ])
        )
	);
  
   
</script>

## Principles

Our colour system is rooted in the GLA brand palette. The GLA Brand palette consists of 12 different colors. Using these colours as 'seeds' the design system defines a set of colors that balance the requirements of GLA brand recognition, color differentiation, contrast and interoperability between light and dark themes.

### Global colour palette

The color palette consists of 10 colors, each available in 11 different tints and shades: (color-100 to color-1100).

Perceptual uniformity is maintained within each hue in the color palette. As a result, colors like blue-600 and darkPink-600 have identical contrast ratios when paired with the same color.

Colours are availible in two sets specially tuned for light or dark themed applications. [See more on theming](/design-system/foundations/accessibility)

### Accessibility and contrast

WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. [See more on Accessibility](/design-system/foundations/accessibility)

## Practice

Colors should be referenced using token names. Hex values are provided here only for reference.
[See more on design tokens](/design-system/foundations/design-tokens)

### Global color palette

The global color palette contains the hints and shades that are used as a basis for the semantically named color tokens. In the majority of cases you should not reference this palette directly.

**Do:**

```html
<p class="text-color-text">Use of a semantic class token</p>
```

**Don't:**

```html
<p class="text-color-palette-grey-900">Use of a global class token</p>
```

<div class="not-prose py-spacing-xl">
<SwatchGrid tokenData={paletteTokens.grey} title="Grey" size="xs" />
<SwatchGrid tokenData={paletteTokens.blue} title="Blue" size="xs" />
<SwatchGrid tokenData={paletteTokens.green} title="Green" size="xs" />
<SwatchGrid tokenData={paletteTokens.yellow} title="Yellow" size="xs" />
<SwatchGrid tokenData={paletteTokens.orange} title="Orange" size="xs" />
<SwatchGrid tokenData={paletteTokens.red} title="Red" size="xs" />
<SwatchGrid tokenData={paletteTokens.pink} title="Pink" size="xs" />
<SwatchGrid tokenData={paletteTokens.darkpink} title="Dark Pink" size="xs" />
<SwatchGrid tokenData={paletteTokens.purple} title="Purple" size="xs" />
<SwatchGrid tokenData={paletteTokens.turquoise} title="Turquoise" size="xs" />
</div>

### Semantic color reference

<div class="not-prose">

<SwatchGrid tokenData={dataTokens.categorical} title="Colors for categorical data"/>

</div>
