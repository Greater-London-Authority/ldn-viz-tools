<script lang="ts">
	import { DataDownloadButton, ImageDownloadButton } from '@ldn-viz/ui';
	import { ArrowDownTray, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let chartToCapture: HTMLDivElement;
	export let data: any;

	/**
	 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
	 */
	export let columnMapping: undefined | { [oldName: string]: string } = undefined;
</script>

<div
	class="flex flex-col sm:flex-row shrink-0 sm:ml-auto sm:self-end capture-ignore gap-2"
	data-html2canvas-ignore
>
	<DataDownloadButton
		{data}
		{columnMapping}
		filename="download"
		formats={["CSV", "JSON"]}
	>
		Download <Icon
			src={ArrowDownTray}
			theme="mini"
			class="w-5 h-5 ml-2"
			aria-hidden="true"
		/>
	</DataDownloadButton>

	<ImageDownloadButton
		formats={["PNG"]}
		htmlNode={chartToCapture}
	>
		Save as image<Icon src={Camera} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
	</ImageDownloadButton>
</div>
