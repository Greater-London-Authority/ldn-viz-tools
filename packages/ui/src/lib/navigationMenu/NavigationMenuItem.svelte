<script module lang="ts">
	export interface NavigationMenuEntry {
		title: string;
		id: string;
		url: string;
		children?: NavigationMenuEntry[];
		isExpanded?: boolean;
	}
</script>

<script lang="ts">
	import NavigationMenuItem from './NavigationMenuItem.svelte';

	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import { selected } from './navigationMenuState.svelte';

	interface Props {
		/**
		 * Value set as the `id` attribute of the `<a>` or `<div>` element. Should be in the array of `items` but defaults to randomly generated value in case not.
		 */
		id?: any;
		/**
		 * Url to navigate to when link is clicked.
		 */
		href: string;
		/**
		 * Link title which should correspond to the page title
		 */
		title: string;
		/**
		 * Value set to apply styling to text. Defaults to 1, as in base list but increases if the list is nested.
		 */
		level?: number;
		/**
		 * Optional list of children items, if they exist.
		 */
		children?: NavigationMenuEntry[];
		/**
		 * Sets whether or not the list is expanded
		 */
		isExpanded?: boolean;
		/**
		 * If all list items should be visible at all times, set this
		 * to `true`.
		 */
		isAlwaysExpanded?: boolean;
		/**
		 * Optional prop to change orientation. Default is vertical.
		 */
		orientation?: 'vertical' | 'horizontal';
		/**
		 * Event handler to handle what happens when links are clicked.
		 */
		onChange: any;
	}

	let {
		id = randomId(),
		href,
		title,
		level = 1,
		children = [],
		isExpanded = $bindable(false),
		isAlwaysExpanded = false,
		orientation = 'vertical',
		onChange
	}: Props = $props();

	let childMenuId = title.toLowerCase() + '-menu';

	let hasChildren = $derived(children?.length > 0);

	let isActive = $derived(selected.value === id);

	$effect(() => {
		if ((isActive && hasChildren) || isAlwaysExpanded) {
			isExpanded = true;
		}
	});

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
	const toggleChildren = (children: NavigationMenuEntry[], expanded: boolean) => {
		return children.map((child) => {
			if (expanded === false && child.isExpanded === true) {
				return {
					...child,
					isExpanded: false
				};
			} else return child;
		});
	};

	let toggledChildren = $derived(
		!isAlwaysExpanded && hasChildren ? toggleChildren(children, isExpanded) : children
	);

	/**
	 * Tells the screen reader if the link is the current page or not
	 */
	interface CurrentPage {
		'aria-current': 'page' | undefined;
	}

	let currentPage: CurrentPage = $derived.by(() => {
		if (isActive) {
			return { 'aria-current': 'page' };
		} else {
			return { 'aria-current': undefined };
		}
	});

	let textClasses = $derived(
		classNames(
			`flex w-full items-center level-${level} p-1.5 hover:text-color-action-primary-hover hover:underline `,
			isActive ? 'text-color-action-text-primary-active underline' : '',
			level === 1 ? 'text-color-text-primary text-base' : 'text-color-text-secondary text-sm'
		)
	);

	const orientationClasses = {
		vertical: '',
		horizontal: `w-full ${level === 1 ? 'absolute z-10' : 'relative'}`
	};

	const listClasses = {
		vertical: `${level === 1 ? 'border-t border-color-ui-border-secondary' : ''} `,
		horizontal: `relative bg-color-container-level-0 ${level === 1 ? '' : ''}`
	};

	let childClasses = $derived(
		classNames(
			!isExpanded ? 'hidden' : `${level === 2 ? 'pl-4' : ''} mb-1`,
			orientationClasses[orientation]
		)
	);
	let listItemClasses = $derived(classNames(listClasses[orientation]));
</script>

<li class={listItemClasses}>
	{#if hasChildren}
		<div {id} class="flex items-center justify-between">
			{#if href}
				<a {href} class={textClasses} {...currentPage} onclick={() => onChange(id)}>
					{title}
				</a>
			{:else}
				<button class={textClasses} onclick={() => toggleMenu()}>
					{title}
				</button>
			{/if}

			{#if !isAlwaysExpanded}
				<Button
					onclick={() => toggleMenu()}
					slim={true}
					emphasis="secondary"
					variant="text"
					size="sm"
					class="level-{level}"
					aria-label="More {title} pages"
					aria-expanded={isExpanded}
					aria-controls={`${id}-menu`}
				>
					<Icon
						src={ChevronDown}
						class={classNames(
							'h-6 w-6 transition-transform motion-reduce:transition-none',
							orientation === 'horizontal' || isExpanded ? '' : '-rotate-90'
						)}
						theme="mini"
						aria-hidden="true"
					/>
				</Button>
			{/if}
		</div>
	{:else}
		<a {id} {href} class={textClasses} {...currentPage} onclick={() => onChange(id)}>
			{title}
		</a>
	{/if}

	{#if hasChildren}
		<ul id={childMenuId} class={childClasses}>
			{#each toggledChildren as child}
				<NavigationMenuItem
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
