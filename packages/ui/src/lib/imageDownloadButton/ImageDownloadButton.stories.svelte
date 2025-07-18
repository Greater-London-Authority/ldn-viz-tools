<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ImageDownloadButton from './ImageDownloadButton.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/ImageDownloadButton',
		component: ImageDownloadButton,
		tags: ['autodocs'],

		argTypes: {
			format: {
				options: ['PNG', 'SVG'],
				control: { type: 'radio' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			}
		}
	});
</script>

<script lang="ts">
	import { Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import LogoByCiu from '../logos/LogoByCIU.svelte';

	let htmlNode: HTMLElement = $state();
	let svgRef: SVGElement = $state();
</script>

<div
	bind:this={htmlNode}
	class="text-color-text-primary bg-color-container-level-0 flex w-fit flex-col gap-2 pb-8"
>
	<h2 class="text-lg font-bold">A title</h2>
	<p class="text-color-text-secondary" data-capture-ignore>A paragraph of text...</p>
	<p data-capture-ignore>Something that will not be included in the downloaded image.</p>
	<LogoByCiu class="w-80" />
</div>

<Story name="Default">
	{#snippet template(args)}
		<ImageDownloadButton {...args} {htmlNode}>
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<Story name="Disabled" source args={{ disabled: true }} />

<Story name="Download as an SVG - no option">
	{#snippet template()}
		<ImageDownloadButton {htmlNode} formats={['SVG']}>
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<Story name="Download as an PNG - no option">
	{#snippet template()}
		<ImageDownloadButton {htmlNode} formats={['PNG']}>
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<Story name="Scaled resolution">
	{#snippet template()}
		<ImageDownloadButton {htmlNode} formats={['PNG']} scaleFactor={2}>
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<Story name="Full width button">
	{#snippet template()}
		<ImageDownloadButton {htmlNode} scaleFactor={2} fullWidth>
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<!-- You can also provide an SVG element directly, rather than an HTML element that contains an SVG as a child. -->
<Story name="Providing SVG element">
	{#snippet template()}
		<svg bind:this={svgRef} width="100" height="100">
			<rect x="0" y="0" width="100" height="100" fill="red" />
			<circle cx="10" cy="10" r="10" fill="blue" />
		</svg>

		<ImageDownloadButton htmlNode={svgRef} scaleFactor={2} fullWidth>
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>
