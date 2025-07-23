<script lang="ts">
	import { classNames, Overlay } from '@ldn-viz/ui';
	import { BarsArrowDown, ChevronUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { ComponentType } from 'svelte';

	interface Props {
		/**
		 * Text of label/column heading.
		 */
		label: string;
		/**
		 * Text to display above the label (optional).
		 */
		superscriptText?: string;
		/**
		 * If `true`, then allow user to sort by clicking on header.
		 */
		allowSorting?: boolean;
		/**
		 * Current sort order (used to determine icons if `allowSorting` is `true`).
		 */
		order?: 'ascending' | 'descending' | undefined;
		/**
		 * Function called when user changes sort order.
		 */
		toggle?: (ev: Event) => void;
		/**
		 * Text to be displayed in tooltip/popover/modal after user hovers or clicks on info icon after column heading.
		 */
		hintText?: string;
		/**
		 * A Svelte component to be displayed instead of hintText.
		 */
		hintComponent?: undefined | ComponentType;
		/**
		 * The type of overlay in which the hint will be displayed.
		 */
		hintType?: 'tooltip' | 'popover' | 'modal';
		/**
		 * The text color.
		 */
		color?: string;
		alignHeader?: 'left' | 'right' | 'center' | undefined;
		[key: string]: any;
	}

	let {
		label,
		superscriptText = '',
		allowSorting = false,
		order = undefined,
		toggle = () => {},
		hintText = '',
		hintComponent = undefined,
		hintType = 'tooltip',
		color = '',
		alignHeader = 'left',
		...rest
	}: Props = $props();
	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};
	let alignmentClass = $derived(alignmentClasses[alignHeader]);
</script>

<div class="h-full w-full py-0.5 font-semibold" style:color>
	<svelte:element
		this={allowSorting ? 'button' : 'div'}
		class={classNames('flex select-none items-center', alignmentClass)}
		onclick={allowSorting ? toggle : undefined}
	>
		{#if superscriptText}
			<div class="text-left">
				<span class="text-xs font-normal">{superscriptText}</span><br />
				<span>{label}</span>
			</div>
		{:else}
			{label}

			{#if hintText || hintComponent}
				<Overlay hintLabel="" overlayType={hintType} modalTitle={label}>
					{#if hintComponent}
						{@const SvelteComponent = hintComponent}
						<SvelteComponent />
					{:else}
						{hintText}
					{/if}
				</Overlay>
			{/if}
		{/if}

		{#if allowSorting}
			<Icon
				src={order ? BarsArrowDown : ChevronUpDown}
				theme="mini"
				class={classNames('ml-0.5 h-4 w-4', order === 'ascending' ? 'flipY' : '')}
				aria-hidden="true"
			/>
		{/if}
	</svelte:element>
</div>

<style>
	:global(.flipY) {
		transform: scaleY(-1);
	}
</style>
