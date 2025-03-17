<script context="module" lang="ts">
	export interface ListMenuItem {
		title: string;
		id: string;
		url: string;
		children: ListMenuItem[];
	}
</script>

<script lang="ts">
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import { selectedValue } from './listMenuStores.svelte';

	export let id = randomId();
	export let href: string;
	export let title: string;
	export let level: number = 1;
	export let children: ListMenuItem[] = [];
	export let isExpanded: boolean = false;
	export let isAlwaysExpanded: boolean = false;
	export let orientation: 'vertical' | 'horizontal' = 'vertical';
	export let onChange;

	let childMenuId = title.toLowerCase() + '-menu';

	$: hasChildren = children.length > 0;

	$: isActive = $selectedValue === id;
	$: if ((isActive && hasChildren) || isAlwaysExpanded) {
		isExpanded = true;
	}

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
		vertical: '',
		horizontal: 'py-2 absolute'
	};

	$: childClasses = classNames(!isExpanded ? 'hidden' : orientationClasses[orientation]);
</script>

<!-- need an active state - if active, children are expanded -->

<li
	class={level !== 1
		? 'font-normal text-color-action-text-secondary hover:text-color-action-primary-hover pl-4'
		: 'font-semibold text-color-text-primary hover:text-color-action-primary-hover'}
>
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
					on:click={() => (isExpanded = !isExpanded)}
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
					<!-- right aligned -->
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
			{#each children as child}
				<svelte:self
					href={child.url}
					title={child.title}
					id={child.id}
					children={child.children}
					level={level + 1}
					{isAlwaysExpanded}
					{onChange}
					isExpanded={false}
				/>
			{/each}
		</ul>
	{/if}
</li>
