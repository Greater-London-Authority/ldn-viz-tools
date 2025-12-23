<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ObservablePlot from './ObservablePlot.svelte';

	/**
	 * The `ObservablePlot` component allows the rendering of visualisations using the [Observable Plot](https://observablehq.com/plot/) library, wrapping an `ObservablePlotInner` component in a [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation) wrapper.
	 * If you do not require the extra chrome applied by the `ChartContainer`, or need to include several plots in the same container, then use the [ObservablePlotInner](./?path=/docs/charts-components-observableplotinner--documentation) component directly.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Components/ObservablePlot',
		component: ObservablePlot,
		tags: ['autodocs'],
		args: {
			title: "In London, Variable A's value has fallen steadily since 2017",
			subTitle: 'London monthly estimated variable value (GBP), January 2015 to March 2024',
			alt: "Line chart of London's variable A values",
			byline: 'GLA City Intelligence',
			source: 'LDN Viz Tools Demo Data',
			note: 'Data for demonstration only',
			chartDescription:
				"The line chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"
		},
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
	import { Select, theme } from '@ldn-viz/ui';
	import { format } from 'd3-format';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { monthlyData } from '../../data/demoData';
	import { Plot } from '../observablePlotFragments/plot';
	import DemoTooltip from './DemoTooltip.svelte';
	import {
		addEventHandler,
		addMultipleEventHandlers,
		registerTooltip
	} from './ObservablePlotInner.svelte';
	import type { Position } from './types';

	let clickedValue: any | undefined = $state(undefined);
	let clickedIndex: any | undefined = $state(undefined);
	let hoveredValue: any | undefined = $state(undefined);

	const tooltipStore: Writable<Position> = writable();

	const chartData = monthlyData.filter((d) => d.Variable === 'Variable A');

	let multipleEventSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.ruleY([0]),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				render: addMultipleEventHandlers([
					{
						markShape: 'Path',
						type: 'click',
						handler: (_: any, d: { index: number }) => {
							clickedIndex = chartData[d.index];
						}
					},
					{
						markShape: 'Path',
						type: 'mouseenter',
						handler: (_: any, d: { index: number }) => {
							// this prevents an endless loop of updating hoveredValue, which triggers a re-render of the plot, which causes a new mouseEnter event
							if (hoveredValue?.Year != chartData[d.index].Year) {
								hoveredValue = chartData[d.index];
							}
						}
					},
					{
						markShape: 'Path',
						type: 'mouseleave',
						handler: () => {
							hoveredValue = undefined;
						}
					}
				]),
				stroke: hoveredValue
					? theme.currentTheme.color.data.secondary
					: theme.currentTheme.color.data.primary
			})
		]
	});

	// Spec and data for single line example (default)
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
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
		<ObservablePlot {...args} {spec} data={chartData} />
	{/snippet}
</Story>

<!-- 
	The width of the chart is contained within the wrapping chart container.
	Tailwind width classes can be used to control the width. Either fixed: (e.g. `w-[500px]`) or responsive: (e.g. `w-1/2`)
-->
<Story name="With Chart Width">
	{#snippet template(args)}
		<ObservablePlot {...args} {spec} data={chartData} chartWidth="w-1/2" />
	{/snippet}
</Story>

<!-- 
	The height of the chart remains the responsibility of the contained instance of plot. It can be set to a specific pixel value: ie 300
-->
<Story name="With Height">
	{#snippet template(args)}
		<ObservablePlot {...args} spec={{ ...spec, height: 300 }} data={chartData} />
	{/snippet}
</Story>

<!--
	The default tooltip allows you to display text, or a table showing the values of specific columns for the selected mark. 
	However, the appearance of these tooltips cannot be flexibly customized.
-->

<Story name="With default tooltips">
	{#snippet template(args)}
		<ObservablePlot {...args} {spec} data={chartData} />
	{/snippet}
</Story>

<!--
	Alternatively, you can use a custom Svelte component to render a tooltip.

	To add a custom tooltip:
	
	* create a `tooltipStore` writable store
	* add `render: registerTooltip(tooltipStore)` to the marks that will trigger the tooltip (if the mark is not a `dot` you will also need to provide the SVG node type as the second argument to `registerToolTip`)
	* give these marks a `fill` (otherwise the tooltips will trigger only when the outline/stroke of the mark is moused-over)
	* provide the custom tooltip component into the named `tooltip` slot
-->

<Story name="With custom tooltips">
	{#snippet template(args)}
		<ObservablePlot
			{...args}
			spec={{
				x: { insetLeft: 80, insetRight: 20, type: 'utc' },
				marks: [
					Plot.gridX({ interval: '2 years' }),
					Plot.gridY(),
					Plot.axisX({ label: 'Year', interval: '1 year' }),
					Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
					Plot.ruleY([0]),
					Plot.line(chartData, {
						x: 'Month',
						y: 'Value',
						render: registerTooltip(tooltipStore, 'Path')
					})
				]
			}}
			data={chartData}
			{tooltipStore}
		>
			{#snippet tooltip()}
				<DemoTooltip />
			{/snippet}
		</ObservablePlot>
	{/snippet}
</Story>

<!--
	Using the `addEventHandler` function we can register an event handler for events (e.g, `click`, `mouseenter`, `mouseleave`) triggered by user interaction with an SVG mark.
-->
<Story name="With custom click interaction">
	{#snippet template(args)}
		<ObservablePlot
			{...args}
			spec={{
				x: { insetLeft: 80, insetRight: 20, type: 'utc' },
				marks: [
					Plot.gridX({ interval: '2 years' }),
					Plot.gridY(),
					Plot.axisX({ label: 'Year', interval: '1 year' }),
					Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
					Plot.ruleY([0]),
					Plot.line(chartData, {
						x: 'Month',
						y: 'Value',
						render: addEventHandler(
							'click',
							(_ev: any, d: { index: number }) => {
								clickedIndex = d.index;
								clickedValue = chartData[d.index];
							},
							'Path'
						)
					})
				]
			}}
			data={chartData}
			{tooltipStore}
		>
			{#snippet tooltip()}
				<DemoTooltip />
			{/snippet}
		</ObservablePlot>

		<div>
			First datapoint of selected:
			<pre>{JSON.stringify(clickedValue, null, 2)}</pre>
		</div>
	{/snippet}
</Story>

<Story name="With multiple event handlers">
	{#snippet template(args)}
		<!-- {#key hoveredValue} -->
		<ObservablePlot {...args} spec={multipleEventSpec} data={chartData} {tooltipStore}>
			{#snippet tooltip()}
				<DemoTooltip />
			{/snippet}
		</ObservablePlot>

		<div>
			Clicked:
			<pre>{JSON.stringify(clickedIndex, null, 2)}</pre>
			Moused over:
			<pre>{JSON.stringify(hoveredValue, null, 2)}</pre>
		</div>
		<!-- {/key} -->
	{/snippet}
</Story>

<!-- Some charts have filters to update displayed information. In order to make the interaction clearer, you can slot in controls underneath the `title` and `subTitle` and above the actual chart. -->
<Story name="With controls">
	{#snippet template(args)}
		<ObservablePlot {...args} {spec} data={chartData}>
			{#snippet controls()}
				<div class="mb-4 flex gap-4">
					<div class="w-56">
						<Select label="An input affecting the chart" options={[]} />
					</div>
					<div class="w-52">
						<Select label="Another input" options={[]} />
					</div>
				</div>
			{/snippet}
		</ObservablePlot>
	{/snippet}
</Story>

<Story name="No downloads">
	{#snippet template(args)}
		<ObservablePlot
			{...args}
			{spec}
			data={chartData}
			dataDownloadButton={false}
			imageDownloadButton={false}
		/>
	{/snippet}
</Story>

<Story name="Only (CSV) data downloads">
	{#snippet template(args)}
		<ObservablePlot
			{...args}
			{spec}
			data={chartData}
			imageDownloadButton={false}
			dataDownloadButton={['CSV']}
		/>
	{/snippet}
</Story>

<Story name="Only (PNG) image downloads">
	{#snippet template(args)}
		<ObservablePlot
			{...args}
			{spec}
			data={chartData}
			imageDownloadButton={['PNG']}
			dataDownloadButton={false}
		/>
	{/snippet}
</Story>

<!--
	With `ariaHidden=false`, screen readers will read the contents on the chart itself.
	Usually this is undesirable - we usuallly want them to read the title, subtitle, and surrounding text.
	(Note that to test screen-readers, it is best to click the arrw-right/external link in the bar above the story to open it in a new tab.)
-->
<Story name="With ariaHidden false">
	{#snippet template(args)}
		<ObservablePlot {...args} {spec} data={chartData} ariaHidden={false} />
	{/snippet}
</Story>
