<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import BoxPlot from './BoxPlot.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/BoxPlot',
		component: BoxPlot,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	});
</script>

{#snippet defaultTemplate(args)}
	<BoxPlot {...args} />
{/snippet}

<Story name="Default" source />
