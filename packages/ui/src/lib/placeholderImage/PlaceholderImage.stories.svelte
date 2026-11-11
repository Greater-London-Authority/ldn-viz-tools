<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PlaceholderImage from './PlaceholderImage.svelte';

	/**
	 * The `<PlaceholderImage>` component fills its container with a muted panel and a photo icon, to stand in for an image that hasn't loaded or isn't available yet.
	 * It is decorative: the icon is hidden from screen readers, so give the surrounding content any text a reader needs.
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
