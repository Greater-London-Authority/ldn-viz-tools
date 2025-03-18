<script lang="ts">
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

	const mapItems: any = (items: any[], targetId: string) => {
		return items.map((item) => {
			const hasMatchingChild = item.children?.some(
				(child: any) =>
					child.id === targetId ||
					(child.children && mapItems(child.children, targetId).some((c) => c.isExpanded))
			);

			return {
				...item,
				isExpanded: hasMatchingChild || item.id === targetId,
				children: item.children ? mapItems(item.children, targetId) : undefined
			};
		});
	};

	$: menuState = mapItems(items, $selectedMenuItemId);
</script>

<ul>
	{#each menuState as item}
		<MultiLevelListMenuItem {item} />
	{/each}
</ul>
