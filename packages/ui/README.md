# @ldn-viz/ui

Svelte components for building interfaces using the London City Data Design System (LCD-DS).

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools) documents each component's props and states. The [design system site](https://apps.london.gov.uk/city-data/design-system) explains how to apply the system.

## Install

```sh
npm i @ldn-viz/themes @ldn-viz/ui
```

The package needs `@ldn-viz/themes` and Svelte 5.33 or later.

## Set-up

Import the theme CSS in your app's main stylesheet, before the Tailwind directives:

```css
@import '@ldn-viz/themes/index.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

The components are styled with Tailwind 3 classes. Add the preset to your Tailwind config, and include the `@ldn-viz` packages in `content` so that Tailwind generates the classes they use:

```js
module.exports = {
	presets: [require('@ldn-viz/themes/tailwind')],
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@ldn-viz/*/dist/**/*.{js,svelte}']
};
```

Add the `Theme` component to your app's top-level layout. It applies light or dark mode from the user's preference, which they can change with the `ThemeSwitcher` component.

## Use

```svelte
<script>
	import { Button } from '@ldn-viz/ui';
</script>

<Button variant="solid" emphasis="primary">Download data</Button>
```

## Links

- [Storybook](https://greater-london-authority.github.io/ldn-viz-tools)
- [Design system site](https://apps.london.gov.uk/city-data/design-system)
- [Changelog](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/ui/CHANGELOG.md)

## Licence

MIT
