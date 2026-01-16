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
		class="h-6 w-6 cursor-not-allowed text-color-action-disabled"
		aria-hidden="true"
		title="Cannot change size of features in layer."
	/>
{:else}
	<Popover>
		{#snippet trigger(props)}
			<Trigger {...props} size="xs" aria-label="Click to open {label} marker size control">
				<ResizeIcon
					class="h-6 w-6 text-color-text-primary hover:text-color-action-text-secondary-hover"
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
