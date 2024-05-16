<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ObservablePlot from './ObservablePlot.svelte';

	export const meta = {
		title: 'Charts/ObservablePlot',
		component: ObservablePlot
	};
</script>

<script>
	import { writable } from 'svelte/store';

	import * as Plot from '@observablehq/plot';

	import { penguins } from './exampleData';

	import DemoTooltip from './DemoTooltip.svelte';
	import { addClick } from './ObservablePlot.svelte';

	const spec = {
		style: {
			fontFamily: 'Roboto',
			fontSize: '12pt',
			color: '#666666'
		},

		grid: true,
		marginBottom: 50,
		// aspectRatio: 1,

		x: {
			labelAnchor: 'center',
			labelArrow: 'none',
			label: 'Culmen length/mm'
		},

		y: {
			insetTop: 20,
			labelArrow: 'none'
		},

		marks: [
			Plot.ruleY([0], { stroke: '#666666' }),
			Plot.ruleX([0], { stroke: '#666666' }),
			Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' })
		]
	};

	const tooltipStore = writable();
</script>

<Template let:args>
	<ObservablePlot {...args} {spec} />
</Template>

<Story name="Default" args={{ spec }} />

<Story
	name="With Title"
	args={{
		spec,
		title: 'Penguin Culmens',
		subTitle: 'A scatterplot of depth against length',
		data: penguins
	}}
/>

<Story
	name="With Footer"
	args={{
		spec,
		title: 'Penguin Culmens',
		subTitle: 'A scatterplot of depth against length',
		data: penguins,
		footer: { source: 'This is the source', note: 'This is a note', exportBtns: true }
	}}
/>
<!--
<Story
	name="With responsive width"
	args={{
		spec,
		title: 'Penguin Culmens',
		subTitle: 'A scatterplot of depth against length',
		data: penguins
	}}
/> -->

<!--
	The default tooltip allows you to display text, or a table showing the values of specific columns for the selected mark. 
	However, the appearance of these tooltips cannot be flexibly customized.
-->

<Story name="With default tooltips">
	<ObservablePlot
		spec={{
			style: {
				fontFamily: 'Roboto',
				fontSize: '12pt',
				color: '#666666'
			},

			grid: true,
			marginBottom: 50,

			x: {
				labelAnchor: 'center',
				labelArrow: 'none',
				label: 'Culmen length/mm'
			},

			y: {
				insetTop: 20,
				labelArrow: 'none'
			},

			marks: [
				Plot.ruleY([0], { stroke: '#666666' }),
				Plot.ruleX([0], { stroke: '#666666' }),
				Plot.dot(penguins, {
					x: 'culmen_length_mm',
					y: 'culmen_depth_mm',
					render: addClick(tooltipStore),
					stroke: 'black',
					fill: 'white',

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
		subTitle="A scatterplot of depth against length"
		data={penguins}
	/>
</Story>

<!--
	Alternatively, you can use a custom Svelte component to render a tooltip.

	To add a custom tooltip:
	
	* create a `tooltipStore` writable store
	* add `render: addClick(tooltipStore)` to the marks that will trigger the tooltip (if the mark is not a `dot` you will also need to provide the SVG node type as the second argument to `addClick`)
	* give these marks a `fill` (otheriwse the tooltips will trigger only when the outline/stroke of the mark is moused-over)
	* provide the custom tooltip component into the named `tooltip` slot
-->
<Story name="With custom tooltips">
	<ObservablePlot
		spec={{
			style: {
				fontFamily: 'Roboto',
				fontSize: '12pt',
				color: '#666666'
			},

			grid: true,
			marginBottom: 50,

			x: {
				labelAnchor: 'center',
				labelArrow: 'none',
				label: 'Culmen length/mm'
			},

			y: {
				insetTop: 20,
				labelArrow: 'none'
			},

			marks: [
				Plot.ruleY([0], { stroke: '#666666' }),
				Plot.ruleX([0], { stroke: '#666666' }),
				Plot.dot(penguins, {
					x: 'culmen_length_mm',
					y: 'culmen_depth_mm',
					render: addClick(tooltipStore),
					stroke: 'black',
					fill: 'white'
				})
			]
		}}
		title="Penguin Culmens"
		subTitle="A scatterplot of depth against length"
		data={penguins}
		{tooltipStore}
	>
		<DemoTooltip slot="tooltip" />
	</ObservablePlot>
</Story>
