<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import data from '../../data/dataScatter';
	import ScatterPlot from './ScatterPlot.svelte';

	//https://storybook.js.org/docs/svelte/essentials/controls
	const argTypes = {
		data: {
			description: 'overwritten description',
			table: {
				type: {
					summary: 'something short',
					detail: 'something really really long'
				}
			},
			control: {
				type: null
			}
		},
		title: {
			table: {
				type: {
					summary: 'string'
				}
			},
			control: {
				type: 'text'
			}
		},
		subTitle: {
			table: {
				type: {
					summary: 'string'
				}
			},
			control: {
				type: 'text'
			}
		}
	};
</script>

<Meta title="Charts/ScatterPlot" component={ScatterPlot} {argTypes} />

<Template let:args>
	<ScatterPlot
		{...args}
		{data}
		x="year"
		y="value"
		xDomain={[1979, 2017]}
		xAxis={{ baseline: true, gridlines: true }}
		yAxis={{ baseline: true }}
		markOptions={{ r: 4 }}
	/>
</Template>

<Story name="Default" />

<Story
	name="With Chrome"
	args={{ title: 'Chart Title', subTitle: 'This is a sub title', footer: { exportBtns: true } }}
/>

<Story
	name="With Chrome but no downlaod buttons"
	args={{
		title: 'Chart Title',
		subTitle: 'This is a sub title',
		footer: { byline: 'byline', source: 'Source', note: 'Note', exportBtns: true }
	}}
/>
