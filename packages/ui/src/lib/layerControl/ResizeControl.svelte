<script lang="ts">
	import Popover from '../popover/Popover.svelte';
	import ResizeIcon from './ResizeIcon.svelte';
	import Trigger from '../overlay/Trigger.svelte';

	export let size = 1;

	export let minSize;
	export let maxSize;
</script>

<Popover>
	<Trigger slot="trigger">
		<ResizeIcon
			class="w-6 h-6 text-color-text-primary hover:text-color-action-text-secondary-hover"
			aria-hidden="true"
		/>
	</Trigger>

	<svelte:fragment slot="title">Marker size</svelte:fragment>

	<div class="flex gap-4 items-center pt-2">
		<div class="w-40">
			<input type="range" bind:value={size} min={minSize} max={maxSize} step="0.01" />
		</div>
	</div>
</Popover>
