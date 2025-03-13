<script lang="ts">
	import { randomId } from '../utils/randomId';
	import type { ListMenuItem as Item } from './ListMenuItem.svelte';
	import ListMenuItem from './ListMenuItem.svelte';

	/**
	 * Label to describe what the nav menu is for.
	 */
	export let ariaLabel: string;

	/**
	 * Value for the `id` attribute of the nav list
	 */
	export let id: string = randomId();

	/**
	 * Array of list items for rendering, that take a label and optional link and children.
	 */
	export let items: Item[];

	/**
	 * Optional prop to customise width
	 */
	export let width: string = 'w-full';

	/**
	 * Optional prop to disable collapsing and expanding sections and make all list items visible.
	 */
	export let isAlwaysExpanded = false;
</script>

<nav aria-label={ariaLabel} class={width}>
	<ul {id} class="overflow-auto space-y-2">
		{#each items as { label, link, children }}
			<ListMenuItem href={link} {label} {children} {isAlwaysExpanded} />
		{/each}
	</ul>
</nav>
