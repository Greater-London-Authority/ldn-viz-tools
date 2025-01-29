<script lang="ts" context="module">
	import { currentThemeMode } from '../themeSwitcher/themeStore';
	import { get } from 'svelte/store';

	export const colorFromName = (colorName: string, theme: any) => {
		let val = theme.color;
		for (const part of colorName.split('.')) {
			val = val[part];
			if (!val) {
				console.error(`Color name "${colorName}" not defined in theme "${get(currentThemeMode)}"`);
			}
		}
		return val as unknown as string;
	};
</script>

<script lang="ts">
	import type { Writable } from 'svelte/store';
	import Popover from '../popover/Popover.svelte';

	import { currentTheme } from '../themeSwitcher/themeStore';

	export let color: string;

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

	$: color = colorFromName(colorName, $currentTheme);

	let openStore: Writable<boolean>;
</script>

<Popover bind:openStore>
	<svelte:fragment slot="hint">
		<div
			class="w-5 h-5 relative border rounded-full"
			style:background={colorFromName(colorName, $currentTheme)}
		></div>
	</svelte:fragment>

	<svelte:fragment slot="title">Color</svelte:fragment>

	<span class="text-xs mb-2 inline-block">Click to assign a color to this layer.</span>

	<div class="flex flex-wrap gap-2">
		{#each colorNames as colorOption}
			<button
				class="w-6 h-6 rounded-full"
				style:background={colorFromName(colorOption, $currentTheme)}
				on:click={() => {
					colorName = colorOption;
					$openStore = false;
				}}
			/>
		{/each}
	</div>
</Popover>
