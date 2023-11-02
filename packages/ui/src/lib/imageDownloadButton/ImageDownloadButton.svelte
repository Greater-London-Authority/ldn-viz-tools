<script lang="ts">
	import html2canvas from 'html2canvas';
	import Button from '../button/Button.svelte';

	export let svgNode: SVGElement | undefined;

	export let htmlNode: HTMLElement | undefined;
	export let idToPad = '';
	export let padding = '30px';

	export let scaleFactor = 2;
	export let filename: string | undefined = undefined;
	export let disabled = false;
	export let format: 'PNG' | 'SVG' | undefined = 'PNG';

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
		let img: HTMLImageElement;

		await new Promise((resolve) => {
			img = new Image();
			img.onload = resolve;
			img.src = url;
		});

		return img;
	};

	const downloadFromSVG = async () => {
		// This hack is necessary because .drawImage() doesn't work
		// unless the SVG that is being copied has an explicitly-set size
		const svgNodeClone = svgNode.cloneNode(true) as SVGElement;
		svgNodeClone.setAttribute('width', svgNode.clientWidth.toString());
		svgNodeClone.setAttribute('height', svgNode.clientHeight.toString());

		const svgString = new XMLSerializer().serializeToString(svgNodeClone);
		const svgURL = 'data:image/svg+xml;base64,' + window.btoa(svgString);
		// the non base-64 encoded URL would be: "data:image/svg+xml;utf8," + svgString;

		// an alternative is:
		// const svgURL = URL.createObjectURL(new Blob([svgNodeClone.outerHTML],{type:'image/svg+xml;charset=utf-8'}))

		const img = await createHTMLImageFromURL(svgURL);

		if (format === 'SVG') {
			downloadFromURL(svgURL);
		} else {
			img.src = svgURL;

			const w = svgNode.clientWidth * scaleFactor;
			const h = svgNode.clientHeight * scaleFactor;

			const canvas = new OffscreenCanvas(w, h);

			canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);

			canvas.convertToBlob().then((blob) => {
				downloadFromURL(URL.createObjectURL(blob));
			});
		}
	};

	///

	const preserveDrawingBuffer = () => {
		function wrapGetContext(ContextClass: any) {
			const isWebGL = /webgl/i;

			ContextClass.prototype.getContext = (function (origFn) {
				return function (type: string, attributes: CanvasRenderingContext2DSettings) {
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
</script>

<Button on:click={download} {disabled} {...$$restProps}>
	<slot />
</Button>
