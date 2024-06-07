<script lang="ts">
	import exportAsImage from '../../utils/exportAsImage';
	import { Button, DataDownloadButton } from '@ldn-viz/ui';
	import { ArrowDownTray, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let chartToCapture: HTMLDivElement;
	export let data: any;

	$: console.log('In button:', data);
</script>

<div class="py-4 flex flex-col sm:flex-row justify-end" data-html2canvas-ignore>
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
			theme="solid"
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
			theme="solid"
			class="w-5 h-5 ml-2"
			aria-hidden="true"
		/>
	</DataDownloadButton>

	<Button
		variant="text"
		emphasis="secondary"
		size="sm"
		on:click={() => exportAsImage(chartToCapture, `Chart`)}
	>
		Save as image<Icon src={Camera} theme="outline" class="w-5 h-5 ml-2" aria-hidden="true" />
	</Button>
</div>
