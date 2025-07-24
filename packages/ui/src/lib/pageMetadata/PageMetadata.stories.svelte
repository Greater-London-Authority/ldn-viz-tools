<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import PageMetadata from './PageMetadata.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Meta, Analytics And Cookies/PageMetadata',
		component: PageMetadata,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-xl">
			<PageMetadata {...args} />
		</div>
	{/snippet}
</Story>
