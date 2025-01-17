<script lang="ts">
	import { Tooltip, classNames } from '@ldn-viz/ui';
	import { BarsArrowDown, ChevronUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

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
	 * Text to be displayed in tooltip after user hovers on info icon after column heading.
	 */
	export let hintText = '';

	export let alignHeader: 'left' | 'right' | 'center' | undefined;
	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};
	$: alignmentClass = alignmentClasses[alignHeader ?? 'left'];

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	$$restProps;
</script>

<div
	on:click={toggle}
	on:keypress={toggle}
	role="cell"
	tabindex={0}
	class="font-bold py-0.5 w-full h-full"
>
	<div class={classNames('flex items-center select-none', alignmentClass)}>
		{#if superscriptText}
			<div class="text-left">
				<span class="font-normal text-xs">{superscriptText}</span><br />
				<span>{label}</span>
			</div>
		{:else}
			{label}
			{#if hintText}
				<Tooltip hintLabel="" hintSize="sm">{hintText}</Tooltip>
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
	</div>
</div>

<style>
	:global(.flipY) {
		transform: scaleY(-1);
	}
</style>
