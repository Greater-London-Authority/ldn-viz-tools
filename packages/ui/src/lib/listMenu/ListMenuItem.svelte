<script context="module" lang="ts">
	export interface ListMenuItem {
		title: string;
		url: string;
		children: ListMenuItem[];
	}
</script>

<script lang="ts">
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	// import { getContext } from 'svelte';
	// import type { Writable } from 'svelte/store';
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

	let hasChildren: boolean;
	$: hasChildren = children.length > 0;

	let itemClasses: string;
	$: itemClasses = classNames(
		`items-center level-${level}`,
		$selectedValue === id
			? 'text-color-text-secondary border-b-2 border-color-action-primary mx-4'
			: 'text-color-text-primary hover:text-color-text-secondary border-b-2 border-color-container-level-0 hover:border-color-action-primary mx-4',
		level == 1 && hasChildren ? 'font-semibold' : 'font-normal'
		// level == 1 || (level == 2 && hasChildren) ? 'font-semibold' : 'font-normal'
	);

	const orientationClasses = {
		vertical: '',
		horizontal: 'py-2 absolute'
	};

	$: childrenClasses = classNames(
		!isExpanded && !isAlwaysExpanded ? 'hidden' : orientationClasses[orientation]
	);
</script>

<!-- need an active state - if active, children are expanded -->

<li
	class={level !== 1
		? 'font-normal text-color-action-text-secondary hover:text-color-action-primary-hover pl-4'
		: 'font-semibold text-color-text-primary hover:text-color-action-primary-hover'}
>
	<!-- <li class={itemClasses}> -->
	{#if hasChildren}
		<div {id} class="flex items-center justify-between">
			{#if href}
				<a {href} class={itemClasses} on:click={() => onChange(id)}>
					{title}
				</a>
			{:else}
				<span class={itemClasses}>
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
						'aria-isExpanded': isExpanded,
						'aria-controls': `${title}-menu`
					}}
				>
					<!-- right aligned -->
					<Icon
						src={isExpanded ? ChevronDown : ChevronRight}
						class="w-6 h-6"
						theme="mini"
						aria-hidden="false"
						aria-title="More {title} pages"
					/>
				</Button>
			{/if}
		</div>
	{:else}
		<a {id} {href} class={itemClasses} on:click={() => onChange(id)}>
			{title}
		</a>
	{/if}

	{#if hasChildren}
		<ul id="{title}-menu" class={childrenClasses}>
			{#each children as child}
				<svelte:self
					href={child.url}
					title={child.title}
					children={child.children}
					level={level + 1}
					{isAlwaysExpanded}
					{onChange}
				/>
			{/each}
		</ul>
	{/if}
</li>
