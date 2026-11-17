<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DocsPage from './Documentation/DocsPage.svelte';

	let { Story } = defineMeta({
		title: 'Example Layouts/Documentation',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	});
</script>

<Story name="Template">
	{#snippet template()}
		<DocsPage />
	{/snippet}
</Story>
