<script lang="ts">
	import { setContext } from 'svelte';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import NavigationMenuItem from './NavigationMenuItem.svelte';
	import type { NavigationMenuItemProps, NavigationMenuProps } from './types';

	let {
		ariaLabel,
		id = randomId(),
		items,
		width = 'w-full',
		isAlwaysExpanded = false,
		orientation = 'vertical',
		activeMenuItemId = $bindable('')
	}: NavigationMenuProps = $props();

	const active = $state({ value: '' });

	/**
	 * Assigns value of active menu item (if set) to `active` internal state.
	 */
	active.value = activeMenuItemId;

	/**
	 * Set props as context for retieval by items.
	 */
	// svelte-ignore state_referenced_locally
	setContext('navContext', { orientation, isAlwaysExpanded });

	const orientationClasses = {
		vertical: 'flex-col border-b border-color-border-muted',
		horizontal: 'flex space-x-1 flex-wrap'
	};

	let menuClasses = $derived(classNames(orientationClasses[orientation]));

	/**
	 * Event handler to update value of active state when link is clicked.
	 */
	const onChange = (id: string) => {
		if (active.value !== id) {
			active.value = id;
			activeMenuItemId = id;
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
	 * of list when a child is active.
	 */
	const mapItems: any = (items: NavigationMenuItemProps[], targetId: string) =>
		items.map((item: NavigationMenuItemProps) => ({
			...item,
			isExpanded: !isAlwaysExpanded
				? hasMatchingChild(item, targetId) || item.id === targetId
				: true,
			children: item.children ? mapItems(item.children, targetId) : undefined
		}));

	let menuState = $derived(mapItems(items, active.value));

	$effect(() => {
		if (active.value != activeMenuItemId) {
			active.value = activeMenuItemId;
		}
	});
</script>

<nav aria-label={ariaLabel} class={width}>
	<ul {id} class={menuClasses}>
		{#each menuState as { title, href, children, id, isExpanded }, index (index)}
			<NavigationMenuItem {href} {title} {id} {children} {index} {onChange} {isExpanded} {active} />
		{/each}
	</ul>
</nav>
