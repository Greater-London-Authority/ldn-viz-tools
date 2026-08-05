<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingIndicator from './LoadingIndicator.svelte';

	/**
	 * The `<LoadingIndicator>` component wraps around the `<Spinner>` component
	 * to indicate when the user should wait for an operation to complete
	 * (e.g. in `<AsyncButton>`, `<NonIdealState>` and `<Geolocator>` components).
	 *
	 * In cases where the user prefers reduced motion, the `<Spinner>` is replaced with
	 * a clock icon.
	 *
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

<!-- Use `arcColorClass` to customise the colour of the spinner's arc. -->
<Story name="Custom arc colour">
	{#snippet template(args)}
		<LoadingIndicator {...args} arcColorClass="stroke-color-static-gla-pink" class="h-10 w-10  " />
	{/snippet}
</Story>

<!-- The `title` prop sets the accessible label announced to screen readers (and applied to the clock fallback). -->
<Story name="Custom title">
	{#snippet template(args)}
		<LoadingIndicator {...args} title="Fetching results" class="h-10 w-10" />
	{/snippet}
</Story>

<Story name="Size variations">
	{#snippet template(args)}
		<div class="flex items-center gap-4">
			<LoadingIndicator {...args} class="h-4 w-4" />
			<LoadingIndicator {...args} class="h-10 w-10" />
			<LoadingIndicator {...args} class="h-20 w-20" />
		</div>
	{/snippet}
</Story>
