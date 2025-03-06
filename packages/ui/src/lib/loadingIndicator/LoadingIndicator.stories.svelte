<script context="module" lang="ts">
	import LoadingIndicator from './LoadingIndicator.svelte';

	export const meta = {
		title: 'Ui/Components/LoadingIndicator',
		component: LoadingIndicator
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<LoadingIndicator {...args} />
</Template>

<Story name="Default">
	<LoadingIndicator class="w-10 h-10" />
</Story>

<!-- When user prefers reduced motion, spinner is replaced with static clock. To test this in Chrome, open DevTools (`Command+Option+I`), open Commands drawer (`Command+Shift+P`), type `reduce` and press `Enter`. -->
<Story name="Prefers reduced motion">
	<LoadingIndicator class="w-10 h-10" />
</Story>
