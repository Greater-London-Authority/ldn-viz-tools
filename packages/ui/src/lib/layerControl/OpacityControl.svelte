<script lang="ts">
	import Input from '../input/Input.svelte';

	import Popover from '../popover/Popover.svelte';
	import OpacityIcon from './OpacityIcon.svelte';
	import Trigger from '../overlay/Trigger.svelte';

	export let opacity = 1;
</script>

<Popover>
	<Trigger slot="trigger">
		<OpacityIcon
			class="w-6 h-6 text-color-text-primary hover:text-color-action-text-secondary-hover"
			aria-hidden="true"
		/>
	</Trigger>

	<svelte:fragment slot="title">Opacity</svelte:fragment>

	<div class="flex gap-4 items-center pt-2">
		<div class="w-32">
			<input type="range" class="w-32" bind:value={opacity} min="0" max="1" step="0.01" />
		</div>
		<div class="w-16"><Input bind:value={opacity} type="number" min="0" max="1"></Input></div>
	</div>
</Popover>
