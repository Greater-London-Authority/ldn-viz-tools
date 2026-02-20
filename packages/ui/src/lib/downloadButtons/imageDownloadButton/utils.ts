/**
 * Utility functions for image downloading functionality.
 * These are shared between ImageDownloadButton and DownloadButton components.
 */

import { toPng } from 'html-to-image';

/**
 * Finds the largest child SVG element within an HTML element.
 * If the input is already an SVG element, returns it directly.
 *
 * @param htmlNode - The HTML or SVG element to search within
 * @returns The largest SVG element found, or null if none found
 */
export const findNearestChildSvg = (htmlNode: HTMLElement | SVGElement): SVGElement | null => {
	if (htmlNode instanceof SVGElement) {
		return htmlNode;
	}

	if (!(htmlNode instanceof HTMLElement)) {
		throw new Error('htmlNode must be an HTMLElement or SVGElement');
	}

	const svgElements = htmlNode.querySelectorAll('svg');

	let largestSVG: SVGElement | null = null;
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

/**
 * Filter function for html-to-image that excludes elements with data-capture-ignore attribute.
 *
 * @param node - The HTML element to check
 * @returns true if the element should be included, false otherwise
 */
export const filter = (node: HTMLElement): boolean => {
	if (node instanceof HTMLElement) {
		const ignoreAttributes = ['data-capture-ignore'];
		return !ignoreAttributes.some((attribute) => node.hasAttribute(attribute));
	}
	return true;
};

/**
 * Sum an array of numbers.
 *
 * @param vals - Array of numbers to sum
 * @returns The sum of all values
 */
export const sum = (vals: number[]): number => vals.reduce((total, current) => total + +current, 0);

/**
 * Gets the height of an HTML element, accounting for CSS display: contents.
 *
 * @param div - The HTML element to measure
 * @returns The height in pixels
 */
export const getHeight = (div: HTMLElement): number => {
	// N.B. we need to check computed style, rather than .style on element, as display is likely to be set by a Tailwind class
	const display = window.getComputedStyle(div).display;

	if (display !== 'contents') {
		return div.clientHeight;
	}

	const children: Element[] = Array.from(div.children);

	const heights = children.map((c: Element) => +c.clientHeight);
	const marginTop = children.map(
		(c: Element) => +window.getComputedStyle(c).marginTop.replace('px', '')
	);
	const marginBottom = children.map(
		(c: Element) => +window.getComputedStyle(c).marginBottom.replace('px', '')
	);

	return sum([...heights, ...marginTop, ...marginBottom]);
};

/**
 * Gets the width of an HTML element, accounting for CSS display: contents.
 *
 * @param div - The HTML element to measure
 * @returns The width in pixels
 */
export const getWidth = (div: HTMLElement): number => {
	// N.B. we need to check computed style, rather than .style on element, as display is likely to be set by a Tailwind class
	const display = window.getComputedStyle(div).display;

	if (display !== 'contents') {
		return div.clientWidth;
	}

	return Array.from(div.children)[0]?.clientWidth || 0;
};

/**
 * Serializes an SVG element to a data URL.
 * Adapted from https://observablehq.com/@mbostock/saving-svg
 *
 * @param svgNode - The SVG element to serialize
 * @returns A promise that resolves to a data URL string
 */
export const serializeSvg = (svgNode: SVGElement): Promise<string> => {
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

/**
 * Triggers a download from a data URL.
 *
 * @param url - The data URL to download
 * @param filename - The name to give the downloaded file
 */
export const downloadFromDataUrl = (url: string, filename: string): void => {
	const link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('target', '_blank');
	link.setAttribute('download', filename);
	link.dispatchEvent(new MouseEvent('click'));
	link.remove();
};

const downloadFromURL = (url: string, filename: string, format: 'PNG' | 'SVG') => {
	const initialName = filename || 'image';

	let baseName = initialName;
	if (initialName.toLowerCase().endsWith('.png') || initialName.toLowerCase().endsWith('.svg')) {
		baseName = initialName.slice(0, -4);
	}
	const fname = format === 'SVG' ? `${baseName}.svg` : `${baseName}.png`;

	downloadFromDataUrl(url, fname);
};

export const downloadImage = async (
	htmlNode: HTMLElement | SVGElement,
	padding: number,
	format: 'PNG' | 'SVG',
	filename: string,
	scaleFactor: number
) => {
	const captureOptions = {
		style: {
			padding: padding + 'px'
		},

		// N.B. if we don't specify the width/height, then html-to-image will use the size of the HTML element before
		// adjusting the style to add the padding. This would result in the content being truncated.
		width: 2 * padding + getWidth(htmlNode as HTMLElement),
		height: 2 * padding + getHeight(htmlNode as HTMLElement),

		filter
	};

	if (format === 'SVG') {
		const svgNode = findNearestChildSvg(htmlNode);

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		svgNode !== null
			? serializeSvg(svgNode)
					.then((dataUrl: string) => downloadFromURL(dataUrl, filename, format))
					.catch((error: any) => {
						console.error('Error serializing SVG:', error);
					})
			: console.warn('No svgNode found');
	} else if (format === 'PNG') {
		toPng(htmlNode as HTMLElement, { ...captureOptions, pixelRatio: scaleFactor })
			.then((dataUrl: string) => downloadFromURL(dataUrl, filename, format))
			.catch((error: any) => {
				console.error('Error creating PNG:', error);
			});
	} else {
		console.warn("Format must be either 'SVG' or 'PNG'");
	}
};
