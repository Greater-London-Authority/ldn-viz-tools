<script lang="ts">
	import { arrow } from 'svelte-floating-ui';
	import { flip, offset, shift } from 'svelte-floating-ui/dom';
	import { writable, type Writable } from 'svelte/store';
	import { floatingContent } from './tooltip';

	import { InformationCircleIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { floatingRef } from '../tooltip/tooltip.js';

	export let hintLabel = 'what is this?';

	let showTooltip: boolean = false;

	let element: HTMLSpanElement;

	const arrowRef: Writable<HTMLElement> = writable();
	let dynamicOptions = {};
	$: if (showTooltip) {
		dynamicOptions = {
			middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
			onComputed({ placement, middlewareData }: { placement: string; middlewareData: any }) {
				const { x, y } = middlewareData.arrow || {};
				const staticSide = {
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right'
				}[placement.split('-')[0]];
				$arrowRef &&
					Object.assign($arrowRef.style, {
						left: x != null ? `${x}px` : '',
						top: y != null ? `${y}px` : '',
						[staticSide!.toString()]: '-8px'
					});
			}
		};
	}
</script>

<span
	class="inline-flex items-center text-core-grey-400 dark:text-core-grey-300 cursor-pointer"
	bind:this={element}
	on:mouseenter={(e) => {
		showTooltip = true;
		floatingRef(element);
	}}
	on:mouseleave|stopPropagation={() => (showTooltip = false)}
	use:floatingRef
	role="tooltip"
>
	<slot name="hint">
		{hintLabel}
		<InformationCircleIcon class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
	</slot>
</span>

{#if showTooltip}
	<div
		class="absolute max-w-[200px] text-xs p-2 bg-core-grey-100 text-core-grey-700 dark:bg-core-grey-700 dark:text-core-grey-50 shadow-md"
		use:floatingContent={dynamicOptions}
	>
		<slot />

		<div
			class="absolute bg-core-grey-100 dark:bg-core-grey-700 rotate-45 w-4 h-4"
			bind:this={$arrowRef}
		/>
	</div>
{/if}
