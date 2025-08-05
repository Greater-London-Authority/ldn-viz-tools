<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	/** These are example `BarChart` charts using default plot styles.
	 *
	 * By default, charts (and their inner details) are hidden from screen readers to improve the accessibility experience. Instead, it's crtitical we use a descriptive `title`, `subTitle`, `alt`, `chartDescription` and surrounding document text, so all users understand what the chart shows and gain the same insight. We should also link to the data where possible.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/BarChart',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import * as d3 from 'd3';
	import {
		demoAggregatedByYearTimeseriesLong,
		multiVarDualYearAggregatedByYear,
		multiVarSingleYearAggregatedByYear,
		singleVarAggregatedByYear
	} from '../../data/demoData';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../observablePlotFragments/plot';
	import { formatHigh } from './utils';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	let singleVariableSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'band' },
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year' }),
			Plot.axisY({ tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.barY(singleVarAggregatedByYear, {
				x: 'Year',
				y: 'Average',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			}),
			// baseline last
			Plot.ruleY([0])
		]
	});

	let stackedBarSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'band' },
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year' }),
			Plot.axisY({ tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.barY(demoAggregatedByYearTimeseriesLong, {
				x: 'Year',
				y: 'Average',
				fill: 'Variable',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			}),
			// baseline last
			Plot.ruleY([0])
		]
	});

	let facetedBarSpec = $derived({
		marginRight: 120, // adjust margin right to suit your label length
		marginTop: 20, // adjust top margin to better suit facetY,
		x: { insetLeft: 80, insetRight: 20, type: 'band' },
		fy: { padding: 0.2 }, // add options or true to ensure defaultSizeFacet is applied
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year' }),
			Plot.axisY({ tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.barY(demoAggregatedByYearTimeseriesLong, {
				x: 'Year',
				y: 'Average',
				fy: 'Variable',
				fill: 'Variable',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			}),
			// baseline last
			Plot.ruleY([0])
		]
	});

	let horizontalBarSpec = $derived({
		height: 300, // height set outside of default
		marginLeft: 80, // adjust margin left to suit label length,
		// reset insetLeft to 0, push domain to padded max value, insetRight to prevent label clipping on x axis
		x: {
			insetLeft: 0,
			insetRight: 16,
			domain: [0, d3.min(multiVarSingleYearAggregatedByYear, (d) => d.Average * 1.15)]
		},
		marks: [
			Plot.gridX(),
			Plot.axisX({ label: null, tickFormat: (d) => '£' + formatHigh(d) }),
			// change text & line anchors and reset dx & dy
			Plot.axisY({ textAnchor: 'end', lineAnchor: 'middle', dx: 0, dy: 0 }),
			Plot.barX(multiVarSingleYearAggregatedByYear, {
				insetTop: 5,
				insetBottom: 5,
				x: 'Average',
				y: 'Variable',
				tip: {
					format: {
						x: (d) => '£' + formatHigh(d),
						y: false
					}
				}
			}),
			// baseline last
			Plot.ruleX([0])
		]
	});

	let horizontalStackedBarSpec = $derived({
		height: 300, // height set outside of default
		marginLeft: 80, // adjust margin left to suit label length,
		// reset insetLeft to 0, push domain to padded max value, insetRight to prevent label clipping on x axis
		x: {
			insetLeft: 0,
			insetRight: 16
		},
		y: { type: 'band' },
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX(),
			Plot.axisX({ label: null, tickFormat: (d) => '£' + formatHigh(d) }),
			// change text & line anchors and reset dx & dy
			Plot.axisY({ textAnchor: 'end', lineAnchor: 'middle', dx: 0, dy: 0 }),
			Plot.barX(multiVarDualYearAggregatedByYear, {
				insetTop: 5,
				insetBottom: 5,
				x: 'Average',
				y: 'Year',
				fill: 'Variable',
				tip: {
					format: {
						x: (d) => '£' + formatHigh(d),
						y: false,
						fill: false
					}
				}
			}),
			// baseline last
			Plot.ruleX([0])
		]
	});
</script>

<!--
    ```html
    <script lang="ts">
	import { singleVarAggregatedByYear } from '../../data/demoData';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../observablePlotFragments/plot';
	import { formatHigh } from './utils';

	let singleVariableSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'band' },
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year' }),
			Plot.axisY({ tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.barY(singleVarAggregatedByYear, {
				x: 'Year',
				y: 'Average',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			})
		]
	});
</script>

<ObservablePlot
    spec={singleVariableSpec}
    data={singleVarAggregatedByYear}
    title="In London, Variable A's value has fallen steadily since 2015"
    subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
    alt="Line chart of London's variable A values"
    byline="GLA City Intelligence"
    source="LDN Viz Tools Demo Data"
    note="Data for demonstration only"
    chartDescription="The line chart shows yearly average time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £40,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,686) and its mean value was £29,936."
/>
```
-->

<Story name="Default">
	{#snippet template()}
		<ObservablePlot
			spec={singleVariableSpec}
			data={singleVarAggregatedByYear}
			title="In London, Variable A's value has fallen steadily since 2015"
			subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
			alt="Bar chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The bar chart shows yearly average time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £40,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,686) and its mean value was £29,936."
		/>
	{/snippet}
</Story>

<!-- 
```html
	<script lang="ts">
		import { theme as currentThemeObj } from '@ldn-viz/ui';
		import * as d3 from 'd3';
		import {
			demoAggregatedByYearTimeseriesLong,
			multiVarDualYearAggregatedByYear,
			multiVarSingleYearAggregatedByYear,
			singleVarAggregatedByYear
		} from '../../data/demoData';
		import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
		import { Plot } from '../observablePlotFragments/plot';
		import { formatHigh } from './utils';

		let currentTheme = $derived(currentThemeObj.currentTheme);

		let stackedBarSpec = $derived({
			x: { insetLeft: 80, insetRight: 20, type: 'band' },
			color: {
				legend: true,
				range: [
					currentTheme.color.data.primary,
					currentTheme.color.data.secondary,
					currentTheme.color.data.tertiary
				]
			},
			marks: [
				Plot.gridY(),
				Plot.axisX({ label: 'Year' }),
				Plot.axisY({ tickFormat: (d) => '£' + formatHigh(d) }),
				Plot.barY(demoAggregatedByYearTimeseriesLong, {
					x: 'Year',
					y: 'Average',
					fill: 'Variable',
					tip: {
						format: {
							x: true,
							y: (d) => '£' + formatHigh(d)
						}
					}
				}),
				// baseline last
				Plot.ruleY([0])
			]
		});
	</script>

	<ObservablePlot
		spec={stackedBarSpec}
		data={demoAggregatedByYearTimeseriesLong}
		title="In London, total value across all variables has fallen steadily since 2015"
		subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
		alt="Stacked bar chart of London variable values"
		byline="GLA City Intelligence"
		source="LDN Viz Tools Demo Data"
		note="Data for demonstration only"
		chartDescription="The stacked bar chart shows yearly average time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £100,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,687) and its mean value was £29,936. Variable B and C follow a similar fall, with a mean average of £26,800 and £23,231 respectively."
	/>
```
-->

<Story name="Stacked bar">
	{#snippet template()}
		<ObservablePlot
			spec={stackedBarSpec}
			data={demoAggregatedByYearTimeseriesLong}
			title="In London, total value across all variables has fallen steadily since 2015"
			subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
			alt="Stacked bar chart of London variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The stacked bar chart shows yearly average time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £100,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,687) and its mean value was £29,936. Variable B and C follow a similar fall, with a mean average of £26,800 and £23,231 respectively."
		/>
	{/snippet}
</Story>

<!-- 
```html
	<script lang="ts">
		import { theme as currentThemeObj } from '@ldn-viz/ui';
		import * as d3 from 'd3';
		import {
			demoAggregatedByYearTimeseriesLong,
			multiVarDualYearAggregatedByYear,
			multiVarSingleYearAggregatedByYear,
			singleVarAggregatedByYear
		} from '../../data/demoData';
		import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
		import { Plot } from '../observablePlotFragments/plot';
		import { formatHigh } from './utils';

		let currentTheme = $derived(currentThemeObj.currentTheme);

		let facetedBarSpec = $derived({
			marginRight: 120, // adjust margin right to suit your label length
			marginTop: 20, // adjust top margin to better suit facetY,
			x: { insetLeft: 80, insetRight: 20, type: 'band' },
			fy: { padding: 0.2 }, // add options or true to ensure defaultSizeFacet is applied
			color: {
				legend: true,
				range: [
					currentTheme.color.data.primary,
					currentTheme.color.data.secondary,
					currentTheme.color.data.tertiary
				]
			},
			marks: [
				Plot.gridY(),
				Plot.axisX({ label: 'Year' }),
				Plot.axisY({ tickFormat: (d) => '£' + formatHigh(d) }),
				Plot.barY(demoAggregatedByYearTimeseriesLong, {
					x: 'Year',
					y: 'Average',
					fy: 'Variable',
					fill: 'Variable',
					tip: {
						format: {
							x: true,
							y: (d) => '£' + formatHigh(d)
						}
					}
				}),
				// baseline last
				Plot.ruleY([0])
			]
		});
	</script>

	<ObservablePlot
		spec={facetedBarSpec}
		data={demoAggregatedByYearTimeseriesLong}
		title="In London, total value across all variables has fallen steadily since 2015"
		subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
		alt="Faceted bar chart of London variable values"
		byline="GLA City Intelligence"
		source="LDN Viz Tools Demo Data"
		note="Data for demonstration only"
		chartDescription="The faceted bar chart shows yearly average time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £40,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,687) and its mean value was £29,936. Variable B and C follow a similar fall, with a mean of £26,800 and £23,231 respectively."
	/>
```
-->

<Story name="Faceted bar">
	{#snippet template()}
		<ObservablePlot
			spec={facetedBarSpec}
			data={demoAggregatedByYearTimeseriesLong}
			title="In London, total value across all variables has fallen steadily since 2015"
			subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
			alt="Faceted bar chart of London variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The faceted bar chart shows yearly average time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £40,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,687) and its mean value was £29,936. Variable B and C follow a similar fall, with a mean of £26,800 and £23,231 respectively."
		/>
	{/snippet}
</Story>

<!-- 
```html
	<script lang="ts">

	import { theme as currentThemeObj } from '@ldn-viz/ui';
		import * as d3 from 'd3';
		import {
			demoAggregatedByYearTimeseriesLong,
			multiVarDualYearAggregatedByYear,
			multiVarSingleYearAggregatedByYear,
			singleVarAggregatedByYear
		} from '../../data/demoData';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../observablePlotFragments/plot';
	import { formatHigh } from './utils';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	let horizontalBarSpec = $derived({
		height: 300, // height set outside of default
		marginLeft: 80, // adjust margin left to suit label length,
		// reset insetLeft to 0, push domain to padded max value, insetRight to prevent label clipping on x axis
		x: {
			insetLeft: 0,
			insetRight: 16,
			domain: [0, d3.min(multiVarSingleYearAggregatedByYear, (d) => d.Average * 1.15)]
		},
		marks: [
			Plot.gridX(),
			Plot.axisX({ label: null, tickFormat: (d) => '£' + formatHigh(d) }),
			// change text & line anchors and reset dx & dy
			Plot.axisY({ textAnchor: 'end', lineAnchor: 'middle', dx: 0, dy: 0 }),
			Plot.barX(multiVarSingleYearAggregatedByYear, {
				insetTop: 5,
				insetBottom: 5,
				x: 'Average',
				y: 'Variable',
				tip: {
					format: {
						x: (d) => '£' + formatHigh(d),
						y: false
					}
				}
			}),
			// baseline last
			Plot.ruleX([0])
		]
	});
	</script>

	<ObservablePlot
		spec={horizontalBarSpec}
		data={multiVarSingleYearAggregatedByYear}
		title="In London (2024), Variable A's annual average is higher than both B and C"
		subTitle="London yearly average estimated variable values (GBP), 2024"
		alt="Bar chart of London's variable values"
		byline="GLA City Intelligence"
		source="LDN Viz Tools Demo Data"
		note="Data for demonstration only"
		chartDescription="The bar chart shows annual average  data in 2024 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges from £0 to £20,000. The y axis shows Variable A, B and C. Variable A had the highest annual average of £19,786 compared to B which was £17,614 and C which was £17,674."
	/>
```
-->

<Story name="Horizontal">
	{#snippet template()}
		<ObservablePlot
			spec={horizontalBarSpec}
			data={multiVarSingleYearAggregatedByYear}
			title="In London (2024), Variable A's annual average is higher than both B and C"
			subTitle="London yearly average estimated variable values (GBP), 2024"
			alt="Bar chart of London's variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The bar chart shows annual average  data in 2024 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges from £0 to £20,000. The y axis shows Variable A, B and C. Variable A had the highest annual average of £19,786 compared to B which was £17,614 and C which was £17,674."
		/>
	{/snippet}
</Story>

<!-- 
```html
	<script lang="ts">

	import { theme as currentThemeObj } from '@ldn-viz/ui';
		import * as d3 from 'd3';
		import {
			demoAggregatedByYearTimeseriesLong,
			multiVarDualYearAggregatedByYear,
			multiVarSingleYearAggregatedByYear,
			singleVarAggregatedByYear
		} from '../../data/demoData';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../observablePlotFragments/plot';
	import { formatHigh } from './utils';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	let horizontalStackedBarSpec = $derived({
		height: 300, // height set outside of default
		marginLeft: 80, // adjust margin left to suit label length,
		// reset insetLeft to 0, push domain to padded max value, insetRight to prevent label clipping on x axis
		x: {
			insetLeft: 0,
			insetRight: 16
		},
		y: { type: 'band' },
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX(),
			Plot.axisX({ label: null, tickFormat: (d) => '£' + formatHigh(d) }),
			// change text & line anchors and reset dx & dy
			Plot.axisY({ textAnchor: 'end', lineAnchor: 'middle', dx: 0, dy: 0 }),
			Plot.barX(multiVarDualYearAggregatedByYear, {
				insetTop: 5,
				insetBottom: 5,
				x: 'Average',
				y: 'Year',
				fill: 'Variable',
				tip: {
					format: {
						x: (d) => '£' + formatHigh(d),
						y: false,
						fill: false
					}
				}
			}),
			// baseline last
			Plot.ruleX([0])
		]
	});
	</script>

	<ObservablePlot
		spec={horizontalStackedBarSpec}
		data={multiVarDualYearAggregatedByYear}
		title="In London, total yearly average across all variables has dropped significantly from 2015 to 2021"
		subTitle="London yearly average estimated variable values combined (GBP), 2015 vs 2021"
		alt="Stacked bar chart of London's variable values"
		byline="GLA City Intelligence"
		source="LDN Viz Tools Demo Data"
		note="Data for demonstration only"
		chartDescription="The stacked bar chart shows yearly average  data in 2015 vs 2021 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges from £0 to £100,000. The y axis shows 2015 and 2021. The combined annual average for all variables was £105,503 in 2015 compared to £66,820 in 2021 (a change of around -£38,683). Variable A had the most significant change of -£19,328 in 2021 vs 2015."
	/>
```
-->

<Story name="Horizontal stacked bar">
	{#snippet template()}
		<ObservablePlot
			spec={horizontalStackedBarSpec}
			data={multiVarDualYearAggregatedByYear}
			title="In London, total yearly average across all variables has dropped significantly from 2015 to 2021"
			subTitle="London yearly average estimated variable values combined (GBP), 2015 vs 2021"
			alt="Stacked bar chart of London's variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The stacked bar chart shows yearly average  data in 2015 vs 2021 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges from £0 to £100,000. The y axis shows 2015 and 2021. The combined annual average for all variables was £105,503 in 2015 compared to £66,820 in 2021 (a change of around -£38,683). Variable A had the most significant change of -£19,328 in 2021 vs 2015."
		/>
	{/snippet}
</Story>
