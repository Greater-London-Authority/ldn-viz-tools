<script lang="ts">
	import type { ExpandableMount } from '../context.js';
	import ExpandableContent from '../ExpandableContent.svelte';
	import ExpandableItem from '../ExpandableItem.svelte';
	import ExpandableRoot from '../ExpandableRoot.svelte';
	import ExpandableTrigger from '../ExpandableTrigger.svelte';
	import Slat from '../presets/Slat.svelte';

	interface Props {
		type?: 'single' | 'multiple';
		mount?: ExpandableMount;
		persistKey?: string;
		controls?: boolean;
		slat?: boolean;
	}

	let {
		type = 'multiple',
		mount = 'first-open',
		persistKey = undefined,
		controls = false,
		slat = false
	}: Props = $props();
</script>

<ExpandableRoot {type} {persistKey} {controls}>
	{#if slat}
		<Slat title="Camden">Camden details</Slat>
	{:else}
		{#each ['a', 'b'] as v (v)}
			<ExpandableItem value={v} {mount}>
				<ExpandableTrigger>Item {v.toUpperCase()}</ExpandableTrigger>
				<ExpandableContent>Body {v.toUpperCase()}</ExpandableContent>
			</ExpandableItem>
		{/each}
	{/if}
</ExpandableRoot>
