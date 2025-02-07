<script context="module">
	import PageMetadata from './PageMetadata.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And ThemesMeta, Analytics And Cookies/PageMetadata',
		component: PageMetadata
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<div class="max-w-xl">
		<PageMetadata {...args} />
	</div>
</Template>

<Story
	name="Default"
	source
	args={{
		title: 'An interesting map',
		url: 'https://london.gov.uk/an-interesting-map',
		description: 'This map is quite interesting.'
	}}
/>
