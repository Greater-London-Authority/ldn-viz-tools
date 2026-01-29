<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Spinner from './Spinner.svelte';

	/**
	 * The `<Spinner>` component displays an animation to show that an operation (such as data loading) is currently in progress.
	 *
	 * Consider using the [LoadingIndicator](./?path=/docs/ui-components-loadingindicator--documentation) component, which wraps around this Spinner and handles user prefersReducedMotion.
	 *
	 * **Alternatives**: if it is necessary to display an explanation of what is happening, or to provide a placeholder to occupy space that will be occupied once an operation has completed, then consider using the [Non-Ideal State](./?path=/docs/ui-components-nonidealstate--documentation) component.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Spinner',
		component: Spinner,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Spinner {...args} class="w-8" />
	{/snippet}
</Story>

<Story name="Thickness">
	{#snippet template(args)}
		<Spinner {...args} class="w-8 stroke-[16]" />
	{/snippet}
</Story>

<Story name="Color">
	{#snippet template(args)}
		<Spinner
			{...args}
			class="w-8"
			circleColorClass="stroke-color-surface-negative-muted"
			arcColorClass="stroke-color-surface-negative"
		/>
	{/snippet}
</Story>

<Story name="In a button">
	{#snippet template(args)}
		<Button>
			I'm loading...
			<Spinner {...args} class="ml-2 h-6 w-6" />
		</Button>
	{/snippet}
</Story>

<Story name="With title">
	{#snippet template(args)}
		<Spinner {...args} title="Loading" class="w-8" />
	{/snippet}
</Story>
