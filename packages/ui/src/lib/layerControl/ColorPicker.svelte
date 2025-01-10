<script lang="ts">
	import { createPopover } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: { placement: 'top' }
	});

	export let color = 1;

	const colors = [
		'#EE266D',
		'#00AEEF',
		'#008D48',
		'#FFF200',
		'#00AEEF',
		'#E0001B',
		'#9E0059',
		'#00577D',
		'#DCA000',
		'#792C89',
		'#353D42',
		'#000000'
	];
</script>

<div {...$trigger} use:trigger class="w-fit h-fit" title="Set layer color">
	<div class="w-6 h-6 bg-white">
		<div class="w-4 h-4 relative left-[4px] top-[4px]" style:background={color}></div>
	</div>
</div>

{#if $open}
	<div
		{...$content}
		use:content
		transition:fade={{ duration: 100 }}
		class="z-50 w-64 bg-core-grey-50 p-4 shadow"
	>
		<div {...$arrow} use:arrow />

		<div class="text-sm flex flex-col space-y-2 text-core-grey-800">
			<p class="font-bold">Color</p>
			<span class="text-sm">Click to assign a color to this layer.</span>

			<div class="flex flex-wrap gap-2">
				{#each colors as colorOption}
					<button
						class="w-6 h-6 bg-white"
						style:background={colorOption}
						on:click={() => {
							color = colorOption;
						}}
						use:close
					></button>
				{/each}
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
