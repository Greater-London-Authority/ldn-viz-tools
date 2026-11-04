# @ldn-viz/charts

Svelte components for charts, styled with the London City Data Design System (LCD-DS). The package wraps [Observable Plot](https://observablehq.com/plot/) with the system's default styles, and provides `ChartContainer`, which adds a title, subtitle, notes, a text description and download buttons around a chart.

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools) documents each component and has chart examples. The [design system site](https://apps.london.gov.uk/city-data/design-system) has guidance on data visualisation.

## Install

```sh
npm i @ldn-viz/themes @ldn-viz/charts
```

The package needs `@ldn-viz/themes` and Svelte 5.33 or later. Set up the theme CSS and the Tailwind preset as described in [`@ldn-viz/ui`](https://www.npmjs.com/package/@ldn-viz/ui).

## Use

Import `Plot` from `@ldn-viz/charts`, not from `@observablehq/plot`, so that marks take the system's styles. Draw the axes with `Plot.axisX()` and `Plot.axisY()`. Axes that Observable Plot creates for you use its own styles.

```svelte
<script>
	import { ObservablePlot, Plot } from '@ldn-viz/charts';

	let { data } = $props();

	const spec = {
		marks: [
			Plot.axisX({ label: 'Year' }),
			Plot.axisY({ label: 'Value' }),
			Plot.line(data, { x: 'year', y: 'value' })
		]
	};
</script>

<ObservablePlot
	{spec}
	title="Value has fallen since 2017"
	subTitle="London, 2015 to 2024"
	alt="Line chart of value by year"
	source="GLA City Intelligence"
/>
```

Give every chart an `alt` text. To put several plots in one container, use `ChartContainer` with `ObservablePlotInner`.

## Links

- [Storybook](https://greater-london-authority.github.io/ldn-viz-tools)
- [Design system site: data visualisation](https://apps.london.gov.uk/city-data/design-system)
- [Changelog](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/charts/CHANGELOG.md)

## Licence

MIT
