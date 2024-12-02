<script lang="ts">
	import { DataDownloadButton, ImageDownloadButton } from '@ldn-viz/ui';
	import { ArrowDownTray, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let chartToCapture: HTMLDivElement;
	export let idToPad = '';
	export let dataForDownload: { [key: string]: any }[] | undefined;
	export let dataDownloadButton: true | false | ('CSV' | 'JSON')[];
	export let imageDownloadButton: true | false | ('PNG' | 'SVG')[];

	/**
	 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
	 */
	export let columnMapping: undefined | { [oldName: string]: string } = undefined;
</script>

<div class="flex flex-wrap mt-2 space-y-2 items-end" data-html2canvas-ignore>
	{#if dataDownloadButton && dataForDownload}
		<div class="mr-2 shrink-0">
			<DataDownloadButton
				data={dataForDownload}
				{columnMapping}
				filename="download"
				formats={dataDownloadButton === true ? ['CSV', 'JSON'] : dataDownloadButton}
				variant="outline"
				emphasis="secondary"
				size="sm"
			>
				<svelte:fragment slot="afterLabel">
					<Icon src={ArrowDownTray} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
				</svelte:fragment>
			</DataDownloadButton>
		</div>
	{/if}

	{#if imageDownloadButton}
		<div class="shrink-0">
			<ImageDownloadButton
				formats={imageDownloadButton === true ? ['PNG', 'SVG'] : imageDownloadButton}
				htmlNode={chartToCapture}
				variant="outline"
				emphasis="secondary"
				size="sm"
				{idToPad}
			>
				<svelte:fragment slot="afterLabel">
					<Icon src={Camera} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
				</svelte:fragment>
			</ImageDownloadButton>
		</div>
	{/if}
</div>
