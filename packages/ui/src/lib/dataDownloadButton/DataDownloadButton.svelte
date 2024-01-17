<script context="module" lang="ts">
	export interface DataDownloadButtonProps {
		format?: 'CSV' | 'JSON';
		data: any;
		filename: string;
		disabled: boolean;
	}
</script>

<script lang="ts">
	import Button from '../button/Button.svelte';

	import { csvFormat } from 'd3-dsv';

	export let format: DataDownloadButtonProps['format'];
	export let data: DataDownloadButtonProps['data'];
	export let filename: DataDownloadButtonProps['filename'];

	export let disabled: DataDownloadButtonProps['disabled'] = false;

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

<Button on:click={download} {disabled} {...$$restProps}>
	<slot />
</Button>
