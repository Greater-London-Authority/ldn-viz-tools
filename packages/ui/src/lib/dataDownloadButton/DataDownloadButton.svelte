<script lang="ts">
	/**
	 * The `<DataDownloadButton>` component renders a button which, when clicked on, triggers the download of a file containing data that was passed as a prop.
	 * @component
	 */

	import Button from '../button/Button.svelte';

	import { csvFormat } from 'd3-dsv';

	/**
	 * The data format of the downloaded file.
	 */
	export let format: 'CSV' | 'JSON' | undefined;

	/**
	 * The data that will be encoded in the downloaded file (formatted as an array of objects).
	 */
	export let data: Record<string, number | string>[];

	/**
	 * The name the downloaded file will be saved with.
	 */
	export let filename: string;

	/**
	 * If `true`, the user will not be able to interact with the button to download data.
	 */
	export let disabled = false;

	/**
	 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
	 */
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
