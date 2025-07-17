<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingIndicator from './LoadingIndicator.svelte';

	/**
	 * The `<LoadingIndicator>` component wraps around the `<Spinner>` component
	 * to indicate when the user should wait for an operation to complete
	 * (e.g. in `<AsyncButton>`, `<NonIdealState>` and `<Geolocator>` components).
	 *
	 * In cases where the user prefers reduced motion, the `<Spinner>` is replaced with
	 * a clock icon.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/LoadingIndicator',
		component: LoadingIndicator,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<LoadingIndicator {...args} class="h-10 w-10" />
	{/snippet}
</Story>

<!-- When user prefers reduced motion, spinner is replaced with static clock. To test this in Chrome, open DevTools (`Command+Option+I`), open Commands drawer (`Command+Shift+P`), type `reduce` and press `Enter`. -->
<Story name="Prefers reduced motion">
	{#snippet template(args)}
		<LoadingIndicator {...args} class="h-10 w-10" />
	{/snippet}
</Story>
