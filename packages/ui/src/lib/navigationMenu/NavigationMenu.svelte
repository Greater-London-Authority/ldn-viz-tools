<script lang="ts">
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import type { NavigationMenuEntry } from './NavigationMenuItem.svelte';
	import NavigationMenuItem from './NavigationMenuItem.svelte';
	import { selected } from './navigationMenuState.svelte';

	interface Props {
		/**
		 * Label to describe what the nav menu is for.
		 */
		ariaLabel: string;
		/**
		 * Value for the `id` attribute of the nav list
		 */
		id?: string;
		/**
		 * Array of list items for rendering, that take a label and optional url and children.
		 */
		items: NavigationMenuEntry[];
		/**
		 * Optional prop to customise width
		 */
		width?: string;
		/**
		 * Optional prop to disable collapsing and expanding sections and make all list items visible.
		 */
		isAlwaysExpanded?: boolean;
		/**
		 * Optional prop to change orientation
		 */
		orientation?: 'vertical' | 'horizontal';
		/**
		 * Exposes active menu item to parent container for modification.
		 */
		selectedMenuItemId?: string;
	}

	let {
		ariaLabel,
		id = randomId(),
		items,
		width = 'w-full',
		isAlwaysExpanded = false,
		orientation = 'vertical',
		selectedMenuItemId = $bindable('')
	}: Props = $props();

	/**
	 * Assigns value of active menu item (if set) to `$selected` internal store.
	 */
	selected.value = selectedMenuItemId;

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

	const hasMatchingChild = (item: NavigationMenuEntry, targetId: string) =>
		item.children?.some(
			(child: NavigationMenuEntry) =>
				child.id === targetId ||
				(child.children &&
					mapItems(child.children, targetId).some((c: NavigationMenuEntry) => c.isExpanded))
		);

	/**
	 * Recursive function to handle applying `isExpanded` state, toggling expansion
	 * of list when a child is selected
	 */
	const mapItems: any = (items: NavigationMenuEntry[], targetId: string) =>
		items.map((item: NavigationMenuEntry) => ({
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
		{#each menuState as { title, url, children, id, isExpanded }}
			<NavigationMenuItem
				href={url}
				{title}
				{id}
				{children}
				{isAlwaysExpanded}
				{onChange}
				{orientation}
				{isExpanded}
			/>
		{/each}
	</ul>
</nav>
