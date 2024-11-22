<script lang="ts">
	import { createPopover } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import Input from '../input/Input.svelte';

	import TransparencyIcon from './TransparencyIcon.svelte';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: { placement: 'top' }
	});

	export let opacity = 1;
</script>

<div {...$trigger} use:trigger class="w-fit h-fit" title="Set layer opacity">
	<TransparencyIcon class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
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
			<p class="font-bold">Opacity</p>

			<div class="flex gap-4 items-center pt-2">
				<div class="w-40">
					<input type="range" bind:value={opacity} min="0" max="1" step="0.01" />
				</div>
				<div class="w-16"><Input bind:value={opacity} type="number" min="0" max="1"></Input></div>
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
