<script lang="ts">
	/**
	 * The `<ImageDownloadButton>` component renders a button which, when clicked on, downloads an image file showing either an `HTML` or `SVG` element and its children.
	 * @component
	 */

	import html2canvas from 'html2canvas';
	import type { Option } from '../multipleActionButton/MultipleActionButton.svelte';
	import MultipleActionButton from '../multipleActionButton/MultipleActionButton.svelte';

	/**
	 * A `SVGElement` node to be converted.
	 */
	export let svgNode: SVGElement | undefined = undefined;

	/**
	 * An `HTMLElement` node to be converted.
	 */
	export let htmlNode: HTMLElement | undefined = undefined;

	/**
	 * `id` of element to add padding to
	 */
	export let idToPad = '';

	/**
	 * Amount of padding to add, as a string including units.
	 */
	export let padding = '30px';

	/**
	 * If converting an SVG to PNG, the resolution of the PNG will be `scaleFactor` times the size at which the SVG was displayed at.
	 */
	export let scaleFactor = 2;

	/**
	 * The name the downloaded file will be saved with.
	 */
	export let filename = '';

	/**
	 * If `true`, the user will not be able to interact with the button to download data.
	 */
	export let disabled = false;

	/**
	 * The available file formats for the downloaded image.
	 */
	export let formats: ('PNG' | 'SVG')[] = ['PNG', 'SVG'];
	let format = 'PNG';

	const downloadFromURL = (url: string) => {
		if (!filename) {
			filename = format === 'SVG' ? 'Image.svg' : 'Image.png';
		}

		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('target', '_blank');
		link.setAttribute('download', filename);
		link.dispatchEvent(new MouseEvent('click'));
		link.remove();
	};

	const createHTMLImageFromURL = async (url: string) => {
		let img: HTMLImageElement | undefined;

		await new Promise((resolve) => {
			img = new Image();
			img.onload = resolve;
			img.src = url;
		});

		// Ensure img is defined before returning
		if (!img) {
			throw new Error('Failed to load image');
		}

		return img;
	};

	// See https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
	const bytesToBase64 = (bytes: Uint8Array) => window.btoa(String.fromCodePoint(...bytes));
	const stringToBase64 = (str: string | undefined) => bytesToBase64(new TextEncoder().encode(str));

	const downloadFromSVG = async () => {
		// This hack is necessary because .drawImage() doesn't work
		// unless the SVG that is being copied has an explicitly-set size
		const svgNodeClone = svgNode!.cloneNode(true) as SVGElement;
		svgNodeClone.setAttribute('width', svgNode!.clientWidth.toString());
		svgNodeClone.setAttribute('height', svgNode!.clientHeight.toString());

		const svgString = new XMLSerializer().serializeToString(svgNodeClone);
		const svgURL = 'data:image/svg+xml;base64,' + stringToBase64(svgString);
		// the non base-64 encoded URL would be: "data:image/svg+xml;utf8," + svgString;

		// an alternative is:
		// const svgURL = URL.createObjectURL(new Blob([svgNodeClone.outerHTML],{type:'image/svg+xml;charset=utf-8'}))

		const img = await createHTMLImageFromURL(svgURL);

		if (format === 'SVG') {
			downloadFromURL(svgURL);
		} else {
			img.src = svgURL;

			const w = svgNode!.clientWidth * scaleFactor;
			const h = svgNode!.clientHeight * scaleFactor;

			const canvas = new OffscreenCanvas(w, h);

			canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);

			canvas.convertToBlob().then((blob) => {
				downloadFromURL(URL.createObjectURL(blob));
			});
		}
	};

	///

	const preserveDrawingBuffer = () => {
		function wrapGetContext(ContextClass: typeof HTMLCanvasElement | typeof OffscreenCanvas) {
			const isWebGL = /webgl/i;

			ContextClass.prototype.getContext = (function (origFn: (type: any, attributes?: any) => any) {
				return function (this: HTMLCanvasElement | OffscreenCanvas, type: any, attributes: any) {
					if (isWebGL.test(type)) {
						attributes = Object.assign({}, attributes || {}, { preserveDrawingBuffer: true });
					}
					return origFn.call(this, type, attributes);
				};
			})(ContextClass.prototype.getContext);
		}

		if (typeof HTMLCanvasElement !== 'undefined') {
			wrapGetContext(HTMLCanvasElement);
		}
		if (typeof OffscreenCanvas !== 'undefined') {
			wrapGetContext(OffscreenCanvas);
		}
	};

	const downloadFromHTML = async (el: HTMLElement) => {
		preserveDrawingBuffer();

		const canvas = await html2canvas(el, {
			onclone: (clone: Document) => {
				if (idToPad) {
					clone.getElementById(idToPad)!.style.padding = padding;
				}
			},
			windowWidth: 1500
		});
		const image = canvas.toDataURL('image/png', 1.0);
		downloadFromURL(image);
	};

	const download = async () => {
		if (svgNode) {
			downloadFromSVG();
		} else if (htmlNode) {
			downloadFromHTML(htmlNode);
		} else {
			console.log('CMust supply either an svgNode or htmlNode to be converted to image');
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
	<slot />
</MultipleActionButton>
