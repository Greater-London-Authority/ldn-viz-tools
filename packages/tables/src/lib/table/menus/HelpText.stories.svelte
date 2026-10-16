<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import HelpText from './HelpText.svelte';

	/**
	 * The `HelpText` component wraps its `children` in a `<span>` set in
	 * `.hint-text` and the muted text colour. Use it for help text in menus.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Menus/HelpText',
		component: HelpText,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<HelpText>
			{#snippet children()}
				Choose which columns to display and how each is grouped.
			{/snippet}
		</HelpText>
	{/snippet}
</Story>
