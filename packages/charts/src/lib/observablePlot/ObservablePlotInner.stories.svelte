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
	import { Plot } from '../observablePlotFragments/plot';
	import * as UnstyledPlot from '@observablehq/plot';
	import { monthlyData } from '../../data/demoData';
	import { format } from 'd3-format';

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
