<script lang="ts">
	import { ChevronDown, ChevronUp, ChevronUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Tooltip } from '@ldn-viz/ui';

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
	export let order: 'asc' | 'desc' | undefined = undefined;

	/**
	 * Function called when user changes sort order.
	 */
	export let toggle: (ev: Event) => void = () => {};

	/**
	 * Text to be displayed in tooltip after user hovers on info icon after column heading.
	 */
	export let hintText = '';

	const icons = {
		default: ChevronUpDown,
		asc: ChevronUp,
		desc: ChevronDown
	};
</script>

<div
	on:click={toggle}
	on:keypress={toggle}
	role="cell"
	tabindex={0}
	class="flex flex-col cursor-pointer"
>
	<div class="flex items-center min-h-[55px] ml-2 py-2 select-none">
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
				src={order ? icons[order] : icons['default']}
				theme="mini"
				class="ml-auto w-4 h-4"
				aria-hidden="true"
			/>
		{/if}
	</div>
</div>
