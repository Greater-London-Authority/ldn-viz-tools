<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FillPatch from './FillPatch.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Layer Controls/FillPatch',
		component: FillPatch,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import RadioButtonGroupSolid from '../radioButtonSolid/RadioButtonGroupSolid.svelte';

	let selectedPattern = $state('hatch-1x');
	let selectedColor = $state('data.primary');

	const patchOptions = [
		{ id: 'hatch-1x', label: 'Coarse Hatch' },
		{ id: 'hatch-2x', label: 'Fine Hatch' },
		{ id: 'hatch-cross', label: 'Cross Hatch' },
		{ id: 'dots', label: 'Dots' }
	];

	const colorOptions = [
		{ id: 'data.primary', label: 'Token (data.primary)' },
		{ id: 'data.secondary', label: 'Token (data.secondary)' },
		{ id: 'rgb(255,0,0)', label: 'RGB color (red)' },
		{ id: 'rgb(0,255,0)', label: 'RGB color (green)' },
		{ id: 'rgb(0,0,255)', label: 'RGB color (blue)' }
	];
</script>

<Story name="Default - Single Hatch Pattern">
	{#snippet template()}
		<FillPatch patternName="hatch-1x" />
	{/snippet}
</Story>

<Story name="Using a list of FillPatch components">
	{#snippet template()}
		<div class="flex flex-col gap-6">
			{#each ['hatch-1x', 'hatch-2x', 'hatch-cross', 'dots'] as patternName}
				{#each ['data.primary', 'data.secondary', 'data.tertiary'] as colorName}
					<div class="flex items-center gap-4">
						<FillPatch {patternName} {colorName} />

						<div class="text-sm">
							<p><strong>Pattern:</strong> {patternName}</p>
							<p><strong>Color:</strong> {colorName}</p>
						</div>
					</div>
				{/each}
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Updating when pattern or color changed">
	{#snippet template()}
		<div class="flex flex-col gap-6">
			<RadioButtonGroupSolid
				bind:selectedId={selectedPattern}
				options={patchOptions}
				label="Pattern"
			/>

			<RadioButtonGroupSolid bind:selectedId={selectedColor} options={colorOptions} label="Color" />

			<div class="flex flex-col gap-2">
				<div class="flex items-center gap-4">
					<FillPatch
						patternName={selectedPattern}
						{...selectedColor.startsWith('rgb')
							? { colorVal: selectedColor }
							: { colorName: selectedColor }}
					/>

					<div class="text-sm">
						<p><strong>Pattern:</strong> {selectedPattern}</p>
						<p><strong>Color:</strong> {selectedColor}</p>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
