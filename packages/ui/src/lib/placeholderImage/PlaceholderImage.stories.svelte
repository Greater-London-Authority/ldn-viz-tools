<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import PlaceholderImage from './PlaceholderImage.svelte';

	export const meta = {
		title: 'Ui/PlaceholderImage',
		component: PlaceholderImage,
		args: {}
	};
</script>

<Template let:args>
	<div class="max-w-md h-96">
		<PlaceholderImage {...args} />
	</div>
</Template>

<Story name="Default" source />
