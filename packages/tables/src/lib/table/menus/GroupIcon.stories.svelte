<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GroupIcon from './GroupIcon.svelte';

	/**
	 * The `GroupIcon` component is a purely presentational SVG icon used to indicate
	 * row grouping. It accepts no explicit props; any attributes passed are spread
	 * onto the underlying `<svg>` element (e.g. `width`, `height`, `class`).
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Menus/GroupIcon',
		component: GroupIcon,
		tags: ['autodocs']
	});
</script>

<Story name="Default icon">
	{#snippet template()}
		<GroupIcon width="24" height="24" />
	{/snippet}
</Story>
