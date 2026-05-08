<script lang="ts">
	/**
	 * The `<DownloadButton>` component renders a button that combines both data and image download options.
	 * It uses a MultipleActionButton to allow users to select between CSV, JSON, PNG, and SVG formats.
	 * @component
	 */

	import type { Snippet } from 'svelte';
	import type { ButtonProps } from '../../button/types';
	import MultipleActionButton from '../../multipleActionButton/MultipleActionButton.svelte';
	import type { MultipleActionButtonOption } from '../../multipleActionButton/types';
	import { downloadCSV, downloadJSON } from '../dataDownloadButton/utils';
	import { downloadImage } from '../imageDownloadButton/utils';

	type DownloadButtonProps = ButtonProps & {
		/**
		 * The available data formats for the downloaded file.
		 */
		dataFormats?: ('CSV' | 'JSON')[];

		/**
		 * The data that will be encoded in the downloaded file (formatted as an array of objects).
		 */
		data?: Record<string, number | string>[];

		/**
		 * A function which, when called with no arguments, will return the data to be saved in the downloaded file.
		 * If this is provided, then the `data` prop is ignored.
		 */
		dataFn?: undefined | (() => any[]) | (() => Promise<any[]>);

		/**
		 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };

		/**
		 * The available file formats for the downloaded image.
		 */
		imageFormats?: ('PNG' | 'SVG')[];

		/**
		 * An `Element` node to be converted. When 'SVG' format is selected the largest child svg element will be targeted.
		 */
		htmlNode?: HTMLElement | SVGElement;

		/**
		 * Amount of padding to add to images, in pixels.
		 */
		padding?: number;

		/**
		 * If converting an SVG to PNG, the resolution of the PNG will be `scaleFactor` times the size at which the SVG was displayed at.
		 */
		scaleFactor?: number;

		/**
		 * The name the downloaded file will be saved with.
		 */
		filename?: string;

		/**
		 * If `true`, the user will not be able to interact with the button to download data.
		 */
		disabled?: boolean;

		/**
		 * If `true`, then button will fill full width of parent.
		 */
		fullWidth?: boolean;

		beforeLabel?: Snippet;
		afterLabel?: Snippet;
	};

	let {
		dataFormats = ['CSV', 'JSON'],
		data,
		dataFn = undefined,
		columnMapping = undefined,
		imageFormats = ['PNG', 'SVG'],
		htmlNode,
		padding = 30,
		scaleFactor = 2,
		filename = 'download',
		disabled = false,
		fullWidth = false,
		...restProps
	}: DownloadButtonProps = $props();

	let options: MultipleActionButtonOption[] = $derived.by(() => {
		const opts = [];

		console.log('deriving options', data, htmlNode, imageFormats);

		if (data || dataFn) {
			if (dataFormats.includes('CSV')) {
				opts.push({
					id: 'CSV',
					buttonLabel: 'Download as CSV',
					menuLabel: 'CSV',
					menuDescription: 'Can be opened in software such as Excel.',
					default: true
				});
			}
			if (dataFormats.includes('JSON')) {
				opts.push({
					id: 'JSON',
					buttonLabel: 'Download as JSON',
					menuLabel: 'JSON',
					menuDescription: 'Sometimes more convenient for programmers.'
				});
			}
		}

		if (htmlNode) {
			if (imageFormats.includes('PNG')) {
				opts.push({
					id: 'PNG',
					buttonLabel: 'Download as PNG',
					menuLabel: 'PNG',
					menuDescription:
						'A raster image format that can be widely read, but more difficult to edit.',
					default: !opts.length // Default to PNG if no data options
				});
			}
			if (imageFormats.includes('SVG')) {
				opts.push({
					id: 'SVG',
					buttonLabel: 'Download as SVG',
					menuLabel: 'SVG',
					menuDescription:
						'A vector image format that can be edited in software such as Adobe Illustrator.'
				});
			}
		}

		return opts;
	});

	let selectedOption: MultipleActionButtonOption = $derived(options[0]);
	let format = $derived(selectedOption?.id ?? 'CSV');

	const download = async () => {
		if (format === 'JSON') {
			await downloadJSON(data, dataFn, columnMapping, filename || 'data');
		} else if (format === 'CSV') {
			await downloadCSV(data, dataFn, columnMapping, filename || 'data');
		} else if (format === 'PNG' || format === 'SVG') {
			await downloadImage(htmlNode, padding, format, filename, scaleFactor);
		}
	};
</script>

<MultipleActionButton
	{options}
	bind:state={selectedOption}
	menuTitle="Select download format"
	onClick={download}
	{disabled}
	{fullWidth}
	{...restProps}
></MultipleActionButton>
