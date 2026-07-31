<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResizeControl from './ResizeControl.svelte';

	/**
	 * `ResizeControl` is a sub-control of `LayerControl`. It renders a trigger that opens a popover
	 * containing a marker-size range slider bound to `size`, with bounds set by `minSize`/`maxSize`.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Layer Controls/LayerControl/ResizeControl',
		component: ResizeControl,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let size = $state(20);
	let sizeCustom = $state(30);
</script>

<Story name="Default">
	{#snippet template()}
		<ResizeControl label="Borough" bind:size minSize={1} maxSize={100} />
		<pre class="mt-4 text-xs">{size}</pre>
	{/snippet}
</Story>

<!-- The slider bounds are controlled by `minSize` and `maxSize`. -->
<Story name="Custom min/max range">
	{#snippet template()}
		<ResizeControl label="Borough" bind:size={sizeCustom} minSize={10} maxSize={50} />
		<pre class="mt-4 text-xs">{sizeCustom}</pre>
	{/snippet}
</Story>

<!-- When disabled, a "no symbol" icon is shown in place of the trigger. -->
<Story name="Disabled">
	{#snippet template()}
		<ResizeControl label="Borough" size={20} minSize={1} maxSize={100} disabled />
	{/snippet}
</Story>
