<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SampleReport from './Report/SampleReport.svelte';

	let { Story } = defineMeta({
		title: 'Example Layouts/Reports',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	});
</script>

<Story name="Template">
	{#snippet template()}
		<SampleReport />
	{/snippet}
</Story>
