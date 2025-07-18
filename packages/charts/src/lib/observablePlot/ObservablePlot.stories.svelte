<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ObservablePlot from './ObservablePlot.svelte';

	const { Story } = defineMeta({
		title: 'Charts/Components/ObservablePlot',
		component: ObservablePlot,
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
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';

	import { addMultipleEventHandlers } from './ObservablePlotInner.svelte';

	import { theme as currentThemeObj, Select } from '@ldn-viz/ui';
	import { getDefaultPlotStyles } from '../observablePlotFragments/observablePlotFragments';

	import { penguins } from '../../data/demoData';

	import { Plot } from '../observablePlotFragments/plot';
	import DemoTooltip from './DemoTooltip.svelte';
	import { addEventHandler, registerTooltip } from './ObservablePlotInner.svelte';
	import type { Position } from './types';

	let theme = $state(getDefaultPlotStyles());

	let clickedValue: any | undefined = $state(undefined);
	let clickedIndex: any | undefined = $state(undefined);
	let hoveredValue: any | undefined = $state(undefined);

	const tooltipStore: Writable<Position> = writable();
	let updateTheme = $derived((_theme: any) => (theme = getDefaultPlotStyles()));

	let currentTheme = $derived(currentThemeObj.currentTheme);

	$effect(() => {
		updateTheme(currentThemeObj.currentTheme);
	});

	let spec = $derived({
		style: {
			...theme.defaultStyle
		},

		...theme.defaultSize,

		x: { ...theme.defaultXScale },

		y: { ...theme.defaultYScale },

		marks: [
			Plot.gridX({ ...theme.defaultGridX }),
			Plot.gridY({ ...theme.defaultGridY }),
			Plot.ruleY([0], { ...theme.defaultRule }),
			Plot.ruleX([0], { ...theme.defaultRule }),
			Plot.dot(penguins, { ...theme.defaultDot, x: 'culmen_length_mm', y: 'culmen_depth_mm' }), // instead of defaultPoint
			Plot.axisX({ ...theme.defaultXAxis }),
			Plot.axisY({ ...theme.defaultYAxis, label: 'culmen_depth_mm' })
		]
	});
</script>

<Story name="Default" source>
	{#snippet template({ args })}
		<ObservablePlot
			{...args}
			{spec}
			title="Penguin Culmens"
			subTitle="A scatter plot of depth against length"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>
<!-- 
	The width of the chart is contained within the wrapping chart container.
	Tailwind width classes can be used to control the width. Either fixed: (e.g. `w-[500px]`) or responsive: (e.g. `w-1/2`)
-->
<Story name="With Chart Width">
	{#snippet template()}
		<ObservablePlot
			spec={{ ...spec }}
			chartWidth="w-1/2"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>

<!-- 
	The height of the chart remains the responsibility of the contained instance of plot. It can be set to a specific pixel value: ie 300
-->
<Story name="With Height">
	{#snippet template()}
		<ObservablePlot
			spec={{ ...spec, height: 300 }}
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>

<Story name="With Aspect Ratio">
	{#snippet template()}
		<ObservablePlot
			spec={{
				...spec,
				height: undefined,
				aspectRatio: 0.5
			}}
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>

<!--
	The default tooltip allows you to display text, or a table showing the values of specific columns for the selected mark. 
	However, the appearance of these tooltips cannot be flexibly customized.
-->

<Story name="With default tooltips">
	{#snippet template()}
		<ObservablePlot
			spec={{
				...spec,

				marks: [
					...spec.marks,
					Plot.ruleY([0], { stroke: currentTheme.color.chart.axis }),
					Plot.ruleX([0], { stroke: currentTheme.color.chart.axis }),
					Plot.dot(penguins, {
						...theme.defaultDot,
						x: 'culmen_length_mm',
						y: 'culmen_depth_mm',
						render: registerTooltip(tooltipStore),

						/* need to expose as a channel before including in tooltip */
						channels: {
							sex: 'sex',
							culmen_length_mm: 'culmen_length_mm',
							culmen_depth_mm: 'culmen_depth_mm'
						},
						tip: {
							format: {
								sex: true,
								culmen_length_mm: (d) => `${d}mm`,
								culmen_depth_mm: (d) => `${d}mm`,
								x: undefined,
								y: undefined
							}
						}
					})
				]
			}}
			title="Penguin Culmens"
			subTitle="A scatter plot of depth against length"
			data={penguins}
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>

<!--
	Alternatively, you can use a custom Svelte component to render a tooltip.

	To add a custom tooltip:
	
	* create a `tooltipStore` writable store
	* add `render: registerTooltip(tooltipStore)` to the marks that will trigger the tooltip (if the mark is not a `dot` you will also need to provide the SVG node type as the second argument to `addClick`)
	* give these marks a `fill` (otherwise the tooltips will trigger only when the outline/stroke of the mark is moused-over)
	* provide the custom tooltip component into the named `tooltip` slot
-->
<Story name="With custom tooltips">
	{#snippet template()}
		<ObservablePlot
			spec={{
				...spec,
				marks: [
					...spec.marks,
					Plot.ruleY([0], { stroke: currentTheme.color.chart.axis }),
					Plot.ruleX([0], { stroke: currentTheme.color.chart.axis }),
					Plot.dot(penguins, {
						...theme.defaultDot,
						x: 'culmen_length_mm',
						y: 'culmen_depth_mm',
						render: registerTooltip(tooltipStore),
						tip: false
					})
				]
			}}
			title="Penguin Culmens"
			subTitle="A scatter plot of depth against length"
			data={penguins}
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
	{#snippet template()}
		<ObservablePlot
			spec={{
				...spec,

				marks: [
					...spec.marks,
					Plot.ruleY([0], { stroke: currentTheme.color.chart.axis }),
					Plot.ruleX([0], { stroke: currentTheme.color.chart.axis }),
					Plot.point(penguins, {
						x: 'culmen_length_mm',
						y: 'culmen_depth_mm',
						render: addEventHandler('click', (_ev, d) => {
							clickedIndex = d.index;
							clickedValue = penguins[d.index];
						}),
						stroke: currentTheme.color.data.primary,
						r: 5,
						fill: (_d, i) => {
							return clickedIndex !== undefined && i === clickedIndex
								? currentTheme.color.data.secondary
								: 'white';
						}
					})
				]
			}}
			title="Penguin Culmens"
			subTitle="A scatter plot of depth against length"
			data={penguins}
			{tooltipStore}
		>
			{#snippet tooltip()}
				<DemoTooltip />
			{/snippet}
		</ObservablePlot>

		<div>
			Selected point:
			<pre>{JSON.stringify(clickedValue, null, 2)}</pre>
		</div>
	{/snippet}
</Story>

<Story name="With multiple event handlers">
	{#snippet template()}
		<ObservablePlot
			spec={{
				...spec,

				marks: [
					...spec.marks,
					Plot.ruleY([0], { stroke: currentTheme.color.chart.axis }),
					Plot.ruleX([0], { stroke: currentTheme.color.chart.axis }),
					Plot.point(penguins, {
						x: 'culmen_length_mm',
						y: 'culmen_depth_mm',
						render: addMultipleEventHandlers([
							{
								markShape: 'circle',
								type: 'click',
								handler: (_, d) => {
									clickedIndex = penguins[d.index];
								}
							},
							{
								markShape: 'circle',
								type: 'mouseenter',
								handler: (_, d) => {
									hoveredValue = penguins[d.index];
								}
							}
						]),
						stroke: currentTheme.color.data.primary,
						r: 5,
						fill: (_d, i) => {
							return clickedIndex !== undefined && i === clickedIndex
								? currentTheme.color.data.secondary
								: 'white';
						}
					})
				]
			}}
			title="Penguin Culmens"
			subTitle="A scatter plot of depth against length"
			data={penguins}
			{tooltipStore}
		>
			{#snippet tooltip()}
				<DemoTooltip />
			{/snippet}
		</ObservablePlot>

		<div>
			Clicked point:
			<pre>{JSON.stringify(clickedIndex, null, 2)}</pre>
			Moused over point:
			<pre>{JSON.stringify(hoveredValue, null, 2)}</pre>
		</div>
	{/snippet}
</Story>

<!-- Some charts have filters to update displayed information. In order to make the interaction clearer, you can slot in controls underneath the `title` and `subTitle` and above the actual chart. -->
<Story name="With controls">
	{#snippet template()}
		<ObservablePlot
			{spec}
			title="Penguin Culmens"
			subTitle="A scatter plot of depth against length"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{#snippet controls()}
				<div class="mb-4 flex gap-4">
					<Select label="An input affecting the chart" items={[]} />
					<Select label="Another input" items={[]} />
				</div>
			{/snippet}
		</ObservablePlot>
	{/snippet}
</Story>
