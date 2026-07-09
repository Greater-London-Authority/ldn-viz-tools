<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ImageDownloadButton from './ImageDownloadButton.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/ImageDownloadButton',
		component: ImageDownloadButton,
		tags: ['autodocs'],

		argTypes: {
			formats: {
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

	let htmlNode: HTMLElement = $state() as HTMLElement;
	let htmlNode2: HTMLElement = $state() as HTMLElement;

	let svgRef: SVGElement = $state() as SVGElement;
</script>

<div bind:this={htmlNode} class="flex w-fit flex-col gap-2 bg-color-container pb-8 text-color-text">
	<h2 class="text-lg font-bold">A title</h2>
	<p class="text-color-text-muted" data-capture-ignore>A paragraph of text...</p>
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

<Story name="Disabled" args={{ disabled: true }} />

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

<!-- Setting `filename` controls the name of the downloaded file. Any trailing `.png`/`.svg`
  is stripped and the correct extension for the chosen format is appended, so here the file
  is saved as `my-chart.png` or `my-chart.svg`. -->
<Story name="Custom filename">
	{#snippet template()}
		<ImageDownloadButton {htmlNode} filename="my-chart.png">
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<!-- The `padding` prop (default `30`) controls the amount of whitespace, in pixels, added
  around the captured content. Here it is increased to give the exported image more margin. -->
<Story name="Custom padding">
	{#snippet template()}
		<ImageDownloadButton {htmlNode} formats={['PNG']} padding={60}>
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<!-- The `beforeLabel` snippet renders content before the button label (the counterpart to
  `afterLabel`, used in the other stories). 
 Here it's used to add an icon on the left (rather than right) of the button.
  -->
<Story name="With beforeLabel snippet">
	{#snippet template()}
		<ImageDownloadButton {htmlNode}>
			{#snippet beforeLabel()}
				<Icon src={Camera} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<!-- `ImageDownloadButton` extends `ButtonProps`, so `variant`, `emphasis` and `size` are
  passed through to the underlying button to restyle it. -->
<Story name="Button variant/size passthrough">
	{#snippet template()}
		<ImageDownloadButton {htmlNode} variant="outline" emphasis="secondary" size="lg">
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>

<!-- Here the circle and rectangle are separated into superimposed SVGs;
  because the `data-capture-ignore` atribtue has been applied to the second,
  it will not be included in the exported image . -->
<Story name="Hiding part of an SVG">
	{#snippet template()}
		<div bind:this={htmlNode2} class="relative">
			<svg width="100" height="100">
				<rect x="0" y="0" width="100" height="100" fill="red" />
			</svg>
			<svg
				width="100"
				height="100"
				class="pointer-events-none absolute inset-0"
				data-capture-ignore
			>
				<circle cx="10" cy="10" r="10" fill="blue" />
			</svg>
		</div>
		<ImageDownloadButton htmlNode={htmlNode2} scaleFactor={2} fullWidth formats={['SVG']}>
			{#snippet afterLabel()}
				<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</ImageDownloadButton>
	{/snippet}
</Story>
