<script lang="ts">
	/* The `<ImageDownloadButton>` component renders a button which, when clicked on, downloads an image file showing either an `HTML` or `SVG` element and its children.
	 *
	 * **Note**: This will not convert a non svg element into an svg, but will download an existing svg element as an svg file.
	 *
	 * To ignore elements apply a data attribute "data-capture-ignore" and they will not be included in the download
	 * @component
	 */

	import { toPng, toSvg } from 'html-to-image';
	import type { Option } from '../multipleActionButton/MultipleActionButton.svelte';
	import MultipleActionButton from '../multipleActionButton/MultipleActionButton.svelte';

	/**
	 * An `Element` node to be converted. When 'SVG' format is selected the largest child svg element will be targeted.
	 * This is primarily for use with charts where the chart element needs to be compatible with Figma/ illustrator.
	 * If this does not yield the desired results you may need to adjust your markup.
	 */
	export let htmlNode: HTMLElement;

	/**
	 * The available file formats for the downloaded image.
	 */
	export let formats: ('PNG' | 'SVG')[] = ['PNG', 'SVG'];

	/**
	 * The name the downloaded file will be saved with.
	 */
	export let filename = '';

	/**
	 * Amount of padding to add, in pixels.
	 */
	export let padding = 30;

	/**
	 * If `true`, the user will not be able to interact with the button to download data.
	 */
	export let disabled = false;

	/**
	 * If converting an SVG to PNG, the resolution of the PNG will be `scaleFactor` times the size at which the SVG was displayed at.
	 */
	export let scaleFactor = 2;

	const downloadFromURL = (url: string) => {
		const initialName = filename || "image";
		const baseName = initialName.split('.')[0];
		const fname =  format === 'SVG' ? `${baseName}.svg` : `${baseName}.png` ;

		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('target', '_blank');
		link.setAttribute('download', fname);
		link.dispatchEvent(new MouseEvent('click'));
		link.remove();
	};

	const findNearestChildSvg = (htmlNode: HTMLElement) => {
		if (!(htmlNode instanceof HTMLElement)) {
			throw new Error('htmlNode must be an HTMLElement');
		}

		const svgElements = htmlNode.querySelectorAll('svg');

		let largestSVG = null;
		let largestArea = 0;

		svgElements.forEach((element) => {
			const bbox = element.getBoundingClientRect();
			const area = bbox.width * bbox.height;

			if (area > largestArea) {
				largestSVG = element;
				largestArea = area;
			}
		});

		return largestSVG;
	};

	// Filter elements to hide based on class
	const filter = (node: HTMLElement) => {
		if (node instanceof HTMLElement) {
			const ignoreAttributes = ['data-capture-ignore'];
			return !ignoreAttributes.some((attribute) => node.hasAttribute(attribute));
		}
		return node;
	};

	const download = async () => {
		const captureOptions = {
			style: {
				padding: padding + 'px'
			},

			// N.B. if we don't specify the width/height, then html-to-image will use the size of the HTML element before
			// adjusting the style to add the padding. This would result in the content being truncated.
			width: 2 * padding + htmlNode.clientWidth,
			height: 2 * padding + htmlNode.clientHeight,

			filter
		};
		if (format === 'SVG') {
			const svgNode = findNearestChildSvg(htmlNode);
			svgNode !== null
				? toSvg(svgNode, captureOptions).then((dataUrl) => downloadFromURL(dataUrl))
				: console.warn('No svgNode found');
		} else if (format === 'PNG') {
			toPng(htmlNode, { ...captureOptions, pixelRatio: scaleFactor }).then((dataUrl) =>
				downloadFromURL(dataUrl)
			);
		} else {
			console.warn('Must supply an htmlNode to be converted to image');
		}
	};

	let options: Option[] = [];
	$: {
		if (formats.includes('PNG')) {
			options.push({
				id: 'PNG',
				buttonLabel: 'Download as PNG',
				menuLabel: 'PNG',
				menuDescription:
					'A raster image format that can be widely read, but more difficult to edit.',
				default: true
			});
		}
		if (formats.includes('SVG')) {
			options.push({
				id: 'SVG',
				buttonLabel: 'Download as SVG',
				menuLabel: 'SVG',
				menuDescription:
					'A vector image format that can be edited in software such as Adobe Illustrator.'
			});
		}
	}

	let selectedOption: Option;

	$: format = selectedOption?.id ?? 'PNG';
</script>

<MultipleActionButton
	{options}
	bind:state={selectedOption}
	menuTitle="Select image format"
	onClick={download}
	{disabled}
	{...$$restProps}
>
	<!-- contents of the button -->
	<svelte:fragment slot="beforeLabel"><slot name="beforeLabel" /></svelte:fragment>
	<svelte:fragment slot="afterLabel"><slot name="afterLabel" /></svelte:fragment>
</MultipleActionButton>
