<script lang="ts">
	import { randomId } from '../utils/randomId';
	import type { ListMenuItem as Item } from './ListMenuItem.svelte';
	import ListMenuItem from './ListMenuItem.svelte';

	export let ariaLabel: string;
	export let id: string = randomId();
	export let items: Item[];
</script>

<nav aria-label={ariaLabel}>
	<ul {id} class="overflow-auto space-y-2">
		{#each items as { label, link, children }}
			<ListMenuItem href={link} {label} {children} />
		{/each}
	</ul>
</nav>
