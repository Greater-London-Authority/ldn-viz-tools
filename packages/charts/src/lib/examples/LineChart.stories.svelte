<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/** These are example `LineChart` charts using default plot styles.
	 *
	 * By default, charts (and their inner details) are hidden from screen readers to improve the accessibility experience. Instead, it's crtitical we use a descriptive `title`, `subTitle`, `alt`, `chartDescription` and surrounding document text, so all users understand what the chart shows and gain the same insight. We should also link to the data where possible.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/LineChart',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import * as d3 from 'd3';
	import { Plot } from '../observablePlotFragments/plot';

	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import { dualVariableData, multiVariableData, singleVariableData } from '../../data/demoData';
	let currentTheme = $derived(currentThemeObj.currentTheme);

	//const formatLow = d3.format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = d3.format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for single line example (default)
	let singleLineSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.line(singleVariableData, {
				x: 'Month',
				y: 'Value',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			})
		]
	});

	// Spec and data for multi-line example
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
			Plot.line(multiVariableData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable'
			}),

			Plot.ruleX(
				multiVariableData,
				Plot.pointerX({ x: 'Month', stroke: currentTheme.color.chart.label })
			),
			Plot.point(
				multiVariableData,
				Plot.pointer({ x: 'Month', y: 'Value', z: 'Variable', stroke: 'Variable' })
			),
			Plot.tip(
				multiVariableData,
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

	// Spec and data for dual line example
	let dualLineSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [currentTheme.color.data.primary, currentTheme.color.data.context]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.line(dualVariableData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable',
				reverse: true, // draw in reverse to get Var A on top
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			}),
			Plot.ruleX([new Date('2016-01-01T00:00:01')]),
			Plot.text([0], {
				x: new Date('2016-01-01T00:00:01'),
				y: d3.max(multiVariableData, (d) => d.Value),
				text: ['2016'],
				dy: 0,
				dx: 13,
				rotate: 90,
				textAnchor: 'start'
			}),
			Plot.ruleY([0])
		]
	});

	// Spec and data for area example
	let areaSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.areaY(singleVariableData, {
				x: 'Month',
				y: 'Value'
			}),
			Plot.line(singleVariableData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: currentTheme.color.data.primary,
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			})
		]
	});

	// Spec for area (with custom fillOpacity) example
	let areaOpacitySpec = $derived({
		...areaSpec,
		marks: [
			...areaSpec.marks,
			Plot.areaY(singleVariableData, {
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
	import { format } from 'd3';
	import { Plot } from '../observablePlotFragments/plot';

	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import { multiVariableData, singleVariableData } from '../../data/demoData';
	let currentTheme = $derived(currentThemeObj.currentTheme);

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for single line example (default)
	let singleLineSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.line(singleVariableData, {
				x: 'Month',
				y: 'Value',
				tip: true
			})
		]
	});
</script>

<ObservablePlot
		spec={singleLineSpec}
		data={singleVariableData}
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

<Story name="Default">
	{#snippet template()}
		<ObservablePlot
			spec={singleLineSpec}
			data={singleVariableData}
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
		import { format } from 'd3';
		import { Plot } from '../observablePlotFragments/plot';

		import { theme as currentThemeObj } from '@ldn-viz/ui';
		import { multiVariableData, singleVariableData } from '../../data/demoData';
		let currentTheme = $derived(currentThemeObj.currentTheme);

		//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
		const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

		// Spec and data for multi-line example
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
				Plot.line(multiVariableData, {
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					stroke: 'Variable'
				}),

				Plot.ruleX(
					multiVariableData,
					Plot.pointerX({ x: 'Month', stroke: currentTheme.color.chart.label })
				),
				Plot.point(
					multiVariableData,
					Plot.pointer({ x: 'Month', y: 'Value', z: 'Variable', stroke: 'Variable' })
				),
				Plot.tip(
					multiVariableData,
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
	</script>

	<ObservablePlot
		spec={multiLineSpec}
		data={multiVariableData}
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

<Story name="Multiple lines">
	{#snippet template()}
		<ObservablePlot
			spec={multiLineSpec}
			data={multiVariableData}
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
	<script lang="ts">
		import * as d3 from 'd3';
		import { Plot } from '../observablePlotFragments/plot';

		import { theme as currentThemeObj } from '@ldn-viz/ui';
		import { dualVariableData, multiVariableData, singleVariableData } from '../../data/demoData';
		let currentTheme = $derived(currentThemeObj.currentTheme);

		const formatHigh = d3.format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

		// Spec and data for dual line example
		let dualLineSpec = $derived({
			x: { insetLeft: 80, insetRight: 20, type: 'utc' },
			color: {
				legend: true,
				type: 'ordinal',
				range: [currentTheme.color.data.primary, currentTheme.color.data.context]
			},
			marks: [
				Plot.gridX({ interval: '2 years' }),
				Plot.gridY(),
				Plot.axisX({ label: 'Year', interval: '1 year' }),
				Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
				Plot.line(dualVariableData, {
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					stroke: 'Variable',
					reverse: true, // draw in reverse to get Var A on top
					tip: {
						format: {
							x: true,
							y: (d) => '£' + formatHigh(d)
						}
					}
				}),
				Plot.ruleX([new Date('2016-01-01T00:00:01')]),
				Plot.text([0], {
					x: new Date('2016-01-01T00:00:01'),
					y: d3.max(multiVariableData, (d) => d.Value),
					text: ['2016'],
					dy: 0,
					dx: 13,
					rotate: 90,
					textAnchor: 'start'
				}),
				Plot.ruleY([0])
			]
		});
	</script>

	<ObservablePlot
		spec={dualLineSpec}
		data={dualVariableData}
		title="In London, Variable A has tracked Variable B closely since 2016"
		subTitle="London monthly estimated variable values (GBP), January 2015 to March 2024"
		alt="Line chart of London variable values"
		byline="GLA City Intelligence"
		source="LDN Viz Tools Demo Data"
		note="Data for demonstration only"
		chartDescription="The line chart shows monthly time series data for Variable A and B, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B follows a similar fall, with a mean average of £27,545."
	/>
```
-->

<Story name="Dual line">
	{#snippet template()}
		<ObservablePlot
			spec={dualLineSpec}
			data={dualVariableData}
			title="In London, Variable A has tracked Variable B closely since 2016"
			subTitle="London monthly estimated variable values (GBP), January 2015 to March 2024"
			alt="Line chart of London variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The line chart shows monthly time series data for Variable A and B, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B follows a similar fall, with a mean average of £27,545."
		/>
	{/snippet}
</Story>

<!--
	```html
	<script>
		import * as d3 from 'd3';
		import { Plot } from '../observablePlotFragments/plot';

		import { theme as currentThemeObj } from '@ldn-viz/ui';
		import { dualVariableData, multiVariableData, singleVariableData } from '../../data/demoData';
		let currentTheme = $derived(currentThemeObj.currentTheme);

		const formatHigh = d3.format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

		let areaSpec = $derived({
			x: { insetLeft: 80, insetRight: 20, type: 'utc' },
			marks: [
				Plot.gridX({ interval: '2 years' }),
				Plot.gridY(),
				Plot.axisX({ label: 'Year', interval: '1 year' }),
				Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
				Plot.ruleY([0]),
				Plot.areaY(singleVariableData, {
					x: 'Month',
					y: 'Value'
				}),
				Plot.line(singleVariableData, {
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					stroke: currentTheme.color.data.primary,
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
			spec={areaSpec}
			data={singleVariableData}
			title="In London, Variable A's value has fallen steadily since 2017"
			subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
			alt="Area chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The area chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's value has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023 (a change of around -£50,149), and its mean average value was £30,758."
	/>
	```
-->

<Story name="Area chart">
	{#snippet template()}
		<ObservablePlot
			spec={areaSpec}
			data={singleVariableData}
			title="In London, Variable A's value has fallen steadily since 2017"
			subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
			alt="Area chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The area chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's value has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023 (a change of around -£50,149), and its mean average value was £30,758."
		/>
	{/snippet}
</Story>

<!--
	```html
	<script>
		import * as d3 from 'd3';
		import { Plot } from '../observablePlotFragments/plot';

		import { theme as currentThemeObj } from '@ldn-viz/ui';
		import { dualVariableData, multiVariableData, singleVariableData } from '../../data/demoData';
		let currentTheme = $derived(currentThemeObj.currentTheme);

		const formatHigh = d3.format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

		let areaSpec = $derived({
			x: { insetLeft: 80, insetRight: 20, type: 'utc' },
			marks: [
				Plot.gridX({ interval: '2 years' }),
				Plot.gridY(),
				Plot.axisX({ label: 'Year', interval: '1 year' }),
				Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
				Plot.ruleY([0]),
				Plot.areaY(singleVariableData, {
					x: 'Month',
					y: 'Value'
				}),
				Plot.line(singleVariableData, {
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					stroke: currentTheme.color.data.primary,
					tip: {
						format: {
							x: true,
							y: (d) => '£' + formatHigh(d)
						}
					}
				})
			]
		});

		let areaOpacitySpec = $derived({
			...areaSpec,
			marks: [
				...areaSpec.marks,
				Plot.areaY(singleVariableData, {
					x: 'Month',
					y: 'Value',
					fillOpacity: 0.8
				})
			]
		});
		
	</script>
	
	<ObservablePlot
			spec={areaSpec}
			data={singleVariableData}
			title="In London, Variable A's value has fallen steadily since 2017"
			subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
			alt="Area chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The area chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's value has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023 (a change of around -£50,149), and its mean average value was £30,758."
	/>
	```
-->

<Story name="Area chart with custom fill opacity">
	{#snippet template()}
		<ObservablePlot
			spec={areaOpacitySpec}
			data={singleVariableData}
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
