<script lang="ts">
	import Input from '../input/Input.svelte';

	import TransparencyIcon from './TransparencyIcon.svelte';
	import Popover from '../popover/Popover.svelte';

	export let opacity = 1;
</script>

<Popover>
	<svelte:fragment slot="hint">
		<TransparencyIcon class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
	</svelte:fragment>

	<svelte:fragment slot="title">Opacity</svelte:fragment>

	<div class="flex gap-4 items-center pt-2">
		<div class="w-32">
			<input type="range" class="w-32" bind:value={opacity} min="0" max="1" step="0.01" />
		</div>
		<div class="w-16"><Input bind:value={opacity} type="number" min="0" max="1"></Input></div>
	</div>
</Popover>
