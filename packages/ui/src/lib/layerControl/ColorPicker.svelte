<script lang="ts">
	import Trigger from '../overlay/Trigger.svelte';
	import Popover from '../popover/Popover.svelte';

	import { NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { currentTheme, tokenNameToValue } from '../theme/themeStore';

	export let label;

	export let colorName = 'data.primary';

	export let disabled = false;

	const colorNames = [
		'data.categorical.blue',
		'data.categorical.darkpink',
		'data.categorical.pink',
		'data.categorical.red',
		'data.categorical.yellow',
		'data.categorical.green',
		'data.categorical.purple',
		'data.categorical.orange',
		'data.categorical.turquoise',
		'data.neutral.0',
		'data.neutral.1'
	];

	let isOpen = false;
</script>

{#if disabled}
	<Icon
		src={NoSymbol}
		theme="mini"
		class="w-6 h-6 text-color-action-disabled cursor-not-allowed"
		aria-hidden="true"
	/>
{:else}
	<Popover bind:isOpen>
		<Trigger slot="trigger" size="xs">
			<div
				class="w-[22px] h-[22px] relative border rounded-full"
				aria-label="Click to open {label} layer color picker "
				style:background={tokenNameToValue(colorName, $currentTheme)}
			/>
		</Trigger>

		<svelte:fragment slot="title">Color</svelte:fragment>

		<span class="text-xs mb-2 inline-block">Click to assign a color to this layer.</span>

		<div class="flex flex-wrap gap-2">
			{#each colorNames as colorOption}
				<button
					class="w-6 h-6 rounded-full"
					style:background={tokenNameToValue(colorOption, $currentTheme)}
					aria-label="Color code: {colorOption}"
					on:click={() => {
						colorName = colorOption;
						isOpen = false;
					}}
				/>
			{/each}
		</div>
	</Popover>
{/if}
