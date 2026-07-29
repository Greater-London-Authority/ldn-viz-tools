<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FillTypeControl from './FillTypeControl.svelte';

	/**
	 * `FillTypeControl` is a sub-control of `LayerControl`. It renders a trigger that opens a popover
	 * with a solid/outline radio group and a grid of pattern swatches. The selected value is bound
	 * to `fillType` (e.g. `solid-fill`, `no-fill`, or a pattern id such as `hatch-cross`).
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Layer Controls/LayerControl/FillTypeControl',
		component: FillTypeControl,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let fillType = $state('solid-fill');
	let fillTypePattern = $state('hatch-cross');
</script>

<Story name="Default fill picker">
	{#snippet template()}
		<FillTypeControl label="Borough" bind:fillType />
		<pre class="mt-4 text-xs">{fillType}</pre>
	{/snippet}
</Story>

<!-- `fillType` bound to a pattern id highlights the corresponding pattern swatch. -->
<Story name="Selected pattern state">
	{#snippet template()}
		<FillTypeControl label="Borough" bind:fillType={fillTypePattern} />
		<pre class="mt-4 text-xs">{fillTypePattern}</pre>
	{/snippet}
</Story>

<!-- When disabled, a "no symbol" icon is shown in place of the trigger. -->
<Story name="Disabled">
	{#snippet template()}
		<FillTypeControl label="Borough" fillType="solid-fill" disabled />
	{/snippet}
</Story>
