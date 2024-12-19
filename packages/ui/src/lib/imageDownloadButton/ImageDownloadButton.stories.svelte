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
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Template>

<Story name="Default" source />

<Story name="Default - with image">
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Story>

<Story name="Button types">
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<div class="space-y-2">
		<ImageDownloadButton svgNode={svgRef} filename="download" emphasis="primary">
			<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
		</ImageDownloadButton>
		<ImageDownloadButton svgNode={svgRef} filename="download" emphasis="secondary">
			<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
		</ImageDownloadButton>
		<ImageDownloadButton svgNode={svgRef} filename="download" variant="outline" size="sm">
			<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
		</ImageDownloadButton>
	</div>
</Story>

<Story name="Disabled">
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef} disabled={true}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Story>

<Story name="Image with no explicit size">
	<svg bind:this={svgRef2} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef2}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Story>

<Story name="Download as an SVG - no option">
	<svg bind:this={svgRef3} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef3} formats={['SVG']}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Story>

<Story name="Download as an PNG - no option">
	<svg bind:this={svgRef3} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef3} formats={['PNG']}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Story>

<Story name="Download HTML">
	<div bind:this={htmlRef} class="flex flex-col gap-2 w-fit pb-8 text-color-text-primary">
		<h2 class="font-bold text-lg">A title</h2>
		<p class="text-color-text-secondary">A paragraph of text...</p>
		<LogoByCiu class="w-80" />
	</div>

	<ImageDownloadButton htmlNode={htmlRef}>
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
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

	<ImageDownloadButton htmlNode={htmlRef} idToPad="divToSave">
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
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

	<ImageDownloadButton htmlNode={htmlRef} idToPad="divToSave" padding="100px">
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" slot="afterLabel" />
	</ImageDownloadButton>
</Story>

<Story name="With no icon">
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef} />
</Story>

<Story name="With icon before label">
	<svg bind:this={svgRef} width="100" height="100">
		<rect x="0" y="0" width="100" height="100" fill="red" />
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>

	<ImageDownloadButton svgNode={svgRef}
		><Icon src={Camera} theme="mini" class="mr-2 w-5 h-5" aria-hidden="true" slot="beforeLabel" />
	</ImageDownloadButton>
</Story>

<style>
	svg {
		margin-bottom: 2em;
	}
</style>
