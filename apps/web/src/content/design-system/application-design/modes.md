---
title: Modes
description: Accessible themes respecting user preference
navLabel: Modes
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-3.svg
order: 7
---

<script>
	import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
</script>

<p class="lead text-color-text-muted">The system has one theme with two modes, light and dark. Each colour token has a value for each mode, so an application that uses the tokens can switch between them.</p>

The `Theme` and `ThemeSwitcher` components use the word 'theme' for the mode.

## User preference

Offering users the choice of light or dark mode honours their preference, which could be due to lighting conditions, accessibility needs or simply their preferred choice.

Light mode is the default in the CSS: the values on `:root` are the light values. Give users a way to switch, and to follow the mode set by their device.

<figure class="width-content-wide">
	<EnhancedImage src="/modes/mode-examples.png" alt="The same application in three arrangements: light mode with a light header, sidebar and footer; light mode with a dark header, sidebar and footer; and dark mode. Above each, the stack of canvas and surfaces in those colours" />
</figure>

## Switch the mode

<UsageTabs>
{#snippet full()}

Add the `Theme` component to your application's top-level layout. It applies the user's saved choice, or the mode set by their device, when the page loads. `ThemeSwitcher` gives the user a menu of light, dark and system, and can go anywhere in the application, such as the footer.

```svelte
<script>
	import { Theme, ThemeSwitcher } from '@ldn-viz/ui';
</script>

<Theme />
…
<ThemeSwitcher />
```

`ThemeSwitcher` needs `Theme` to be on the page.

{/snippet}
{#snippet adapting()}

The light values of the colour tokens are set on `:root`, and the dark values on `.dark`:

```css
:root { … }
:root.dark, .dark { … }
```

Add the `dark` class to the root element to switch the whole page to dark mode. Store the user's choice yourself, and read `prefers-color-scheme` to follow their device.

```html
<html class="dark">
	…
</html>
```

{/snippet}
{#snippet anywhere()}

In `@ldn-viz/themes/colors.js`, each colour's values are under `mode.light` and `mode.dark`. The [design tokens reference](/design-system/foundations/design-tokens#reference) shows both values side by side.

{/snippet}
</UsageTabs>

## Dark mode for part of a page

A `.dark` class applies dark mode to everything inside it, whatever the mode of the page. An element without a `.dark` ancestor follows the page.

```css
.text-class {
	color: var(--color-text);
}
```

```html
<div class="dark">
	<p class="text-class">I'm in dark mode, because my parent has the dark class.</p>
</div>

<div>
	<p class="text-class">I'm in light mode, unless an ancestor has the dark class.</p>
</div>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="dark bg-color-canvas p-4">
		<p class="text-color-text">I'm in dark mode, because my parent has the dark class.</p>
	</div>
	<div class="bg-color-canvas p-4">
		<p class="text-color-text">I'm in light mode, unless an ancestor has the dark class.</p>
	</div>
</div>

There is no light class, so a part of a page can't be kept in light mode while the page is dark.

### The header, sidebar and footer

`Header`, `Sidebar` and `Footer` are in dark mode by default. Set `theme="light"` on them to follow the page's mode instead, as the sidebar of this documentation does.

### Inverse colours

Content on a background of the opposite lightness, such as a light panel in dark mode, uses the `inverse` colour tokens, such as `--color-inverse-text` on `--color-inverse-surface`. [Design tokens](/design-system/foundations/design-tokens#inverse) describes the inverse variant.

## Colours outside the browser

In a medium that doesn't use CSS, such as a slide deck, use the resolved colour values from `@ldn-viz/themes/colors.js`. Everywhere else, use the tokens, so the colours change with the mode.
