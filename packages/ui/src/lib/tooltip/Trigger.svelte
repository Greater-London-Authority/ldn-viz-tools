<script lang="ts">
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { getContext } from 'svelte';
	import Button from '../button/Button.svelte';
	import { floatingRef } from '../tooltip/tooltip.js';

	/**
	 * text that appears in the tooltip target, next to the icon
	 */
	export let hintLabel = 'what is this?';

	/**
	 * text size for the tooltip target
	 */
	export let hintSize: 'sm' | 'md' | 'lg' | undefined = undefined;

	const { triggerMouseEnter, triggerMouseLeave, triggerClick } = getContext('triggerFuncs');
	let element;
</script>

<Button variant="text" size={hintSize} class="!p-0" emphasis="secondary">
	<span
		use:floatingRef
		bind:this={element}
		on:mouseenter={() => triggerMouseEnter(element)}
		on:mouseleave|stopPropagation={triggerMouseLeave}
		on:click={triggerClick}
		role="tooltip"
		class="inline-flex items-center"
	>
		{#if $$slots.hint}
			<!-- if present, replaces the default `hintLabel` and icon  -->
			<slot name="hint" />
		{:else}
			{hintLabel}

			<Icon
				src={InformationCircle}
				theme="mini"
				class="w-[18px] h-[18px] ml-0.5"
				aria-hidden="true"
			/>
		{/if}
	</span>
</Button>
