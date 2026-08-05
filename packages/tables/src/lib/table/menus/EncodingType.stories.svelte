<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import EncodingType from './EncodingType.svelte';

	/**
	 * The `EncodingType` component renders a popover (via `Overlay`) that lets the user
	 * pick the visual encoding used for a column's rows, groups, and column summary.
	 * It takes a single (bindable) `col` prop describing the column, and mutates the
	 * column's `cell`, `group`, and `column` renderers as the user makes selections.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Menus/EncodingType',
		component: EncodingType,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import Mean from '../../core/aggregateRenderers/Mean.svelte';
	import type { ColSpec } from '../../core/lib/types';
	import TextCell from '../../core/renderers/TextCell.svelte';

	type CellRenderer = NonNullable<NonNullable<ColSpec['cell']>['renderer']>;
	type AggregateRenderer = NonNullable<NonNullable<ColSpec['group']>['renderer']>;

	const textCellRenderer = TextCell as unknown as CellRenderer;
	const meanRenderer = Mean as unknown as AggregateRenderer;

	// A column with no encodings set yet: the popover opens with no radio pre-selected.
	const plainCol: ColSpec = {
		short_label: 'previous',
		label: 'Previous'
	};

	// The menu reads renderer component names from the column spec to seed the
	// RadioButtonGroups, so this story provides concrete renderer components.
	const encodedCol: ColSpec = {
		short_label: 'current',
		label: 'Current',
		cell: { renderer: textCellRenderer },
		group: { renderer: meanRenderer },
		column: { renderer: meanRenderer }
	};
</script>

<Story name="Default (popover open)">
	{#snippet template()}
		<EncodingType col={plainCol} />
	{/snippet}
</Story>

<!-- The col's cell/group/column renderers are already set, so the three
     RadioButtonGroups are seeded via getRendererName. -->
<Story name="Pre-selected encodings">
	{#snippet template()}
		<EncodingType col={encodedCol} />
	{/snippet}
</Story>
