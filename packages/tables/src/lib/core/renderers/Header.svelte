<script lang="ts">
	import { ChevronDown, ChevronUp, ChevronUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { format } from 'd3';

	export let label: string;
	export let truncated_label: string | undefined = undefined;
	export let order: 'asc' | 'desc' | undefined = undefined;
	export let toggle: (ev: Event) => void = () => {};

	export let allowSorting;

	export let value = '';
	export let colAvg: number | undefined = undefined;
	export let formatString = '.2f';
	$: f = format(formatString);
	$: fplus = format(`+${formatString}`);
	export let display_unit = '';
	export let isSubHeader = false;

	const icons = {
		default: ChevronUpDown,
		asc: ChevronUp,
		desc: ChevronDown
	};

	$: console.log(formatString);

	export let superscriptText: string | undefined;
</script>

<div
	on:click={toggle}
	on:keypress={toggle}
	role="cell"
	tabindex={0}
	class="flex flex-col cursor-pointer"
>
	<div class="flex items-center min-h-[55px] ml-2 py-2 capitalize select-none">
		{#if superscriptText}
			<div class="text-left">
				<span class="font-normal text-xs">{superscriptText}</span><br />
				<span class="capitalize">{label}</span>
			</div>
		{:else}
			{label}
		{/if}

		<!--    {#if value}({f(+value)}{display_unit}){/if} -->

		{#if allowSorting}
			<Icon
					src={order ? icons[order] : icons['default']}
					theme="mini"
					class="ml-auto w-4 h-4"
					aria-hidden="true"
			/>
		{/if}
	</div>

	<!--
    {#if colAvg}
        <div class="text-right p-2 border-t-2 border-core-grey-800">
            {value ? fplus(+colAvg) : f(+colAvg)}{display_unit}
        </div>
    {/if}
    -->
</div>
