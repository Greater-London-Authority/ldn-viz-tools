<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import PageMetadata from './PageMetadata.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Meta, Analytics And Cookies/PageMetadata',
		component: PageMetadata,
		tags: ['autodocs'],
		args: {
			title: 'The title',
			description: 'the description',
			url: 'http://london.gov.uk'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-xl">
			<PageMetadata {...args}></PageMetadata>
		</div>
	{/snippet}
</Story>
