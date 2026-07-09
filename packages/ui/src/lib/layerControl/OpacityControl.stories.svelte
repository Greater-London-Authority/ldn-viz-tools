<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OpacityControl from './OpacityControl.svelte';

	/**
	 * `OpacityControl` is a sub-control of `LayerControl`. It renders a trigger that opens a popover
	 * containing a linked range slider and numeric input, both bound to `opacity` (a number between
	 * 0 and 1, step 0.01).
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Layer Controls/LayerControl/OpacityControl',
		component: OpacityControl,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let opacity = $state(0.5);
	let opacityMin = $state(0);
	let opacityMax = $state(1);
</script>

<Story name="Default">
	{#snippet template()}
		<OpacityControl label="Borough" bind:opacity />
		<pre class="mt-4 text-xs">{opacity}</pre>
	{/snippet}
</Story>

<!-- When disabled, a "no symbol" icon is shown in place of the trigger. -->
<Story name="Disabled">
	{#snippet template()}
		<OpacityControl label="Borough" opacity={0.5} disabled />
	{/snippet}
</Story>

<!-- The extremes of the permitted range: opacity 0 (fully transparent) and 1 (fully opaque). -->
<Story name="Edge values">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<OpacityControl label="Transparent" bind:opacity={opacityMin} />
			<OpacityControl label="Opaque" bind:opacity={opacityMax} />
		</div>
		<pre class="mt-4 text-xs">min: {opacityMin}, max: {opacityMax}</pre>
	{/snippet}
</Story>
