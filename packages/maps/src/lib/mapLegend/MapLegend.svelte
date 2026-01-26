<script lang="ts">
	import { Button } from '@ldn-viz/ui';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';

	/**
	 * The `<MapLegend>` component provides a container inside which a `Legend` can be inserted for display on maps.
	 */

	interface Props {
		/**
		 * Boolean to display or hide legend
		 */
		isOpen?: boolean;
		/**
		 * Value for width to pass into `ColorLegend` component
		 */
		width: number;
		children?: Snippet;
	}

	let { isOpen = $bindable(true), width = $bindable(), children }: Props = $props();

	const handleClick = () => (isOpen = !isOpen);
</script>

{#if isOpen}
	<div
		class="bg-color-container pointer-events-auto flex w-full flex-col gap-3 px-4 py-3 sm:max-w-96"
		bind:clientWidth={width}
	>
		<div class="flex justify-between align-middle">
			<p class="text-color-text font-bold">Legend</p>
			<Button
				variant="text"
				size="sm"
				class="bg-color-container text-color-text absolute right-1 top-1 cursor-pointer"
				onclick={handleClick}
				aria-label="Close legend"
			>
				<Icon src={XMark} theme="mini" class="h-5 w-5" />
			</Button>
		</div>
		<!-- Pass in `ColorLegend` or other components in the default slot -->
		<div class="text-sm">{@render children?.()}</div>
	</div>
{:else}
	<Button
		size="md"
		emphasis="muted"
		class="pointer-events-auto h-8"
		onclick={handleClick}
		aria-label="Show legend"
	>
		Legend
	</Button>
{/if}
