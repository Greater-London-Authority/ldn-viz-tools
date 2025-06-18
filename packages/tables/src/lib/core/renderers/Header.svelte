<script lang="ts">
	import { classNames, Overlay } from '@ldn-viz/ui';
	import { BarsArrowDown, ChevronUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { ComponentType } from 'svelte';

	/**
	 * Text of label/column heading.
	 */
	export let label: string;

	/**
	 * Text to display above the label (optional).
	 */
	export let superscriptText = '';

	/**
	 * If `true`, then allow user to sort by clicking on header.
	 */
	export let allowSorting = false;

	/**
	 * Current sort order (used to determine icons if `allowSorting` is `true`).
	 */
	export let order: 'ascending' | 'descending' | undefined = undefined;

	/**
	 * Function called when user changes sort order.
	 */
	export let toggle: (ev: Event) => void = () => {};

	/**
	 * Text to be displayed in tooltip/popover/modal after user hovers or clicks on info icon after column heading.
	 */
	export let hintText = '';

	/**
	 * A Svelte component to be displayed instead of hintText.
	 */
	export let hintComponent: undefined | ComponentType = undefined;

	/**
	 * The type of overlay in which the hint will be displayed.
	 */
	export let hintType: 'tooltip' | 'popover' | 'modal' = 'tooltip';

	/**
	 * The text color.
	 */
	export let color = '';

	export let alignHeader: 'left' | 'right' | 'center' | undefined = 'left';
	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};
	$: alignmentClass = alignmentClasses[alignHeader];

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<div class="font-bold py-0.5 w-full h-full" style:color>
	<svelte:element
		this={allowSorting ? 'button' : 'div'}
		class={classNames('flex items-center select-none', alignmentClass)}
		on:click={allowSorting ? toggle : undefined}
	>
		{#if superscriptText}
			<div class="text-left">
				<span class="font-normal text-xs">{superscriptText}</span><br />
				<span>{label}</span>
			</div>
		{:else}
			{label}

			{#if hintText || hintComponent}
				<Overlay hintLabel="" overlayType={hintType} modalTitle={label}>
					{#if hintComponent}
						<svelte:component this={hintComponent} />
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
				class={classNames('ml-0.5 w-4 h-4', order === 'ascending' ? 'flipY' : '')}
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
