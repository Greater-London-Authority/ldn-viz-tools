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

<Story name="With Title" args={{ title: 'Chart Title' }} />

<Story name="With Subtitle" args={{ title: 'Chart Title', subTitle: 'This is a sub title' }} />

<Story name="With Footer" args={{ footer: true }} />

<Story name="With Export Buttons" args={{ exportBtns: true }} />
