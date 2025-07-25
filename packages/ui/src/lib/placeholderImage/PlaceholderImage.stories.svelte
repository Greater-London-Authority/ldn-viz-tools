<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PlaceholderImage from './PlaceholderImage.svelte';

	/**
	 * The `<PlaceholderImage>` component shows a generic placeholder image as an
	 * `<svg>` element. This can be used in place of a real image or whilst one
	 * is loading. This avoids the layout of a page or widget changing suddenly
	 * due to a slow or user initiated image loads.
	 *
	 * **Alternatives**: if you need a placeholder that can display a message, consider using the [NonIdealState](./?path=/docs/ui-components-nonidealstate--documentation) component.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/PlaceholderImage',
		component: PlaceholderImage,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="h-96 max-w-md">
			<PlaceholderImage />
		</div>
	{/snippet}
</Story>
