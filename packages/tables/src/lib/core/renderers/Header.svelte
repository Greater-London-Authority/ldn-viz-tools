<script lang="ts">
	import type { HeaderProps } from '$lib/core/renderers/HeaderProps';
	import { classNames, Overlay } from '@ldn-viz/ui';
	import { BarsArrowDown, ChevronUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

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
		..._rest
	}: HeaderProps = $props();
	const alignmentClasses = {
		left: 'justify-start mr-auto',
		right: 'justify-end ml-auto',
		center: 'justify-center mx-auto'
	};
	let alignmentClass = $derived(alignmentClasses[alignHeader]);
</script>

<div class="h-full w-full py-0.5 font-semibold" style:color>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
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
