<script lang="ts">
	import Trigger from '../overlay/Trigger.svelte';
	import Popover from '../popover/Popover.svelte';

	import { NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import ResizeIcon from './ResizeIcon.svelte';

	export let size = 1;

	export let minSize;
	export let maxSize;

	export let disabled = false;
</script>

{#if disabled}
	<Icon
		src={NoSymbol}
		theme="mini"
		class="w-6 h-6 text-color-action-disabled cursor-not-allowed"
		aria-hidden="true"
	/>
{:else}
	<Popover>
		<Trigger slot="trigger" size="xs">
			<ResizeIcon
				class="w-6 h-6 text-color-text-primary hover:text-color-action-text-secondary-hover"
				aria-hidden="true"
			/>
			<span class="sr-only">Click to open marker size control.</span>
		</Trigger>

		<svelte:fragment slot="title">Marker size</svelte:fragment>

		<div class="flex gap-4 items-center pt-2">
			<div class="w-40">
				<input type="range" bind:value={size} min={minSize} max={maxSize} step="0.01" />
			</div>
		</div>
	</Popover>
{/if}
