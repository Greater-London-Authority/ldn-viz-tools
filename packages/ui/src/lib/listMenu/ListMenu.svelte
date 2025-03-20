<script lang="ts">
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import type { ListMenuEntry } from './ListMenuItem.svelte';
	import ListMenuItem from './ListMenuItem.svelte';
	import { selectedValue } from './listMenuStores.svelte';

	/**
	 * Label to describe what the nav menu is for.
	 */
	export let ariaLabel: string;

	/**
	 * Value for the `id` attribute of the nav list
	 */
	export let id: string = randomId();

	/**
	 * Array of list items for rendering, that take a label and optional url and children.
	 */
	export let items: ListMenuEntry[];

	/**
	 * Optional prop to customise width
	 */
	export let width: string = 'w-full';

	/**
	 * Optional prop to disable collapsing and expanding sections and make all list items visible.
	 */
	export let isAlwaysExpanded = false;

	/**
	 * Optional prop to change orientation
	 */
	export let orientation: 'vertical' | 'horizontal' = 'vertical';

	/**
	 * Exposes active menu item to parent container for modification.
	 */
	export let selectedMenuItemId = '';

	/**
	 * Assigns value of active menu item (if set) to `$selectedValue` internal store.
	 */
	$: $selectedValue = selectedMenuItemId;

	const orientationClasses = {
		vertical: 'flex-col space-y-2',
		horizontal: 'flex border-b-4 border-b-color-ui-primary w-full pt-5 pb-0 space-x-0.5 items-end'
	};

	$: menuClasses = classNames(orientationClasses[orientation]);

	/**
	 * Event handler to update value of $selectedValue when link is clicked.
	 */
	const onChange = (id: string) => {
		if ($selectedValue !== id) {
			$selectedValue = id;
		}
	};

	const hasMatchingChild = (item: ListMenuEntry, targetId: string) =>
		item.children?.some(
			(child: ListMenuEntry) =>
				child.id === targetId ||
				(child.children &&
					mapItems(child.children, targetId).some((c: ListMenuEntry) => c.isExpanded))
		);

	/**
	 * Recursive function to handle applying `isExpanded` state, toggling expansion
	 * of list when a child is selected
	 */
	const mapItems: any = (items: ListMenuEntry[], targetId: string) =>
		items.map((item: ListMenuEntry) => ({
			...item,
			isExpanded: hasMatchingChild(item, targetId) || item.id === targetId,
			children: item.children ? mapItems(item.children, targetId) : undefined
		}));

	$: menuState = !isAlwaysExpanded ? mapItems(items, $selectedValue) : items;
</script>

<nav aria-label={ariaLabel} class={width}>
	<ul {id} class={menuClasses}>
		{#each menuState as { title, url, children, id, isExpanded }}
			<ListMenuItem
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
