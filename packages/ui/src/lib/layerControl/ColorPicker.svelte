<script lang="ts">
	import type { Writable } from 'svelte/store';
	import Popover from '../popover/Popover.svelte';

	import { currentTheme, tokenNameToValue } from '../theme/themeStore';
	import Trigger from '../overlay/Trigger.svelte';

	export let colorName = 'data.categorical.darkpink';

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

<Popover bind:isOpen>
	<Trigger slot="trigger">
		<div
			class="w-5 h-5 relative border rounded-full"
			style:background={tokenNameToValue(colorName, $currentTheme)}
		></div>
	</Trigger>

	<svelte:fragment slot="title">Color</svelte:fragment>

	<span class="text-xs mb-2 inline-block">Click to assign a color to this layer.</span>

	<div class="flex flex-wrap gap-2">
		{#each colorNames as colorOption}
			<button
				class="w-6 h-6 rounded-full"
				style:background={tokenNameToValue(colorOption, $currentTheme)}
				on:click={() => {
					colorName = colorOption;
					isOpen = false;
				}}
			/>
		{/each}
	</div>
</Popover>
