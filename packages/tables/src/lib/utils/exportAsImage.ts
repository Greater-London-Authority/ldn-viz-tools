//@ts-nocheck
import html2canvas from 'html2canvas';

(() => {
	if (typeof HTMLCanvasElement !== 'undefined') {
		wrapGetContext(HTMLCanvasElement);
	}
	if (typeof OffscreenCanvas !== 'undefined') {
		wrapGetContext(OffscreenCanvas);
	}

	function wrapGetContext(ContextClass) {
		const isWebGL = /webgl/i;

		ContextClass.prototype.getContext = (function (origFn) {
			return function (type, attributes) {
				if (isWebGL.test(type)) {
					attributes = Object.assign({}, attributes || {}, { preserveDrawingBuffer: true });
				}
				return origFn.call(this, type, attributes);
			};
		})(ContextClass.prototype.getContext);
	}
})();

const exportAsImage = async (el, imageFileName) => {
	const canvas = await html2canvas(el, {
		onclone: (clone) => {
			clone.getElementById('captureElement').style.padding = '30px';
		},
		windowWidth: 1500
	});
	const image = canvas.toDataURL('image/png', 1.0);
	downloadImage(image, imageFileName);
};

const downloadImage = (blob, fileName) => {
	const fakeLink = window.document.createElement('a');
	fakeLink.style = 'display:none;';
	fakeLink.download = fileName;

	fakeLink.href = blob;

	document.body.appendChild(fakeLink);
	fakeLink.click();
	document.body.removeChild(fakeLink);

	fakeLink.remove();
};

export default exportAsImage;
