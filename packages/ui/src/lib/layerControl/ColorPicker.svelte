<script lang="ts">
	import type { Writable } from 'svelte/store';
	import Popover from '../popover/Popover.svelte';

	export let color = '#EE266D';

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

	let openStore: Writable<boolean>;
</script>

<Popover bind:openStore>
	<svelte:fragment slot="hint">
		<div class="w-5 h-5 relative border" style:background={color}></div>
	</svelte:fragment>

	<svelte:fragment slot="title">Color</svelte:fragment>

	<span class="text-xs mb-2 inline-block">Click to assign a color to this layer.</span>

	<div class="flex flex-wrap gap-2">
		{#each colors as colorOption}
			<button
				class="w-6 h-6"
				style:background={colorOption}
				on:click={() => {
					color = colorOption;
					$openStore = false;
				}}
			/>
		{/each}
	</div>
</Popover>
