<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import ExpandableContent from './ExpandableContent.svelte';
	import ExpandableItem from './ExpandableItem.svelte';
	import ExpandableRoot from './ExpandableRoot.svelte';
	import ExpandableTrigger from './ExpandableTrigger.svelte';

	/**
	 * Prototype. The base parts behind `AccordionItem`, `DashboardSection` and `Slat`, built
	 * on the bits-ui `Accordion`:
	 *
	 * | Part | Does |
	 * | --- | --- |
	 * | `Root` | Holds the items. `type`, bindable `value`, `persistKey`, `controls` |
	 * | `Item` | One item. `value`, `disabled`, `mount`; gives `children` `{ open }` |
	 * | `Trigger` | The toggle. `variant` (`row`, `icon`, `text`), `headingLevel`, `icon` |
	 * | `Content` | Shown when open. Animates height; `mount` sets when it renders |
	 *
	 * The presets differ in what the closed item shows and in their default `type`. Build a
	 * new pattern from these parts when no preset fits.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Expandable/Base Parts',
		component: ExpandableRoot,
		tags: ['autodocs'],
		parameters: { layout: 'padded' }
	});
</script>

<script lang="ts">
	let value = $state<string | string[]>(['b']);
</script>

<!-- A custom item: a row with a coloured marker, built from the parts. -->
<Story name="Custom composition">
	{#snippet template()}
		<div class="typeset-product max-w-md">
			<ExpandableRoot type="multiple" class="flex flex-col gap-1">
				{#each ['a', 'b', 'c'] as v (v)}
					<ExpandableItem value={v} class="border-l-4 border-color-data-primary pl-3">
						<ExpandableTrigger class="label-md py-1">Item {v.toUpperCase()}</ExpandableTrigger>
						<ExpandableContent class="body-sm pb-2">Content for item {v}.</ExpandableContent>
					</ExpandableItem>
				{/each}
			</ExpandableRoot>
		</div>
	{/snippet}
</Story>

<!-- `bind:value` reads and sets the open items from outside. -->
<Story name="Bound value">
	{#snippet template()}
		<div class="typeset-product max-w-md space-y-4">
			<div class="flex gap-2">
				<Button size="sm" variant="outline" onclick={() => (value = ['a', 'c'])}
					>Open A and C</Button
				>
				<Button size="sm" variant="outline" onclick={() => (value = [])}>Close all</Button>
			</div>
			<p class="body-sm text-color-text-muted">Open: {JSON.stringify(value)}</p>
			<ExpandableRoot type="multiple" bind:value>
				{#each ['a', 'b', 'c'] as v (v)}
					<ExpandableItem value={v} class="border-b border-color-border-wash">
						<ExpandableTrigger class="label-md py-2">Item {v.toUpperCase()}</ExpandableTrigger>
						<ExpandableContent class="body-sm pb-3">Content for item {v}.</ExpandableContent>
					</ExpandableItem>
				{/each}
			</ExpandableRoot>
		</div>
	{/snippet}
</Story>

<!-- `controls` given a snippet renders custom expand and collapse controls. -->
<Story name="Custom controls">
	{#snippet template()}
		{#snippet controls({ expandAll, collapseAll, allOpen }: any)}
			<Button size="sm" variant="text" onclick={allOpen ? collapseAll : expandAll}>
				{allOpen ? 'Collapse all' : 'Expand all'}
			</Button>
		{/snippet}
		<div class="typeset-product max-w-md">
			<ExpandableRoot type="multiple" {controls}>
				{#each ['a', 'b', 'c'] as v (v)}
					<ExpandableItem value={v} class="border-b border-color-border-wash">
						<ExpandableTrigger class="label-md py-2">Item {v.toUpperCase()}</ExpandableTrigger>
						<ExpandableContent class="body-sm pb-3">Content for item {v}.</ExpandableContent>
					</ExpandableItem>
				{/each}
			</ExpandableRoot>
		</div>
	{/snippet}
</Story>
