<script lang="ts">
	import NavigationMenuItem from './NavigationMenuItem.svelte';
	import { type NavigationMenuItemProps, type NavigationMenuProps } from './types';

	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	let {
		id = randomId(),
		href,
		title,
		level = 1,
		children = [],
		isExpanded = $bindable(false),
		onChange,
		index,
		selected
	}: NavigationMenuItemProps = $props();

	const navContext: Record<keyof NavigationMenuProps, any> = getContext('navContext');

	let isAlwaysExpanded = navContext.isAlwaysExpanded as boolean;

	let orientation = navContext.orientation as NavigationMenuProps['orientation'];

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
	const toggleChildren = (children: NavigationMenuItemProps[], expanded: boolean) => {
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
	 * Tells the screen reader whether or not the link is the current page.
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

	const orientationClasses: Record<'vertical' | 'horizontal', string> = {
		vertical: '',
		horizontal: `w-full ${level === 1 ? 'absolute z-10' : 'relative'}`
	};

	const listClasses: Record<'vertical' | 'horizontal', string> = {
		vertical:
			level === 1 ? (index === 0 ? 'border-t-0' : 'border-t border-color-ui-border-secondary') : '',
		horizontal: `relative bg-color-container-level-0 ${level === 1 ? '' : ''}`
	};

	let childClasses = $derived(
		classNames(
			!isExpanded ? 'hidden' : `${level === 2 ? 'pl-4' : ''} mb-1`,
			orientationClasses[orientation!]
		)
	);
	let listItemClasses = $derived(classNames(listClasses[orientation!]));
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

			{#if !navContext.isAlwaysExpanded}
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
					href={child.href}
					title={child.title}
					id={child.id}
					children={child.children}
					level={level + 1}
					{onChange}
					isExpanded={child.isExpanded}
					{selected}
				/>
			{/each}
		</ul>
	{/if}
</li>
