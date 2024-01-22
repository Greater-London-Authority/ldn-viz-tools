<!-- 
	// TODO CHECK TYPES FOR STORY BOOK
	<script context="module" lang="ts">
	export interface DataDownloadButtonProps {
		format?: 'CSV' | 'JSON';
		data: any;
		filename: string;
		disabled: boolean;
	}
</script> -->

<script lang="ts">
	import Button from '../button/Button.svelte';

	import { csvFormat } from 'd3-dsv';

	export let format: 'CSV' | 'JSON' | undefined;
	export let data: Record<string, number | string>[];
	export let filename: string;

	export let disabled = false;
	export let columnMapping: undefined | { [oldName: string]: string };

	const enforceExtension = (name: string, extension: string) => {
		return name.toLocaleLowerCase().endsWith(extension) ? name : `name${extension}`;
	};

	const downloadFromURL = (url: string, name: string) => {
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('target', '_blank');
		link.setAttribute('download', name);
		link.dispatchEvent(new MouseEvent('click'));
	};

	const downloadJSON = () => {
		const dataString = JSON.stringify(renameColumns(), null, 4);
		const dataURL = 'data:application/json;base64,' + window.btoa(dataString);
		downloadFromURL(dataURL, enforceExtension(filename || 'data', '.json'));
	};

	const downloadCSV = () => {
		const dataString = csvFormat(renameColumns());
		const dataURL = 'data:application/csv;base64,' + window.btoa(dataString);
		downloadFromURL(dataURL, enforceExtension(filename || 'data', '.csv'));
	};

	const renameColumns = () => {
		return data.map((datum) => {
			if (!columnMapping) {
				return datum;
			} else {
				const reshapedDatum: { [newName: string]: string | number } = {};

				for (const oldColName of Object.keys(columnMapping)) {
					reshapedDatum[columnMapping[oldColName]] = datum[oldColName];
				}
				return reshapedDatum;
			}
		});
	};

	const download = format === 'JSON' ? downloadJSON : downloadCSV;
</script>

<Button on:click={download} {disabled} {...$$restProps}>
	<slot />
</Button>
