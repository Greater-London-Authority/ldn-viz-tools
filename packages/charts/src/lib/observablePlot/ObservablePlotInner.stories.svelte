<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ObservablePlotInner from './ObservablePlotInner.svelte';
	/**
	 * The `ObservablePlotInner` component allows the rendering of visualisations using the [Observable Plot](https://observablehq.com/plot/) library.
	 * It does *not* apply the  [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation) as a wrapper:
	 * if you require this, use the [ObservablePlot](./?path=/docs/charts-components-observableplot--documentation) component instead.
	 *
	 * **Note**: if you use this instead of the `ObservablePlot` component, ensure you add a description of the chart somewhere on the page with an `id` equal to the value of `ariaDescribedBy` for screen reader use.
	 */
	const { Story } = defineMeta({
		title: 'Charts/Components/ObservablePlotInner',
		component: ObservablePlotInner,
		tags: ['autodocs'],

		argTypes: {
			// this is a module export, not a prop, so don't include it in table
			addClick: {
				table: {
					disable: true
				}
			}
		}
	});
</script>

<script lang="ts">
	import * as UnstyledPlot from '@observablehq/plot';
	import { format } from 'd3-format';
	import { monthlyData } from '../../data/demoData';
	import { Plot } from '../observablePlotFragments/plot';

	const chartData = monthlyData.filter((d) => d.Variable === 'Variable A');

	// Spec and data for single line example (default)
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.axisX({ label: null, interval: '1 year' }),
			Plot.axisY({ label: null, tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.ruleY([0]),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + format(',.4~s')(d)
					}
				}
			})
		]
	});

	let specDashed = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.ruleY([0]),
			Plot.line(
				chartData.filter((d) => d.Month <= new Date('2022-12-31')),
				{
					x: 'Month',
					y: 'Value',
					tip: {
						format: {
							x: true,
							y: (d) => '£' + format(',.4~s')(d)
						}
					}
				}
			),

			Plot.dashedLine(
				chartData.filter((d) => d.Month >= new Date('2022-12-31')),
				{
					x: 'Month',
					y: 'Value',
					tip: {
						format: {
							x: true,
							y: (d) => '£' + format(',.4~s')(d)
						}
					}
				}
			)
		]
	});

	let specPointsAndDots = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.ruleY([0]),
			Plot.dot(
				chartData.filter((d) => d.Month <= new Date('2022-12-31')),
				{
					x: 'Month',
					y: 'Value',
					tip: {
						format: {
							x: true,
							y: (d) => '£' + format(',.4~s')(d)
						}
					}
				}
			),

			Plot.point(
				chartData.filter((d) => d.Month >= new Date('2022-12-31')),
				{
					x: 'Month',
					y: 'Value',
					tip: {
						format: {
							x: true,
							y: (d) => '£' + format(',.4~s')(d)
						}
					}
				}
			)
		]
	});

	let specImplicitAxes = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			//Plot.axisX({ label: null, interval: '1 year' }),
			//Plot.axisY({ label: null, tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.ruleY([0]),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + format(',.4~s')(d)
					}
				}
			})
		]
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ObservablePlotInner {...args} {spec} />
	{/snippet}
</Story>

<Story name="Defaults not Applied">
	{#snippet template(args)}
		<ObservablePlotInner {...args} applyDefaults={false} {spec} />
	{/snippet}
</Story>

<Story name="Unstyled Plot">
	{#snippet template(args)}
		<ObservablePlotInner
			{...args}
			applyDefaults={false}
			spec={{
				x: { insetLeft: 80, insetRight: 20, type: 'utc' },
				marks: [
					UnstyledPlot.axisX({ label: null, interval: '1 year' }),
					UnstyledPlot.axisY({ label: null, tickFormat: (d) => '£' + format(',.4~s')(d) }),
					UnstyledPlot.ruleY([0]),
					UnstyledPlot.line(chartData, {
						x: 'Month',
						y: 'Value',
						tip: {
							format: {
								x: true,
								y: (d) => '£' + format(',.4~s')(d)
							}
						}
					})
				]
			}}
		/>
	{/snippet}
</Story>

<!--
This chart uses implicitly created axes, rather than explicitly creating them with `Plot.axisX()` / `Plot.axisY()`.
Note that this styles the axes with the default styling defined by Observable Plot, rather than ldn-viz;
due to other styling, this pushes the y-axis ticks and labels to the left, outside the visible area.
-->
<Story name="Incorrect styling due to implicit axes">
	{#snippet template(args)}
		<ObservablePlotInner {...args} spec={specImplicitAxes} data={chartData} />
	{/snippet}
</Story>

<!--
The wrapper also provides `dashedLine`/`dashedLineX`/`dashedLineY` marks as wrappers around the `line`/`lineX`/`lineY` mark provided by Observable Plot.
-->
<Story name="dashedLine mark">
	{#snippet template(args)}
		<ObservablePlotInner {...args} spec={specDashed} data={chartData} />
	{/snippet}
</Story>

<!--
The wrapper also provides `point`/`pointX`/`pointY` marks as wrappers around the `dot`/`dotX`/`dotY` mark provided by Observable Plot.
In this plot, the `dot` mark is used on the left and the `point` mark on the right.
-->
<Story name="point mark">
	{#snippet template(args)}
		<ObservablePlotInner {...args} spec={specPointsAndDots} data={chartData} />
	{/snippet}
</Story>
