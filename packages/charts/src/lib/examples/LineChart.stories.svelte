<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/** This is an example `LineChart` chart using default plot styles.
	 *
	 * By default, charts (and their inner details) are hidden from screen readers to improve the accessibility experience. Instead, it's crtitical we use a descriptive `title`, `subTitle`, `alt`, `chartDescription` and surrounding document text, so all users understand what the chart shows and gain the same insight. We should also link to the data where possible.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/LineChart'
	});
</script>

<!-- TODO:
[x] Thicker line (for contrast)?
[x] Long data, not wide (wide data example elsewhere?
[x] Make data 'meaningless' to avoid distraction. So 'Variable 1, Variable 2, etc'
[x] Make date formats and ranges real, as transformations and formatting are important
[x] Change spec to use lomg data and set color domains (rather than wide data named fields.render. or both?)
[ ] London vs Rest of UK (primary vs grey) (A <> B)
[x] Multi line
[ ] Many Multi line, focus vs context 
[ ] Points on lines (with label?)
[ ] X & Y threshold line (and annotation)
[ ] Range highlight 
[x] X axis label, Y axis label
[x] area chart, as simple addition to line? (not stacked)
[ ] non zero baseline (small change)
-->

<script lang="ts">
	import { format } from 'd3';
	import demoMonthlyTimeseriesLong from '../../data/demoMonthlyTimeseriesLong.json';
	import { Plot } from '../observablePlotFragments/plot';

	import { theme as currentThemeObj } from '@ldn-viz/ui';
	let currentTheme = $derived(currentThemeObj.currentTheme);

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for single line example (default)
	let singleLineData = $derived(
		demoMonthlyTimeseriesLong.filter((d) => d.Variable == 'Variable A')
	);
	let singleLineSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.line(singleLineData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: currentTheme.color.data.primary,
				tip: true
			})
		]
	});

	// Spec and data for multi-line example
	let multiLineData = $derived(demoMonthlyTimeseriesLong);
	let multiLineSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.line(multiLineData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable'
			}),

			Plot.ruleX(
				multiLineData,
				Plot.pointerX({ x: 'Month', stroke: currentTheme.color.chart.label })
			),
			Plot.point(
				multiLineData,
				Plot.pointer({ x: 'Month', y: 'Value', z: 'Variable', stroke: 'Variable' })
			),
			Plot.tip(
				multiLineData,
				Plot.pointer({
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					channels: {
						Variable: 'Variable',
						Month: { value: 'Month', label: 'Date' },
						Value: { value: 'Value', label: 'GBP' }
					},
					format: {
						Variable: true,
						Month: true,
						Value: (d) => '£' + formatHigh(d),
						x: false,
						y: false
					}
				})
			)
		]
	});

	// Spec and data for area example
	let areaData = $derived(demoMonthlyTimeseriesLong.filter((d) => d.Variable == 'Variable A'));
	let areaSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.areaY(areaData, {
				x: 'Month',
				y: 'Value'
			}),
			Plot.line(areaData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: currentTheme.color.data.primary,
				tip: true
			})
		]
	});

	// Spec for area (with custom fillOpacity) example
	let areaOpacitySpec = $derived({
		...areaSpec,
		marks: [
			...areaSpec.marks,
			Plot.areaY(areaData, {
				x: 'Month',
				y: 'Value',
				fillOpacity: 0.8
			})
		]
	});
</script>

<!--
```html
<script>
	import { Plot, plotTheme } from '@ldn-viz/charts';
	import demoMonthlyTimeseriesLong from '../../data/demoMonthlyTimeseriesLong.json'; // import or load your data
	import { format } from 'd3'; // for formatting numbers in the chart	

	const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	$: singleLineData = demoMonthlyTimeseriesLong.filter((d) => d.Variable == 'Variable A');
	$: singleLineSpec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.line(singleLineData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: currentTheme.color.data.primary,
				tip: true
			})
		]
	};
	
</script>

<ObservablePlot
		spec={singleLineSpec}
		data={singleLineData}
		title={"In London, Variable A's value has fallen steadily since 2017"}
		subTitle={"London monthly estimated variable value (GBP), January 2015 to March 2024"}
		alt={"Line chart of London's variable A values"}
		byline={"GLA City Intelligence"}
		source={"LDN Viz Tools Demo Data"}
		note={"Data for demonstration only"}
		chartDescription={"The line chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"}
	/>
```
-->

<Story name="Default" source>
	{#snippet template()}
		<ObservablePlot
			spec={singleLineSpec}
			data={singleLineData}
			title="In London, Variable A's value has fallen steadily since 2017"
			subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
			alt="Line chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The line chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"
		/>
	{/snippet}
</Story>

<!--
	```html
	<script>
		import { Plot, plotTheme } from '@ldn-viz/charts';
		import demoMonthlyTimeseriesLong from '../../data/demoMonthlyTimeseriesLong.json'; // import or load your data
		import { format } from 'd3'; // for formatting numbers in the chart	
		
		const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
		const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)
		
		$: multiLineData = demoMonthlyTimeseriesLong; // using demo data directly, without parsing
		$: multiLineSpec = {
			x: { insetLeft: 80, insetRight: 20, type: 'utc' },
			color: {
				legend: true,
				type: 'ordinal',
				range: [
					currentTheme.color.data.primary,
					currentTheme.color.data.secondary,
					currentTheme.color.data.tertiary
					]
				},
				marks: [
					Plot.gridX({ interval: '2 years' }),
					Plot.gridY(),
					Plot.axisX({ interval: '1 year' }),
					Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
					Plot.ruleY([0]),
					Plot.line(multiLineData, {
						x: 'Month',
						y: 'Value',
						z: 'Variable',
						stroke: 'Variable'
					}),
					
					Plot.ruleX(
						multiLineData,
						Plot.pointerX({ x: 'Month', stroke: currentTheme.color.chart.label })
						),
						Plot.point(
							multiLineData,
							Plot.pointer({ x: 'Month', y: 'Value', z: 'Variable', stroke: 'Variable' })
							),
							Plot.tip(
								multiLineData,
								Plot.pointer({
									x: 'Month',
									y: 'Value',
									z: 'Variable',
									channels: {
										Variable: 'Variable',
										Month: { value: 'Month', label: 'Date' },
										Value: { value: 'Value', label: 'GBP' }
									},
									format: {
										Variable: true,
										Month: true,
										Value: (d) => '£' + formatHigh(d),
										x: false,
										y: false
									}
								})
								)
								]
							};
						</script>
						
						<ObservablePlot
						spec={multiLineSpec}
						data={multiLineData}
						title={'In London, all variable values have fallen steadily since 2017, with Variable A experiencing the most significant fall'}
						subTitle={'London monthly estimated variable values (GBP), January 2015 to March 2024'}
						alt={'Line chart of London variable values'}
						byline={'GLA City Intelligence'}
						source={'LDN Viz Tools Demo Data'}
						note={'Data for demonstration only'}
						chartDescription={"The line chart shows monthly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B and C follow a similar fall, with a mean average of £27,545 and £23,681 respectively."}
						/>
						```
					-->

<Story name="Multiple lines (inc custom tool tips)" source>
	{#snippet template()}
		<ObservablePlot
			spec={multiLineSpec}
			data={multiLineData}
			title="In London, all variable values have fallen steadily since 2017, with Variable A experiencing the most significant fall"
			subTitle="London monthly estimated variable values (GBP), January 2015 to March 2024"
			alt="Line chart of London variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The line chart shows monthly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B and C follow a similar fall, with a mean average of £27,545 and £23,681 respectively."
		/>
	{/snippet}
</Story>

<!--
	```html
	<script>
		import { Plot, plotTheme } from '@ldn-viz/charts';
		import demoMonthlyTimeseriesLong from '../../data/demoMonthlyTimeseriesLong.json'; // import or load your data
		import { format } from 'd3'; // for formatting numbers in the chart	
	
		const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
		const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)
	
		$: areaData = demoMonthlyTimeseriesLong.filter((d) => d.Variable == 'Variable A');
		$: areaSpec = {
			x: { insetLeft: 80, insetRight: 20, type: 'utc' },
			marks: [
				Plot.gridX({ interval: '2 years' }),
				Plot.gridY(),
				Plot.axisX({ label: 'Year', interval: '1 year' }),
				Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
				Plot.ruleY([0]),
				Plot.areaY(areaData, {
					x: 'Month',
					y: 'Value'
				}),
				Plot.line(areaData, {
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					stroke: currentTheme.color.data.primary,
					tip: true
				})
			]
		};
		
	</script>
	
	<ObservablePlot
			spec={areaSpec}
			data={areaData}
			title={"In London, Variable A's value has fallen steadily since 2017"}
			subTitle={"London monthly estimated variable value (GBP), January 2015 to March 2024"}
			alt={"Area chart of London's variable A values"}
			byline={"GLA City Intelligence"}
			source={"LDN Viz Tools Demo Data"}
			note={"Data for demonstration only"}
			chartDescription={"The area chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"}
	/>
	```
-->

<Story name="Area chart" source>
	{#snippet template()}
		<ObservablePlot
			spec={areaSpec}
			data={areaData}
			title="In London, Variable A's value has fallen steadily since 2017"
			subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
			alt="Area chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The area chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"
		/>
	{/snippet}
</Story>

<!--
	```html
	<script>
		import { Plot, plotTheme } from '@ldn-viz/charts';
		import demoMonthlyTimeseriesLong from '../../data/demoMonthlyTimeseriesLong.json'; // import or load your data
		import { format } from 'd3'; // for formatting numbers in the chart	
	
		const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
		const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)
	
		$: areaData = demoMonthlyTimeseriesLong.filter((d) => d.Variable == 'Variable A');
		$: areaSpec = {
			x: { insetLeft: 80, insetRight: 20, type: 'utc' },
			marks: [
				Plot.gridX({ interval: '2 years' }),
				Plot.gridY(),
				Plot.axisX({ label: 'Year', interval: '1 year' }),
				Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
				Plot.ruleY([0]),
				Plot.areaY(areaData, {
					x: 'Month',
					y: 'Value'
				}),
				Plot.line(areaData, {
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					stroke: currentTheme.color.data.primary,
					tip: true
				})
			]
		};
		
		$: areaOpacitySpec = {
			...areaSpec,
			marks: [
				...areaSpec.marks,
				Plot.areaY(areaData, {
					x: 'Month',
					y: 'Value',
					fillOpacity: 0.8
				})
			]
		};
	</script>
	
	<ObservablePlot
			spec={areaOpacitySpec}
			data={areaData}
			title={"In London, Variable A's value has fallen steadily since 2017"}
			subTitle={"London monthly estimated variable value (GBP), January 2015 to March 2024"}
			alt={"Area chart of London's variable A values"}
			byline={"GLA City Intelligence"}
			source={"LDN Viz Tools Demo Data"}
			note={"Data for demonstration only"}
			chartDescription={"The area chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"}
	/>
	```
-->

<Story name="Area chart with custom fill opacity" source>
	{#snippet template()}
		<ObservablePlot
			spec={areaOpacitySpec}
			data={areaData}
			title="In London, Variable A's value has fallen steadily since 2017"
			subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
			alt="Area chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The area chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"
		/>
	{/snippet}
</Story>
