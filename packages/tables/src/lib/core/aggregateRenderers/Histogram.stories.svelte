<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Histogram from './Histogram.svelte';
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Histogram',
		component: Histogram,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	});
</script>

<Story name="Default" source>
	{#snippet template(args)}
		<Histogram {...args} />
	{/snippet}
</Story>
