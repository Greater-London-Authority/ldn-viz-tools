<script lang="ts">
	import { DataDownloadButton, ImageDownloadButton } from '@ldn-viz/ui';
	import { ArrowDownTray, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let chartToCapture: HTMLDivElement;
	export let data: any;
</script>

<div
	class="flex flex-col sm:flex-row shrink-0 sm:ml-auto sm:self-end capture-ignore"
	data-html2canvas-ignore
>
	<DataDownloadButton
		{data}
		filename="download.csv"
		format="CSV"
		variant="text"
		emphasis="secondary"
		size="sm"
	>
		Download as CSV <Icon
			src={ArrowDownTray}
			theme="mini"
			class="w-5 h-5 ml-2"
			aria-hidden="true"
		/>
	</DataDownloadButton>
	<DataDownloadButton
		{data}
		filename="download.json"
		format="JSON"
		variant="text"
		emphasis="secondary"
		size="sm"
	>
		Download as JSON<Icon
			src={ArrowDownTray}
			theme="mini"
			class="w-5 h-5 ml-2"
			aria-hidden="true"
		/>
	</DataDownloadButton>

	<ImageDownloadButton
		format="PNG"
		htmlNode={chartToCapture}
		variant="text"
		emphasis="secondary"
		size="sm"
	>
		Save as image<Icon src={Camera} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
	</ImageDownloadButton>
</div>
