<script lang="ts">
	import { DocumentDownloadIcon } from '@rgossiaux/svelte-heroicons/outline';

	import { csvFormat } from 'd3-dsv';

	export let format: 'CSV' | 'JSON' | undefined;
	export let label = '';
	export let title = 'Download data';
	export let data: any;
	export let filename: string;

	export let disabled = false;

	const downloadFromURL = (url: string, name: string) => {
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('target', '_blank');
		link.setAttribute('download', name);
		link.dispatchEvent(new MouseEvent('click'));
	};

	const downloadJSON = () => {
		const dataString = JSON.stringify(data, null, 4);
		const dataURL = 'data:application/json;base64,' + window.btoa(dataString);
		downloadFromURL(dataURL, filename || `data.json`);
	};

	const downloadCSV = () => {
		const dataString = csvFormat(data);
		const dataURL = 'data:application/csv;base64,' + window.btoa(dataString);
		downloadFromURL(dataURL, filename || `data.csv`);
	};

	const download = format === 'JSON' ? downloadJSON : downloadCSV;
</script>

<button
	{title}
	on:click={download}
	{disabled}
	class="flex items-center w-fit border border-core-grey-700 disabled:bg-core-grey-300"
>
	{label}
	<DocumentDownloadIcon class="color-gray-900 w-4 h-4 inline" />
</button>
