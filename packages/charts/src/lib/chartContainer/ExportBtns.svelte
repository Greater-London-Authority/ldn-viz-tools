<script lang="ts">
	import { DataDownloadButton, ImageDownloadButton } from '@ldn-viz/ui';
	import { ArrowDownTray, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let chartToCapture: HTMLDivElement;
	export let dataForDownload: { [key: string]: any }[] | undefined;
	export let dataDownloadButton: true | false | ('CSV' | 'JSON')[];
	export let imageDownloadButton: true | false | ('PNG' | 'SVG')[];

	/**
	 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
	 */
	export let columnMapping: undefined | { [oldName: string]: string } = undefined;
</script>

<!-- class="flex flex-col sm:flex-row shrink-0 sm:ml-auto sm:self-end sm:space-x-2 capture-ignore" -->
<div
	class="flex flex-col space-y-2 mt-2 shrink-0 sm:flex-row sm:space-y-0 sm:space-x-2 sm:mt-0 sm:items-end sm:ml-auto"
	data-html2canvas-ignore
>
	{#if dataDownloadButton && dataForDownload}
		<DataDownloadButton
			data={dataForDownload}
			{columnMapping}
			filename="download"
			formats={dataDownloadButton === true ? ['CSV', 'JSON'] : dataDownloadButton}
			variant="outline"
			emphasis="secondary"
			size="sm"
		>
			Download as
			<svelte:fragment slot="afterLabel">
				<Icon src={ArrowDownTray} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
			</svelte:fragment>
		</DataDownloadButton>
	{/if}

	{#if imageDownloadButton}
		<ImageDownloadButton
			formats={imageDownloadButton === true ? ['PNG', 'SVG'] : imageDownloadButton}
			htmlNode={chartToCapture}
			variant="outline"
			emphasis="secondary"
			size="sm"
		>
			Save as image
			<svelte:fragment slot="afterLabel">
				<Icon src={Camera} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
			</svelte:fragment>
		</ImageDownloadButton>
	{/if}
</div>
