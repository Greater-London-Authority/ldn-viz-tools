<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/** These are example `Histogram` charts using default plot styles.
	 *
	 * By default, charts (and their inner details) are hidden from screen readers to improve the accessibility experience. Instead, it's crtitical we use a descriptive `title`, `subTitle`, `alt`, `chartDescription` and surrounding document text, so all users understand what the chart shows and gain the same insight. We should also link to the data where possible.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/Histogram',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import { demoBins } from '../../data/demoData';
	import { Plot } from '../observablePlotFragments/plot';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	// Spec and data for histogram example (default)
	let histogramSpec = $derived({
		marginTop: 48, // adjust for y label
		x: { insetLeft: 80, insetRight: 20 },
		marks: [
			Plot.gridX(),
			Plot.gridY(),
			Plot.axisX({ label: 'Random Value Range' }),
			Plot.axisY({ label: 'Frequency of value' }),
			Plot.rectY(demoBins, {
				x1: 'x0',
				x2: 'x1',
				y: 'length',
				tip: {
					channels: {
						Frequency: 'length'
					},
					format: {
						y: false
					}
				}
			}),
			// baseline last
			Plot.ruleY([0])
		]
	});
</script>

<!--
```html
<script>
	import { format } from 'd3';
	import { Plot } from '../observablePlotFragments/plot';

	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import { multiVariableData, demoBins } from '../../data/demoData';
	let currentTheme = $derived(currentThemeObj.currentTheme);

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for single line example (default)
	let histogramSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.line(demoBins, {
				x: 'Month',
				y: 'Value',
				tip: true
			})
		]
	});
</script>

<ObservablePlot
    spec={histogramSpec}
    data={demoBins}
    title="Using the RectY mark to create a histogram that shows random values conform to a normal distribution"
    subTitle="1000 randomly generated and binned values"
    alt="Histogram chart of 1000 randomly generated values"
    byline="GLA City Intelligence"
    source="LDN Viz Tools Demo Data"
    note="Data for demonstration only"
    chartDescription="The histogram chart shows 1000 randomly generated and binned values in a normal distribution. The x axis ranges in value from -3.0 to 4.0 and the y axis ranges in frequency from 0 to 150."
/>
```
-->

<Story name="Default">
	{#snippet template()}
		<ObservablePlot
			spec={histogramSpec}
			data={demoBins}
			title="Using the RectY mark to create a histogram that shows random values conform to a normal distribution"
			subTitle="1000 randomly generated and binned values"
			alt="Histogram chart of 1000 randomly generated values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The histogram chart shows 1000 randomly generated and binned values in a normal distribution. The x axis ranges in value from -3.0 to 4.0 and the y axis ranges in frequency from 0 to 150. Values between 0 and 0.5 occur 193 times (highest frequency)."
		/>
	{/snippet}
</Story>
