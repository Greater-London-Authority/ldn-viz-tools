<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ChartContainer from './ChartContainer.svelte';

	export const meta = {
		title: 'Charts/ChartContainer',
		component: ChartContainer
	};
</script>

<Template let:args>
	<ChartContainer {...args} />
</Template>

<Story
	name="Default"
	args={{
		title: 'Title',
		subTitle: 'Sub-Title',
		footer: {
			byline: 'Made by someone',
			source: 'With data from someone else',
			note: 'Some caveats apply'
		}
	}}
/>
