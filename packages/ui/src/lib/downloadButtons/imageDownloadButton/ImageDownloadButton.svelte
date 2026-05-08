<script lang="ts">
	/* The `<ImageDownloadButton>` component renders a button which, when clicked on, downloads an image file showing either an `HTML` or `SVG` element and its children.
	 *
	 * **Note**: This will not convert a non svg element into an svg, but will download an existing svg element as an svg file.
	 *
	 * To hide elements, apply the attribute `data-capture-ignore` and they will not be included in the downloaded image.
	 * Note that this will not work for elements within an SVG (e.g., `<rect>`, `<text>`, `<line>`).
	 * To hide only part of an SVG, separate the content into two SVG elements, and superimpose them by
	 * placing them inside a div and applying the classes `absolute inset-0 pointer-events-none` to the second.
	 * You can then place the SVG that should be hidden into an SVG with the `data-capture-ignore` attribute applied.
	 *
	 * @component
	 */

	import type { Snippet } from 'svelte';
	import type { ButtonProps } from '../../button/types';
	import MultipleActionButton from '../../multipleActionButton/MultipleActionButton.svelte';
	import type { MultipleActionButtonOption } from '../../multipleActionButton/types';
	import { downloadImage } from './utils';

	type ImageDownloadButtonProps = ButtonProps & {
		/**
		 * An `Element` node to be converted. When 'SVG' format is selected the largest child svg element will be targeted.
		 * This is primarily for use with charts where the chart element needs to be compatible with Figma/ illustrator.
		 * If this does not yield the desired results you may need to adjust your markup.
		 */
		htmlNode: HTMLElement | SVGElement;

		/**
		 * The available file formats for the downloaded image.
		 */
		formats?: ('PNG' | 'SVG')[];

		/**
		 * The name the downloaded file will be saved with.
		 */
		filename?: string;

		/**
		 * Amount of padding to add, in pixels.
		 */
		padding?: number;

		/**
		 * If `true`, the user will not be able to interact with the button to download data.
		 */
		disabled?: boolean;

		/**
		 * If converting an SVG to PNG, the resolution of the PNG will be `scaleFactor` times the size at which the SVG was displayed at.
		 */
		scaleFactor?: number;

		/**
		 * If `true`, then button will fill full width of parent.
		 */
		fullWidth?: boolean;

		beforeLabel?: Snippet;
		afterLabel?: Snippet;
	};

	let {
		htmlNode,
		formats = ['PNG', 'SVG'],
		filename = '',
		padding = 30,
		disabled = false,
		scaleFactor = 2,
		fullWidth = false,
		...restProps
	}: ImageDownloadButtonProps = $props();

	let options: MultipleActionButtonOption[] = $derived.by(() => {
		const opts = [];
		if (formats.includes('PNG')) {
			opts.push({
				id: 'PNG',
				buttonLabel: 'Download as PNG',
				menuLabel: 'PNG',
				menuDescription:
					'A raster image format that can be widely read, but more difficult to edit.',
				default: true
			});
		}
		if (formats.includes('SVG')) {
			opts.push({
				id: 'SVG',
				buttonLabel: 'Download as SVG',
				menuLabel: 'SVG',
				menuDescription:
					'A vector image format that can be edited in software such as Adobe Illustrator.'
			});
		}
		return opts;
	});

	let selectedOption: MultipleActionButtonOption = $derived(options[0]);

	let format = $derived(selectedOption?.id ?? 'PNG');
</script>

<MultipleActionButton
	{options}
	bind:state={selectedOption}
	menuTitle="Select image format"
	onClick={() => downloadImage(htmlNode, padding, format, filename, scaleFactor)}
	{disabled}
	{fullWidth}
	{...restProps}
></MultipleActionButton>
