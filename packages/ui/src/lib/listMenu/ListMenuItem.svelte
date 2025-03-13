<script context="module" lang="ts">
	export interface ListMenuItem {
		label: string;
		link: string;
		children: ListMenuItem[];
	}
</script>

<script lang="ts">
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	export let id = randomId();
	export let href: string;
	export let label: string;
	export let level: number = 1;
	export let children: ListMenuItem[] = [];
	export let expanded: boolean = false;
	export let isAlwaysExpanded: boolean = false;
	export let selected: string = '';

	let hasChildren: boolean;
	$: hasChildren = children.length > 0;

	let itemClasses: string;
	$: itemClasses = classNames(
		selected
			? 'text-color-text-secondary border-b-2 border-color-action-primary mx-4'
			: 'text-color-text-primary hover:text-color-text-secondary border-b-2 border-color-container-level-0 hover:border-color-action-primary mx-4',
		level == 1 && hasChildren ? 'font-semibold' : 'font-normal'
		// level == 1 || (level == 2 && hasChildren) ? 'font-semibold' : 'font-normal'
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
			<svelte:element
				this={href ? 'a' : 'span'}
				{href}
				class="{itemClasses} items-center level-{level}"
			>
				{label}
			</svelte:element>
			{#if !isAlwaysExpanded}
				<Button
					on:click={() => (expanded = !expanded)}
					slim={true}
					emphasis="secondary"
					variant="text"
					size="sm"
					class="level-{level}"
					ariaLabel="More {label} pages"
					actionProps={{
						'aria-expanded': expanded,
						'aria-controls': `${label}-menu`
					}}
				>
					<!-- right aligned -->
					<Icon
						src={expanded ? ChevronDown : ChevronRight}
						class="w-6 h-6"
						theme="mini"
						aria-hidden="false"
						aria-label="More {label} pages"
					/>
				</Button>
			{/if}
		</div>
	{:else}
		<a {id} {href} class="{itemClasses} items-center level-{level}">
			{label}
		</a>
	{/if}

	{#if hasChildren}
		<ul id="{label}-menu" class={!expanded && !isAlwaysExpanded ? 'hidden' : ''}>
			{#each children as child}
				<svelte:self
					href={child.link}
					label={child.label}
					children={child.children}
					level={level + 1}
					{isAlwaysExpanded}
				/>
			{/each}
		</ul>
	{/if}
</li>
