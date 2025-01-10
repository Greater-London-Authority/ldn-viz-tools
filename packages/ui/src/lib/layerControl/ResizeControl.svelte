<script lang="ts">
	import ResizeIcon from './ResizeIcon.svelte';
	import Popover from '../popover/Popover.svelte';

	export let size = 1;

	export let minSize;
	export let maxSize;
</script>

<Popover>
	<svelte:fragment slot="hint">
		<ResizeIcon class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
	</svelte:fragment>

	<svelte:fragment slot="title">Marker size</svelte:fragment>

	<div class="flex gap-4 items-center pt-2">
		<div class="w-40">
			<input type="range" bind:value={size} min={minSize} max={maxSize} step="0.01" />
		</div>
	</div>
</Popover>
