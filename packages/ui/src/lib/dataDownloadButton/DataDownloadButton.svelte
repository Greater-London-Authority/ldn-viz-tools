<script lang="ts">
	/**
	 * The `<DataDownloadButton>` component renders a button which, when clicked on, triggers the download of a file containing data that was passed as a prop.
	 * @component
	 */

	import MultipleActionButton from '../multipleActionButton/MultipleActionButton.svelte';
	import type {
		MultipleActionButtonOption,
		MultipleActionButtonProps
	} from '../multipleActionButton/types.ts';

	import { csvFormat } from 'd3-dsv';

	type DataDownloadButtonProps = MultipleActionButtonProps & {
		/**
		 * The available data formats for the downloaded file.
		 */
		formats?: ('CSV' | 'JSON')[];
		/**
		 * The data that will be encoded in the downloaded file (formatted as an array of objects).
		 */
		data: Record<string, number | string>[];
		/**
		 * A function which, when called with no arguments, will return the data to be saved in the downloaded file.
		 * If this is provided, then the `data` prop is ignored.
		 */
		dataFn?: undefined | (() => any[]) | (() => Promise<any[]>);
		/**
		 * The name the downloaded file will be saved with.
		 */
		filename: string;
		/**
		 * If `true`, the user will not be able to interact with the button to download data.
		 */
		disabled?: boolean;
		/**
		 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };
		/**
		 * If `true`, then button will fill full width of parent.
		 */
		fullWidth?: boolean;
	};

	let {
		formats = ['CSV', 'JSON'],
		data,
		dataFn = undefined,
		filename,
		disabled = false,
		columnMapping = undefined,
		fullWidth = false,
		...restProps
	}: DataDownloadButtonProps = $props();

	const enforceExtension = (name: string, extension: string) => {
		return name.toLocaleLowerCase().endsWith(extension) ? name : `${name}${extension}`;
	};

	const downloadFromURL = (url: string, name: string) => {
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('target', '_blank');
		link.setAttribute('download', name);
		link.dispatchEvent(new MouseEvent('click'));
	};

	const downloadJSON = async () => {
		const dataString = JSON.stringify(await renameColumns(), null, 4);
		const dataURL = 'data:application/json;base64,' + window.btoa(dataString);
		downloadFromURL(dataURL, enforceExtension(filename || 'data', '.json'));
	};

	const downloadCSV = async () => {
		const dataString = csvFormat(await renameColumns());
		const dataURL = 'data:application/csv;base64,' + window.btoa(dataString);
		downloadFromURL(dataURL, enforceExtension(filename || 'data', '.csv'));
	};

	const renameColumns = async () => {
		const dataToSave = dataFn ? await Promise.resolve(dataFn()) : data;

		return dataToSave.map((datum) => {
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

	let options: MultipleActionButtonOption[] = $derived.by(() => {
		const opts = [];
		if (formats.includes('CSV')) {
			opts.push({
				id: 'CSV',
				buttonLabel: 'Download as CSV',
				menuLabel: 'CSV',
				menuDescription: 'Can be opened in software such as Excel.',
				default: true
			});
		}
		if (formats.includes('JSON')) {
			opts.push({
				id: 'JSON',
				buttonLabel: 'Download as JSON',
				menuLabel: 'JSON',
				menuDescription: 'Sometimes more convenient for programmers.'
			});
		}
		return opts;
	});

	let selectedOption: MultipleActionButtonOption = $derived(options[0]);
	let format = $derived(selectedOption?.id ?? 'CSV');
	let download = $derived(format === 'JSON' ? downloadJSON : downloadCSV);
</script>

<MultipleActionButton
	{...restProps}
	{options}
	bind:state={selectedOption}
	menuTitle="Select data format"
	onClick={download}
	{disabled}
	{fullWidth}
></MultipleActionButton>
