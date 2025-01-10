<script lang="ts">
	import Popover from '../popover/Popover.svelte';

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

	let openStore;
</script>

<Popover bind:openStore>
	<svelte:fragment slot="hint">
		<div class="w-6 h-6 bg-white">
			<div class="w-4 h-4 relative left-[4px] top-[4px]" style:background={color}></div>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="title">Color</svelte:fragment>

	<span class="text-sm">Click to assign a color to this layer.</span>

	<div class="flex flex-wrap gap-2">
		{#each colors as colorOption}
			<div
				class="w-6 h-6 bg-white"
				style:background={colorOption}
				on:click={() => {
					color = colorOption;
					$openStore = false;
				}}
			></div>
		{/each}
	</div>
</Popover>
