<script lang="ts">
	import { classNames } from '../../../dist';
	import { randomId } from '../utils/randomId';
	import type { ListMenuItem as Item } from './ListMenuItem.svelte';
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
	export let items: Item[];

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

	const orientationClasses = {
		vertical: 'flex-col space-y-2',
		horizontal: 'flex border-b-4 border-b-color-ui-primary w-full pt-5 pb-0 space-x-0.5 items-end'
	};

	$: menuClasses = classNames(orientationClasses[orientation]);

	const onChange = (id: string) => {
		$selectedValue = id;
	};
</script>

<nav aria-label={ariaLabel} class={width}>
	<ul {id} class={menuClasses}>
		{#each items as { title, url, children }}
			<ListMenuItem href={url} {title} {children} {isAlwaysExpanded} {onChange} {orientation} />
		{/each}
	</ul>
</nav>
