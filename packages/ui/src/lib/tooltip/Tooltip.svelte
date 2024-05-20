<script lang="ts">
	/**
	 * The `<Tooltip>` component renders a tooltip target, and displays a message in a tooltip when a user mouses-over it.
	 *
	 * **Alternatives**: for longer messages, or messages that must persist until being dismissed, consider using a [Modal](./?path=/docs/ui-modal--documentation).
	 * @component
	 */

	import { arrow } from 'svelte-floating-ui';
	import { flip, offset, shift } from 'svelte-floating-ui/dom';
	import { writable, type Writable } from 'svelte/store';
	import { floatingContent, floatingRef } from './tooltip';

	import { setContext } from 'svelte';
	import Trigger from './Trigger.svelte';

	/**
	 * text that appears in the tooltip target, next to the icon
	 */
	export let hintLabel = 'what is this?';

	/**
	 * text size for the tooltip target
	 */
	export let hintSize: 'sm' | 'md' | 'lg' | undefined = undefined;

	let showTooltip = false;

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

	setContext('triggerFuncs', {
		triggerMouseEnter: (element) => {
			showTooltip = true;
			floatingRef(element);
		},
		triggerMouseLeave: () => (showTooltip = false)
	});
</script>

<Trigger {hintSize} {hintLabel} />

{#if showTooltip}
	<div
		class="absolute max-w-[200px] text-sm p-2 bg-core-grey-100 text-core-grey-700 dark:bg-core-grey-700 dark:text-core-grey-50 shadow-md z-50"
		use:floatingContent={dynamicOptions}
	>
		<!-- the text that will be displayed in the tooltip -->
		<slot />

		<div
			class="absolute bg-core-grey-100 dark:bg-core-grey-700 rotate-45 w-4 h-4"
			bind:this={$arrowRef}
		/>
	</div>
{/if}
