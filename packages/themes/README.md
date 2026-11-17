# @ldn-viz/themes

The design tokens and CSS for the London City Data Design System (LCD-DS).

It is used by the other `@ldn-viz` packages, but can also be used without them (and without needing Tailwind or any other framework).

The [design system site](https://apps.london.gov.uk/city-data/design-system) explains the tokens, type, flow, layout and colour, and how to apply them.

## Install

```sh
npm i @ldn-viz/themes
```

## Set-ups

| Set-up      | Import                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Full system | `@import '@ldn-viz/themes/index.css';`, plus the Tailwind preset if the app uses Tailwind           |
| Tokens only | `@import '@ldn-viz/themes/tokens.css';`                                                             |
| Values only | `import colors from '@ldn-viz/themes/colors.js';`, or `@use '@ldn-viz/themes/tokens.scss';` in Sass |

In a Tailwind app, import `index.css` before the `@tailwind` directives, so that a utility class overrides a system class:

```css
@import '@ldn-viz/themes/index.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

and add the preset to your Tailwind config:

```js
module.exports = {
	presets: [require('@ldn-viz/themes/tailwind')]
};
```

The preset maps Tailwind's colours, spacing, shadows and font families to the tokens, so `bg-color-surface` uses `--color-surface`.
It also removes Tailwind's default font sizes, weights and line heights: apply role classes such as `body-md`.

Alternatively, rather than installing the package from NPM, you could load `index.css` from a CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/@ldn-viz/themes@10/styles/index.css" rel="stylesheet" />
```

## Files

| File          | Contains                                                                         |
| ------------- | -------------------------------------------------------------------------------- |
| `tokens.css`  | Every design token as a CSS custom property                                      |
| `system.css`  | The system's classes, such as the typesets, type roles, flow contexts and layout |
| `reset.css`   | Default styles for HTML elements, at zero specificity                            |
| `index.css`   | All three, in the order reset, tokens, classes                                   |
| `tailwind`    | The Tailwind 3 preset                                                            |
| `colors.js`   | Every colour, with the colours for each mode under `mode.light` and `mode.dark`  |
| `tokens.scss` | Every token as a Sass variable                                                   |

Light values are set on `:root`, and dark values on `.dark`. To switch to dark mode, add the `dark` class to the root element.

The system uses the Inter font. This package doesn't load it, so add it to your app, for example from [Google Fonts](https://fonts.google.com/specimen/Inter).

## Upgrading

Version 10 is the first release of LCD-DS version 4. It changes how the package is imported and renames some tokens and classes. [MIGRATION.md](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/themes/MIGRATION.md) lists each change and what replaces it.

## Links

- [Design system site](https://apps.london.gov.uk/city-data/design-system)
- [Storybook](https://greater-london-authority.github.io/ldn-viz-tools), with the Typography and Flow references
- [Changelog](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/themes/CHANGELOG.md)

## Licence

MIT
