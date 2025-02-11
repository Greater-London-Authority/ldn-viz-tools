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

	import { toPng } from 'html-to-image';
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

	/**
	 * If `true`, then button will fill full width of parent.
	 */
	export let fullWidth = false;

	const downloadFromURL = (url: string) => {
		const initialName = filename || 'image';

		let baseName = initialName;
		if (initialName.toLowerCase().endsWith('.png') || initialName.toLowerCase().endsWith('.svg')) {
			baseName = initialName.slice(0, -4);
		}
		const fname = format === 'SVG' ? `${baseName}.svg` : `${baseName}.png`;

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

	// Filter elements to hide based on data attribute
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

		/**
		 * Serialise function adapted from https://observablehq.com/@mbostock/saving-svg
		 */
		const serialize = (svgNode: SVGElement) => {
			return new Promise<string>((resolve, reject) => {
				try {
					const xmlns = 'http://www.w3.org/2000/xmlns/';
					const xlinkns = 'http://www.w3.org/1999/xlink';
					const svgns = 'http://www.w3.org/2000/svg';

					// Clone the SVG node to avoid mutating the original and cast type
					const svg = svgNode.cloneNode(true) as SVGElement;

					// Handle fragment identifiers (e.g., xlink:href)
					const fragment = window.location.href + '#';
					const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
					while (walker.nextNode()) {
						if (walker.currentNode instanceof Element) {
							for (const attr of walker.currentNode.attributes) {
								if (attr.value.includes(fragment)) {
									attr.value = attr.value.replace(fragment, '#');
								}
							}
						}
					}

					// Add proper namespaces, if they are not already set
					if (!svg.getAttribute('xmlns')) {
						svg.setAttributeNS(xmlns, 'xmlns', svgns);
					}
					if (!svg.getAttribute('xmlns:xlink')) {
						svg.setAttributeNS(xmlns, 'xmlns:xlink', xlinkns);
					}

					// Serialize the SVG
					const serializer = new XMLSerializer();
					const svgString = serializer.serializeToString(svg);

					// Add XML declaration for better compatibility
					const fullSvg = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;

					// Convert to data URL
					const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fullSvg)}`;
					resolve(dataUrl);
				} catch (error) {
					reject(error);
				}
			});
		};

		if (format === 'SVG') {
			const svgNode = findNearestChildSvg(htmlNode);

			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			svgNode !== null
				? serialize(svgNode)
						.then((dataUrl: string) => downloadFromURL(dataUrl))
						.catch((error: any) => {
							console.error('Error serializing SVG:', error);
						})
				: console.warn('No svgNode found');
		} else if (format === 'PNG') {
			toPng(htmlNode, { ...captureOptions, pixelRatio: scaleFactor })
				.then((dataUrl: string) => downloadFromURL(dataUrl))
				.catch((error: any) => {
					console.error('Error creating PNG:', error);
				});
		} else {
			console.warn("Format must be either 'SVG' or 'PNG'");
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
	{fullWidth}
	{...$$restProps}
>
	<!-- contents of the button -->
	<svelte:fragment slot="beforeLabel"><slot name="beforeLabel" /></svelte:fragment>
	<svelte:fragment slot="afterLabel"><slot name="afterLabel" /></svelte:fragment>
</MultipleActionButton>
