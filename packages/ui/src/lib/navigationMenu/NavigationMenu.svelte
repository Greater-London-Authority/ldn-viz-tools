<script lang="ts">
	import { setContext } from 'svelte';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import NavigationMenuItem from './NavigationMenuItem.svelte';
	import { selected } from './navigationMenuState.svelte';
	import type { NavigationMenuItemProps, NavigationMenuProps } from './types';

	let {
		ariaLabel,
		id = randomId(),
		items,
		width = 'w-full',
		isAlwaysExpanded = false,
		orientation = 'vertical',
		selectedMenuItemId = $bindable('')
	}: NavigationMenuProps = $props();

	/**
	 * Assigns value of active menu item (if set) to `selected` internal state.
	 */
	selected.value = selectedMenuItemId;

	/**
	 * Set props as context for retieval by items.
	 */
	setContext('navContext', { orientation, isAlwaysExpanded });

	const orientationClasses = {
		vertical: 'flex-col border-b border-color-ui-border-secondary',
		horizontal: 'flex space-x-1 flex-wrap'
	};

	let menuClasses = $derived(classNames(orientationClasses[orientation]));

	/**
	 * Event handler to update value of selected state when link is clicked.
	 */
	const onChange = (id: string) => {
		if (selected.value !== id) {
			selected.value = id;
		}
	};

	const hasMatchingChild = (item: NavigationMenuItemProps, targetId: string) =>
		item.children?.some(
			(child: NavigationMenuItemProps) =>
				child.id === targetId ||
				(child.children &&
					mapItems(child.children, targetId).some((c: NavigationMenuItemProps) => c.isExpanded))
		);

	/**
	 * Recursive function to handle applying `isExpanded` state, toggling expansion
	 * of list when a child is selected.
	 */
	const mapItems: any = (items: NavigationMenuItemProps[], targetId: string) =>
		items.map((item: NavigationMenuItemProps) => ({
			...item,
			isExpanded: !isAlwaysExpanded
				? hasMatchingChild(item, targetId) || item.id === targetId
				: true,
			children: item.children ? mapItems(item.children, targetId) : undefined
		}));

	let menuState = $derived(mapItems(items, selected.value));
</script>

<nav aria-label={ariaLabel} class={width}>
	<ul {id} class={menuClasses}>
		{#each menuState as { title, href, children, id, isExpanded }}
			<NavigationMenuItem {href} {title} {id} {children} {onChange} {isExpanded} />
		{/each}
	</ul>
</nav>
