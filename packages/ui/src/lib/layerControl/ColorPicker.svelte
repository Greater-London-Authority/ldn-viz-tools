<script lang="ts">
	import Trigger from '../overlay/Trigger.svelte';
	import Popover from '../popover/Popover.svelte';

	import { NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { currentTheme, tokenNameToValue } from '../theme/themeStore';

	export let label;

	export let colorName = 'data.primary';

	export let disabled = false;

	/**
	 * Optional custom colours to choose from. If these don't exist, default to categoricalColors.
	 */
	export let colorNames;

	const categoricalColors = [
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

	if (!colorNames.length) {
		colorNames = categoricalColors;
	}

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
		<Trigger slot="trigger" size="xs" ariaLabel="Click to open {label} layer colour picker">
			<div
				class="w-[22px] h-[22px] relative border rounded-full"
				style:background={tokenNameToValue(colorName, $currentTheme)}
			/>
		</Trigger>

		<svelte:fragment slot="title">Colour</svelte:fragment>

		<span class="text-xs mb-2 inline-block">Click to assign a colour to this layer.</span>

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
