<script context="module" lang="ts">
	export interface ListMenuEntry {
		title: string;
		id: string;
		url: string;
		children?: ListMenuEntry[];
		isExpanded?: boolean;
	}
</script>

<script lang="ts">
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import { selectedValue } from './listMenuStores.svelte';

	/**
	 * Value set as the `id` attribute of the `<a>` or `<div>` element. Should be in the array of `items` but defaults to randomly generated value in case not.
	 */
	export let id = randomId();

	/**
	 * Url to navigate to when link is clicked.
	 */
	export let href: string;

	/**
	 * Link title which should correspond to the page title
	 */
	export let title: string;

	/**
	 * Value set to apply styling to text. Defaults to 1, as in base list but increases if the list is nested.
	 */
	export let level: number = 1;

	/**
	 * Optional list of children items, if they exist.
	 */
	export let children: ListMenuEntry[] = [];

	/**
	 * Sets whether or not the list is expanded
	 */
	export let isExpanded: boolean = false;

	/**
	 * If all list items should be visible at all times, set this
	 * to `true`.
	 */
	export let isAlwaysExpanded: boolean = false;

	/**
	 * Optional prop to change orientation. Default is vertical.
	 */
	export let orientation: 'vertical' | 'horizontal' = 'vertical';

	/**
	 * Event handler to handle what happens when links are clicked.
	 */
	export let onChange;

	let childMenuId = title.toLowerCase() + '-menu';

	$: hasChildren = children?.length > 0;

	$: isActive = $selectedValue === id;
	$: if ((isActive && hasChildren) || isAlwaysExpanded) {
		isExpanded = true;
	}

	/**
	 * Updates `isExpanded` when the Button is clicked.
	 */
	const toggleMenu = () => {
		isExpanded = !isExpanded;
	};

	/**
	 * When the parent list collapses, any children that are expanded also collapse.
	 * This means next time the parent list is expanded, the children aren't already expanded.
	 */
	const toggleChildren = (children: ListMenuEntry[], expanded: boolean) => {
		return children.map((child) => {
			if (expanded === false && child.isExpanded === true) {
				return {
					...child,
					isExpanded: false
				};
			} else return child;
		});
	};

	$: toggledChildren =
		!isAlwaysExpanded && hasChildren ? toggleChildren(children, isExpanded) : children;

	interface CurrentPage {
		'aria-current': 'page' | undefined;
	}
	/**
	 * Tells the screen reader if the link is the current page or not
	 */
	let currentPage: CurrentPage;
	$: if (isActive) {
		currentPage = { 'aria-current': 'page' };
	} else {
		currentPage = { 'aria-current': undefined };
	}

	$: textClasses = classNames(
		`items-center level-${level}`,
		isActive
			? 'text-color-text-secondary border-b-2 border-color-action-primary mx-4'
			: 'text-color-text-primary hover:text-color-text-secondary border-b-2 border-color-container-level-0 hover:border-color-action-primary mx-4',
		level == 1 && hasChildren ? 'font-semibold' : 'font-normal'
	);

	const orientationClasses = {
		vertical: 'pl-4',
		horizontal: 'py-2 absolute'
	};

	$: childClasses = classNames(!isExpanded ? 'hidden' : orientationClasses[orientation]);
</script>

<li>
	{#if hasChildren}
		<div {id} class="flex items-center justify-between">
			{#if href}
				<a {href} class={textClasses} {...currentPage} on:click={() => onChange(id)}>
					{title}
				</a>
			{:else}
				<span class={textClasses}>
					{title}
				</span>
			{/if}

			{#if !isAlwaysExpanded}
				<Button
					on:click={() => toggleMenu()}
					slim={true}
					emphasis="secondary"
					variant="text"
					size="sm"
					class="level-{level}"
					ariaLabel="More {title} pages"
					actionProps={{
						'aria-expanded': isExpanded,
						'aria-controls': `${title}-menu`
					}}
				>
					<Icon
						src={isExpanded ? ChevronDown : ChevronRight}
						class="w-6 h-6"
						theme="mini"
						aria-hidden="true"
					/>
				</Button>
			{/if}
		</div>
	{:else}
		<a {id} {href} class={textClasses} {...currentPage} on:click={() => onChange(id)}>
			{title}
		</a>
	{/if}

	{#if hasChildren}
		<ul id={childMenuId} class={childClasses}>
			{#each toggledChildren as child}
				<svelte:self
					href={child.url}
					title={child.title}
					id={child.id}
					children={child.children}
					level={level + 1}
					{orientation}
					{isAlwaysExpanded}
					{onChange}
					isExpanded={child.isExpanded}
				/>
			{/each}
		</ul>
	{/if}
</li>
