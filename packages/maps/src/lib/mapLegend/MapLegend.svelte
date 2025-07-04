<script lang="ts">
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../../../../ui/src/lib/button/Button.svelte';

	/**
	 * The `<MapLegend>` component wraps around a `Legend` for display on maps.
	 */

	/**
	 * Boolean to display or hide legend
	 */
	export let isOpen: boolean = false;

	/**
	 * Value for width to pass into `ColorLegend` component
	 */
	export let width: number;

	const handleClick = () => (isOpen = !isOpen);
</script>

{#if isOpen}
	<div
		class="w-full sm:max-w-96 flex flex-col gap-3 py-3 px-4 bg-color-container-level-0 pointer-events-auto"
		bind:clientWidth={width}
	>
		<div class="flex justify-between align-middle">
			<p class="font-bold text-color-text-primary">Legend</p>
			<Button
				variant="text"
				size="sm"
				class="bg-color-container-level-0 text-color-text-primary cursor-pointer absolute right-1 top-1"
				on:click={handleClick}
				ariaLabel="Close legend"
			>
				<Icon src={XMark} theme="mini" class="w-5 h-5" />
			</Button>
		</div>
		<!-- Pass in `ColorLegend` or other components in the default slot -->
		<slot />
	</div>
{:else}
	<Button
		size="md"
		emphasis="secondary"
		class="pointer-events-auto h-8"
		on:click={handleClick}
		ariaLabel="Show legend"
	>
		Legend
	</Button>
{/if}
