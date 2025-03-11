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

	export let href: string;
	export let label: string;
	export let level: number = 1;
	export let children: ListMenuItem[] = [];
	export let expanded = false;
</script>

<li
	class={level !== 1
		? 'font-normal text-color-action-text-secondary hover:text-color-action-primary-hover pl-4'
		: 'font-semibold text-color-text-primary hover:text-color-action-primary-hover'}
>
	<a {href} class="flex shrink-0 items-center level-{level}">{label}</a>

	{#if children?.length > 0}
		<button
			aria-expanded={expanded}
			aria-controls="{label}-menu"
			class="flex shrink-0 items-center level-{level}"
		>
			<Icon src={expanded ? ChevronDown : ChevronRight} />
		</button>
		<ul id="{label}-menu" class={!expanded ? 'hidden' : ''}>
			{#each children as child}
				<svelte:self
					href={child.link}
					label={child.label}
					children={child.children}
					level={level + 1}
				/>
			{/each}
		</ul>
	{/if}
</li>
