---
title: Colour
description: Contrast and differentiation
section: Foundations
navLabel: Colour
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-2.svg
---

<script>
	import { Callout, theme } from '@ldn-viz/ui'
    import tokens from '@ldn-viz/themes/docs/tokens/tokens.js';
    import SwatchGrid from '$lib/components/swatch/SwatchGrid.svelte'


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
  
    let themeColorsOrdered = [
            'color-data-primary', 
            'color-data-secondary',
            'color-data-tertiary',
            'color-data-context',
            'color-data-positive',
            'color-data-negative',
            'color-data-male',
            'color-data-female',
            'color-data-empty',
            'color-data-neutral-0',
            'color-data-neutral-1'
        ]

    let themeColors = $derived(getTokenByConcept('data').filter(token => themeColorsOrdered.includes(token.name)).sort((a, b) => themeColorsOrdered.indexOf(a.name) - themeColorsOrdered.indexOf(b.name)));
   
</script>

## Principles

Our colour system is rooted in the GLA brand palette. The GLA Brand palette consists of 12 different colours. Using these colours as 'seeds' the design system defines a set of colours that balance the requirements of GLA brand recognition, colour differentiation, contrast and interoperability between light and dark themes.

**Note** Throughout the documentation we use the British spelling 'colour'. In code we use the international spelling 'color' as this is the accepted standard.

### Global colour palette

The colour palette consists of 10 colours, each available in 11 different tints and shades: (color-100 to color-1100).

Perceptual uniformity is maintained within each hue in the colour palette. As a result, colours like blue-600 and darkPink-600 have identical contrast ratios when paired with the same colour.

Colours are availible in two sets specially tuned for light or dark themed applications. [See more on theming](/design-system/foundations/accessibility)

### Accessibility and contrast

WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. [See more on Accessibility](/design-system/foundations/accessibility)

## Practice

Colours should be referenced using token names. Hex values are provided here only for reference.
[See more on design tokens](/design-system/foundations/design-tokens)

### Global colour palette

The global colour palette contains the hints and shades that are used as a basis for the semantically named colour tokens. In the majority of cases you should not reference this palette directly.

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

### Semantic colour reference

<div class="not-prose">
<SwatchGrid tokenData={themeColors} title="Colors for data" size="sm"/>
<SwatchGrid tokenData={dataTokens.categorical} title="Colors for categorical data" size="sm"/>
</div>
