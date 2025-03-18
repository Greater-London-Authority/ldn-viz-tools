<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import MultiLevelListMenuItem from './MultiLevelListMenuItem.svelte';

	export let items: any[] = [];

	/**
	 * Exposes active menu item to parent container for modification.
	 */
	export let selectedMenuItemId = writable('');

	// iterate over items, give them a state depending on parent/sibling/child
	// set that as the context here and get it from the ListMenuItem component
	// check the id of the item against its contextual state and apply styling as expanded/contracted
	// as necessary

	const mapItems = (obj, fn) => {
		return Object.entries([key, val]).reduce((acc, [key, val]) => {
			const value = obj[key];
			acc[key] = typeof value === 'object' && value !== null ? mapItems(value, fn) : fn(value);
			return acc;
		}, {});
	};

	const testFunc = (item) => {
		return (item.yo = 'yo');
	};

	const menuState = mapItems(items, testFunc);

	$: console.log({ menuState });

	setContext('menuState', menuState);
</script>

<ul>
	{#each items as item}
		<MultiLevelListMenuItem {item} />
	{/each}
</ul>
