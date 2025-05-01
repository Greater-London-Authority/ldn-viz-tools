<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/** This is an example `BarChart` chart using default plot styles.
	 *
	 * By default, charts (and their inner details) are hidden from screen readers to improve the accessibility experience. Instead, it's crtitical we use a descriptive `title`, `subTitle`, `alt`, `chartDescription` and surrounding document text, so all users understand what the chart shows and gain the same insight. We should also link to the data where possible.
	 */

	export const meta = {
		title: 'Charts/Example Charts/BarChart'
	};
</script>

<script lang="ts">
	import { currentTheme } from '@ldn-viz/ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { groupBy, map, mean, summarize, tidy } from '@tidyjs/tidy';
	import { format } from 'd3';
	import demoData from '../../data/demoMonthlyTimeseriesLong.json';
	import { Plot } from '../observablePlotFragments/plot';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	const aggregateData = (data: any[]) => {
		return tidy(
			data,
			map((d) => ({
				...d,
				Year: d.Month.slice(0, 4)
			})),
			groupBy(['Year', 'Variable'], summarize({ Average: mean('Value') }))
		);
	};

	// Spec and data for single variable bar example (default)
	$: singleVariableData = demoData.filter((d) => d.Variable == 'Variable A');
	$: barData = aggregateData(singleVariableData);
	$: averaged = tidy(demoData, groupBy('Variable', summarize({ Average: mean('Value') })));
	$: console.log(averaged);
	let barSpec: any;
	$: if ($currentTheme) {
		barSpec = {
			x: { insetLeft: 80, interval: 'year', label: 'Year' },
			marks: [
				Plot.gridX({ interval: '2 years' }),
				Plot.gridY(),
				Plot.axisX({ label: 'Year', interval: '2 years' }),
				Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
				Plot.barY(barData, {
					x: (d) => new Date(d.Year),
					y: 'Average',
					tip: true
				}),
				Plot.ruleY([0])
			]
		};
	}

	$: stackedBarData = aggregateData(demoData);
	$: stackedBarSpec = {
		x: { insetLeft: 80, interval: 'year', label: 'Year' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				$currentTheme.color.data.primary,
				$currentTheme.color.data.secondary,
				$currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '2 years' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.barY(stackedBarData, {
				x: (d) => new Date(d.Year),
				y: 'Average',
				fill: 'Variable',
				tip: true
			}),
			Plot.ruleY([0])
		]
	};

	$: rectData = demoData;
	$: rectSpec = {
		x: { insetLeft: 80, interval: 'year', label: 'Year' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				$currentTheme.color.data.primary,
				$currentTheme.color.data.secondary,
				$currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '2 years' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.rectY(
				rectData,
				Plot.binX(
					{ y: 'mean' },
					{
						x: (d) => new Date(d.Month),
						y: 'Value',
						fill: 'Variable',
						tip: true
					}
				)
			),
			Plot.ruleY([0])
		]
	};

	$: facetedRectData = demoData;
	$: facetedRectSpec = {
		x: { insetLeft: 80, interval: 'year', label: 'Year' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				$currentTheme.color.data.primary,
				$currentTheme.color.data.secondary,
				$currentTheme.color.data.tertiary
			]
		},
		facet: { label: null },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '2 years' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.rectY(
				facetedRectData,
				Plot.binX(
					{ y: 'mean' },
					{
						x: (d) => new Date(d.Month),
						y: 'Value',
						fill: 'Variable',
						fy: 'Variable',
						tip: { format: { fy: false } }
					}
				)
			),
			Plot.ruleY([0])
		]
	};
</script>

<Template let:args>
	<ObservablePlot {...args} />
</Template>

<!--
```html
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { groupBy, map, mean, summarize, tidy } from '@tidyjs/tidy';
	import { format } from 'd3';
	import demoData from '../../data/demoMonthlyTimeseriesLong.json';
	import { Plot } from '../observablePlotFragments/plot';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	const aggregateData = (data: any[]) => {
		return tidy(
			data,
			map((d) => ({
				...d,
				Year: d.Month.slice(0, 4)
			})),
			groupBy('Year', summarize({ Average: mean('Value') }))
		);
	};

	// Spec and data for single variable bar example (default)
	$: singleVariableData = demoData.filter((d) => d.Variable == 'Variable A');
	$: barData = aggregateData(singleVariableData);
	$: barSpec = {
		x: { insetLeft: 80, interval: 'year', label: 'Year' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '2 years' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.barY(barData, {
				x: (d) => new Date(d.Year),
				y: 'Average',
				tip: true
			}),
			Plot.ruleY([0])
		]
	};

	<ObservablePlot
		spec={barSpec}
		data={barData}
		title={"In London, Variable A's average value has fallen steadily since 2015"}
		subTitle={'London average yearly estimated variable value (GBP), 2015 to March 2024'}
		alt={"Bar chart of London's variable A average values"}
		byline={'GLA City Intelligence'}
		source={'LDN Viz Tools Demo Data'}
		note={'Data for demonstration only'}
		chartDescription={"The bar chart shows yearly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £40,000. Variable A's average value has fallen steadily since 2015. Variable A's highest average value was £43,472 in 2015, its lowest average value was £19,786 in 2024, (a change of around -£19,742) and its mean average value was £30,758."}
	/>
```
-->

<Story name="Default" source>
	<ObservablePlot
		spec={barSpec}
		data={barData}
		title={"In London, Variable A's average value has fallen steadily since 2015"}
		subTitle={'London average yearly estimated variable value (GBP), 2015 to March 2024'}
		alt={"Bar chart of London's variable A average values"}
		byline={'GLA City Intelligence'}
		source={'LDN Viz Tools Demo Data'}
		note={'Data for demonstration only'}
		chartDescription={"The bar chart shows yearly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £40,000. Variable A's average value has fallen steadily since 2015. Variable A's highest average value was £43,472 in 2015, its lowest average value was £19,786 in 2024, (a change of around -£19,742) and its mean average value was £30,758."}
	/>
</Story>

<!--
```html
	import { currentTheme } from '@ldn-viz/ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { groupBy, map, mean, summarize, tidy } from '@tidyjs/tidy';
	import { format } from 'd3';
	import demoData from '../../data/demoMonthlyTimeseriesLong.json';
	import { Plot } from '../observablePlotFragments/plot';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	const aggregateData = (data: any[]) => {
		return tidy(
			data,
			map((d) => ({
				...d,
				Year: d.Month.slice(0, 4)
			})),
			groupBy(['Year', 'Variable'], summarize({ Average: mean('Value') }))
		);
	};

	$: stackedBarData = aggregateData(demoData);
	$: stackedBarSpec = {
		x: { insetLeft: 80, interval: 'year', label: 'Year' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				$currentTheme.color.data.primary,
				$currentTheme.color.data.secondary,
				$currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '2 years' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.barY(stackedBarData, {
				x: (d) => new Date(d.Year),
				y: 'Average',
				fill: 'Variable',
				tip: true
			}),
			Plot.ruleY([0])
		]
	};

	<ObservablePlot
		spec={stackedBarSpec}
		data={stackedBarData}
		title={'In London, all variable values have fallen steadily since 2016, with Variable A experiencing the most significant fall'}
		subTitle={'London average yearly estimated variable value (GBP), 2015 to March 2024'}
		alt={'Bar chart of London variable average values'}
		byline={'GLA City Intelligence'}
		source={'LDN Viz Tools Demo Data'}
		note={'Data for demonstration only'}
		chartDescription={"The bar chart shows yearly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £100,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest average value was £43,472 in 2015, its lowest average value was £19,786 in 2024, (a change of around -£19,742) and its mean average value was £30,758. Variable B and C follow a similar fall, with a mean average of £27,545 and £23,681 respectively."}
	/>
```
-->

<Story name="Stacked bar chart" source>
	<ObservablePlot
		spec={stackedBarSpec}
		data={stackedBarData}
		title={'In London, all variable values have fallen steadily since 2016, with Variable A experiencing the most significant fall'}
		subTitle={'London average yearly estimated variable value (GBP), 2015 to March 2024'}
		alt={'Bar chart of London variable average values'}
		byline={'GLA City Intelligence'}
		source={'LDN Viz Tools Demo Data'}
		note={'Data for demonstration only'}
		chartDescription={"The bar chart shows yearly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £100,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest average value was £43,472 in 2015, its lowest average value was £19,786 in 2024, (a change of around -£19,742) and its mean average value was £30,758. Variable B and C follow a similar fall, with a mean average of £27,545 and £23,681 respectively."}
	/>
</Story>

<!--
```html
	import { currentTheme } from '@ldn-viz/ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { format } from 'd3';
	import demoData from '../../data/demoMonthlyTimeseriesLong.json';
	import { Plot } from '../observablePlotFragments/plot';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	$: rectData = demoData;
	$: rectSpec = {
		x: { insetLeft: 80, interval: 'year', label: 'Year' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				$currentTheme.color.data.primary,
				$currentTheme.color.data.secondary,
				$currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '2 years' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.rectY(
				rectData,
				Plot.binX(
					{ y: 'mean' },
					{
						x: (d) => new Date(d.Month),
						y: 'Value',
						fill: 'Variable',
						tip: true
					}
				)
			),
			Plot.ruleY([0])
		]
	};

	<ObservablePlot
		spec={rectSpec}
		data={rectData}
		title={'In London, all variable values have fallen steadily since 2016, with Variable A experiencing the most significant fall'}
		subTitle={'London average yearly estimated variable value (GBP), 2015 to March 2024'}
		alt={'Histogram chart of London variable average values'}
		byline={'GLA City Intelligence'}
		source={'LDN Viz Tools Demo Data'}
		note={'Data for demonstration only'}
		chartDescription={"The histogram chart shows yearly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £100,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest average value was £43,472 in 2015, its lowest average value was £19,786 in 2024, (a change of around -£19,742) and its mean average value was £30,758. Variable B and C follow a similar fall, with a mean average of £27,545 and £23,681 respectively."}
	/>
```
-->

<Story name="Rect chart" source>
	<ObservablePlot
		spec={rectSpec}
		data={rectData}
		title={'In London, all variable values have fallen steadily since 2016, with Variable A experiencing the most significant fall'}
		subTitle={'London average yearly estimated variable value (GBP), 2015 to March 2024'}
		alt={'Histogram chart of London variable average values'}
		byline={'GLA City Intelligence'}
		source={'LDN Viz Tools Demo Data'}
		note={'Data for demonstration only'}
		chartDescription={"The histogram chart shows yearly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £100,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest average value was £43,472 in 2015, its lowest average value was £19,786 in 2024, (a change of around -£19,742) and its mean average value was £30,758. Variable B and C follow a similar fall, with a mean average of £27,545 and £23,681 respectively."}
	/>
</Story>

<!--
```html
	import { currentTheme } from '@ldn-viz/ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { format } from 'd3';
	import demoData from '../../data/demoMonthlyTimeseriesLong.json';
	import { Plot } from '../observablePlotFragments/plot';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	$: facetedRectData = demoData;
	$: facetedRectSpec = {
		x: { insetLeft: 80, interval: 'year', label: 'Year' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				$currentTheme.color.data.primary,
				$currentTheme.color.data.secondary,
				$currentTheme.color.data.tertiary
			]
		},
		facet: { label: null },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '2 years' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.rectY(
				facetedRectData,
				Plot.binX(
					{ y: 'mean' },
					{
						x: (d) => new Date(d.Month),
						y: 'Value',
						fill: 'Variable',
						fy: 'Variable',
						tip: { format: { fy: false } }
					}
				)
			),
			Plot.ruleY([0])
		]
	};

	<ObservablePlot
		spec={facetedRectSpec}
		data={facetedRectData}
		title={'In London, all variable values have fallen steadily since 2016, with Variable A experiencing the most significant fall'}
		subTitle={'London average yearly estimated variable value (GBP), 2015 to March 2024'}
		alt={'Three histogram charts of London variable average values split by variable'}
		byline={'GLA City Intelligence'}
		source={'LDN Viz Tools Demo Data'}
		note={'Data for demonstration only'}
		chartDescription={"The histogram chart shows yearly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axes ranges from £0 to £40,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest average value was £43,472 in 2015, its lowest average value was £19,786 in 2024, (a change of around -£19,742) and its mean average value was £30,758. Variable B and C follow a similar fall. Variable B's highest average value was £36,942 in 2016, its lowest average value was £17,614 in 2024, (a change of around -£19,328) and its mean average value was £27,545. Variable C's highest average value was £30,714 in 2016, its lowest average value was £16,840 in 2023, (a change of around -£13,874) and its mean average value was £23,681."}
	/>
```
-->

<Story name="Faceted rect chart" source>
	<ObservablePlot
		spec={facetedRectSpec}
		data={facetedRectData}
		title={'In London, all variable values have fallen steadily since 2016, with Variable A experiencing the most significant fall'}
		subTitle={'London average yearly estimated variable value (GBP), 2015 to March 2024'}
		alt={'Three histogram charts of London variable average values split by variable'}
		byline={'GLA City Intelligence'}
		source={'LDN Viz Tools Demo Data'}
		note={'Data for demonstration only'}
		chartDescription={"The histogram chart shows yearly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axes ranges from £0 to £40,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest average value was £43,472 in 2015, its lowest average value was £19,786 in 2024, (a change of around -£19,742) and its mean average value was £30,758. Variable B and C follow a similar fall. Variable B's highest average value was £36,942 in 2016, its lowest average value was £17,614 in 2024, (a change of around -£19,328) and its mean average value was £27,545. Variable C's highest average value was £30,714 in 2016, its lowest average value was £16,840 in 2023, (a change of around -£13,874) and its mean average value was £23,681."}
	/>
</Story>
