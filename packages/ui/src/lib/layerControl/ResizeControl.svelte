<script lang="ts">
	import Trigger from '../overlay/Trigger.svelte';
	import Popover from '../popover/Popover.svelte';

	import { NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import ResizeIcon from './ResizeIcon.svelte';

	interface Props {
		label: any;
		size?: number;
		minSize: any;
		maxSize: any;
		disabled?: boolean;
	}

	let { label, size = $bindable(), minSize, maxSize, disabled = false }: Props = $props();
</script>

{#if disabled}
	<Icon
		src={NoSymbol}
		theme="mini"
		class="text-color-interactive-disabled h-6 w-6 cursor-not-allowed"
		aria-hidden="true"
	/>
{:else}
	<Popover>
		{#snippet trigger(props)}
			<Trigger {...props} size="xs" aria-label="Click to open {label} marker size control">
				<ResizeIcon
					class="text-color-text hover:text-color-interactive-muted-hover h-6 w-6"
					aria-hidden="true"
				/>
			</Trigger>
		{/snippet}

		{#snippet title()}
			Marker size
		{/snippet}

		<div class="flex items-center gap-4 pt-2">
			<div class="w-40">
				<input type="range" bind:value={size} min={minSize} max={maxSize} step="0.01" />
			</div>
		</div>
	</Popover>
{/if}
