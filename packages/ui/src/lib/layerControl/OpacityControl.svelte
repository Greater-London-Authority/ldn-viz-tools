<script lang="ts">
	import Input from '../input/Input.svelte';
	import Trigger from '../overlay/Trigger.svelte';

	import { NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Popover from '../popover/Popover.svelte';
	import OpacityIcon from './OpacityIcon.svelte';

	interface Props {
		label: any;
		opacity?: number;
		disabled?: boolean;
	}

	let { label, opacity = $bindable(1), disabled = false }: Props = $props();
</script>

{#if disabled}
	<Icon
		src={NoSymbol}
		theme="mini"
		class="text-color-action-disabled h-6 w-6 cursor-not-allowed"
		aria-hidden="true"
		title="Cannot change opacity."
	/>
{:else}
	<Popover>
		{#snippet trigger(props)}
			<Trigger {...props} size="xs" aria-label="Click to open {label} opacity control.">
				<OpacityIcon
					class="text-color-text-primary hover:text-color-action-text-secondary-hover h-6 w-6"
					aria-hidden="true"
				/>
			</Trigger>
		{/snippet}

		{#snippet title()}
			Opacity
		{/snippet}

		<div class="flex items-center gap-4">
			<div class="w-32">
				<input
					type="range"
					class="w-32"
					bind:value={() => opacity.toString(), (v) => (opacity = +v)}
					min="0"
					max="1"
					step="0.01"
				/>
			</div>
			<div class="w-16">
				<Input
					bind:value={() => opacity.toString(), (v) => (opacity = +v)}
					type="number"
					min="0"
					max="1"
				></Input>
			</div>
		</div>
	</Popover>
{/if}
