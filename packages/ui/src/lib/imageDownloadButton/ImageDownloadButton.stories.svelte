<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ImageDownloadButton from './ImageDownloadButton.svelte';

	export const meta = {
		title: 'Ui/ImageDownloadButton',
		component: ImageDownloadButton,
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
	};
</script>

<script lang="ts">
	import { Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import LogoByCiu from '../logos/LogoByCIU.svelte';

	let svgRef;
	let svgRef2;
	let svgRef3;
	let htmlRef: HTMLElement;
</script>

<Template let:args>
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton {...args} svgNode={svgRef}>
		I'm an image download button!
	</ImageDownloadButton>
</Template>

<Story name="Default" source />

<Story name="Default - with image">
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef}>
		Download as PNG<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</ImageDownloadButton>
</Story>

<Story name="Button types">
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<div class="space-y-2">
		<ImageDownloadButton svgNode={svgRef} filename="download" emphasis="primary">
			Primary
			<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</ImageDownloadButton>
		<ImageDownloadButton svgNode={svgRef} filename="download" emphasis="secondary">
			Secondary
			<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</ImageDownloadButton>
		<ImageDownloadButton svgNode={svgRef} filename="download" variant="text">
			Text
			<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</ImageDownloadButton>
	</div>
</Story>

<Story name="Disabled">
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef} disabled={true}>
		Download as PNG<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</ImageDownloadButton>
</Story>

<Story name="Image with no explicit size">
	<svg bind:this={svgRef2} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef2}>
		Download as PNG<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</ImageDownloadButton>
</Story>

<Story name="Download as an SVG">
	<svg bind:this={svgRef3} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef3} format="SVG">
		Download as SVG<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</ImageDownloadButton>
</Story>

<Story name="Download HTML">
	<div bind:this={htmlRef} class="flex flex-col gap-2 w-fit pb-8 text-color-text-primary">
		<h2 class="font-bold text-lg">A title</h2>
		<p class="text-color-text-secondary">A paragraph of text...</p>
		<LogoByCiu class="w-80" />
	</div>

	<ImageDownloadButton htmlNode={htmlRef} htmlId="divToSave" format="SVG">
		Download as image<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</ImageDownloadButton>
</Story>

<Story name="Download HTML with default padding">
	<div
		bind:this={htmlRef}
		id="divToSave"
		class="flex flex-col gap-2 w-fit pb-8 text-color-text-primary"
	>
		<h2 class="font-bold text-lg">A title</h2>
		<p class="text-color-text-secondary">A paragraph of text...</p>
		<LogoByCiu class="w-80" />
	</div>

	<ImageDownloadButton htmlNode={htmlRef} idToPad="divToSave" format="SVG">
		Download as image<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</ImageDownloadButton>
</Story>

<Story name="Download HTML with custom padding">
	<div
		bind:this={htmlRef}
		id="divToSave"
		class="flex flex-col gap-2 w-fit pb-8 text-color-text-primary"
	>
		<h2 class="font-bold text-lg">A title</h2>
		<p class="text-color-text-secondary">A paragraph of text...</p>
		<LogoByCiu class="w-80" />
	</div>

	<ImageDownloadButton htmlNode={htmlRef} idToPad="divToSave" padding="100px" format="SVG">
		Download as image<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</ImageDownloadButton>
</Story>

<style>
	svg {
		margin-bottom: 2em;
	}
</style>
