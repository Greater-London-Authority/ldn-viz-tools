<script lang="ts">
	import { createPopover } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import ResizeIcon from './ResizeIcon.svelte';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: { placement: 'top' }
	});

	export let size = 1;

	export let minSize;
	export let maxSize;
</script>

<div {...$trigger} use:trigger class="w-fit h-fit" title="Adjust marker size">
	<ResizeIcon class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
</div>

{#if $open}
	<div
		{...$content}
		use:content
		transition:fade={{ duration: 100 }}
		class="z-10 w-64 bg-core-grey-50 p-4 shadow"
	>
		<div {...$arrow} use:arrow />

		<div class="text-sm flex flex-col space-y-2 text-core-grey-800">
			<p class="font-bold">Marker size</p>

			<div class="flex gap-4 items-center pt-2">
				<div class="w-40">
					<input type="range" bind:value={size} min={minSize} max={maxSize} step="0.01" />
				</div>
			</div>
		</div>

		<button class="close" {...$close} use:close>
			<Icon src={XMark} theme="solid" class="w-8 h-8" aria-hidden="true" />
		</button>
	</div>
{/if}

<style>
	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center;
		@apply text-white transition-colors hover:bg-core-grey-100 hover:text-core-grey-800;
		@apply focus-visible:ring focus-visible:ring-core-blue-600 focus-visible:ring-offset-2;
		@apply bg-core-grey-800 p-0 text-sm font-medium;
	}
</style>
