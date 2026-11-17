<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import NumRowsControls from './NumRowsControls.svelte';

	/**
	 * The `NumRowsControls` component renders a Select for choosing how many rows to
	 * show per page (10 / 25 / 50 / 100). Changing the selection updates the bindable
	 * `pageSize` prop and resets `page` back to 1.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/PaginationControls/NumRowsControls',
		component: NumRowsControls,
		tags: ['autodocs'],

		args: {
			pageSize: 10,
			page: 1
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<NumRowsControls {...args} />
	{/snippet}
</Story>

<!-- Initialising with pageSize=50 shows the Select reflecting a non-default value. -->
<Story name="PreselectedPageSize">
	{#snippet template()}
		<NumRowsControls pageSize={50} page={1} />
	{/snippet}
</Story>
