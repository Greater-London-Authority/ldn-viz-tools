// this is based on https://observablehq.com/@fil/plot-figure-to-svg
// modified to not use d3 for DOM manipulation

import { sum } from 'd3-array';

export function toSVG(chart) {
	if (chart.nodeName !== 'FIGURE') {
		return chart;
	}

	const [x0, y0, width, height] = getBounds([chart]);

	const nodes = [];

	const selectedChildren = selectChildren(chart, 'h1,h2,h3,div,figcaption,svg');

	for (const node of selectedChildren) {
		switch (node.nodeName.toLowerCase()) {
			case 'div':
				{
					const children = selectChildren(node, 'div,span');
					const divHeight = getBounds([node, ...children])[3] + 2;
					const svg = createSVGElement('svg');
					svg.setAttribute('width', width);
					svg.setAttribute('height', divHeight);
					chart.appendChild(svg);
					nodes.push(svg);

					const swatchData = Array.from(children, (d) => {
						const svgEl = d.querySelector('svg');
						const bbox = svgEl.getBBox();
						return {
							style: window.getComputedStyle(d),
							svg: svgEl,
							width: bbox.width,
							height: bbox.height,
							text: d.textContent,
							bounds: getBounds([d])
						};
					});

					for (const d of swatchData) {
						const g = createSVGElement('g');
						g.setAttribute('transform', `translate(${d.bounds[0] - x0},${10 + d.bounds[1] - y0})`);

						const swatchSvg = d.svg;
						swatchSvg.setAttribute('width', d.width);
						swatchSvg.setAttribute('height', d.height);
						swatchSvg.setAttribute('y', `${-parseFloat(d.height) / 2}px`);
						g.appendChild(swatchSvg);

						const text = createSVGElement('text');
						text.textContent = d.text;
						text.setAttribute('x', d.width);
						text.setAttribute('dx', 5);
						text.setAttribute('dy', '0.38em');
						text.setAttribute('font-family', d.style.fontFamily);
						text.setAttribute('font-size', d.style.fontSize);
						text.setAttribute('fill', d.style.color);
						g.appendChild(text);

						svg.appendChild(g);
					}
				}
				break;

			case 'figcaption':
			case 'h1':
			case 'h2':
			case 'h3':
				{
					const svg = createSVGElement('svg');
					svg.setAttribute('width', width);
					svg.setAttribute('overflow', 'visible');
					chart.appendChild(svg);
					nodes.push(svg);

					const nodeChildren = Array.from(node.children);
					const targets =
						nodeChildren.length > 0
							? nodeChildren.flatMap((c) =>
									Array.from(c.children).length > 0 ? Array.from(c.children) : [c]
								)
							: [node];

					let h = 0;
					for (const d of targets) {
						const style = window.getComputedStyle(d);
						const g = createSVGElement('g');
						g.setAttribute('transform', `translate(0,${h})`);

						const plotted = Plot.text([d.textContent], {
							text: (d) => d,
							lineWidth: (1.06 * parseFloat(style.width)) / parseFloat(style.fontSize),
							lineHeight: 1.2,
							frameAnchor: 'top-left'
						}).plot();

						const textEl = plotted.querySelector('text');
						textEl.setAttribute('font-family', style.fontFamily);
						textEl.setAttribute('font-size', 1.08 * parseFloat(style.fontSize));
						textEl.setAttribute('font-weight', style.fontWeight);
						textEl.setAttribute('fill', style.color);

						g.appendChild(textEl);
						svg.appendChild(g);
						h += getBounds([g])[3] + 4;
					}
					svg.setAttribute('height', h);
				}
				break;

			case 'svg':
				chart.appendChild(node);
				nodes.push(node);
				break;
		}
	}

	return serializeAll(nodes).then((blob) => {
		document.body.removeChild(chart);
		return blob.text();
	});
}

// Helpers

function createSVGElement(tag) {
	return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function selectChildren(parent, selector) {
	return Array.from(parent.querySelectorAll(`:scope > ${selector.split(',').join(', :scope > ')}`));
}

//

function lines(text, targetWidth) {
	const CHAR_W = {
		a: 7,
		B: 8,
		C: 8,
		c: 6,
		D: 9,
		f: 4,
		G: 9,
		H: 9,
		I: 3,
		i: 3,
		J: 5,
		j: 3,
		K: 8,
		k: 6,
		l: 3,
		M: 11,
		m: 11,
		N: 9,
		O: 9,
		P: 8,
		Q: 9,
		R: 8,
		r: 4,
		S: 8,
		s: 6,
		t: 4,
		U: 9,
		v: 6,
		W: 11,
		w: 9,
		x: 6,
		y: 6,
		z: 5,
		'.': 2,
		',': 2,
		':': 2,
		';': 2
	};
	function measureWidth(text) {
		return sum(text, (char) => CHAR_W[char] || CHAR_W['a']) * 0.8;
	}

	const words = text.split(' ');
	let line;
	let lineWidth0 = Infinity;
	const lines = [];
	for (let i = 0, n = words.length; i < n; ++i) {
		let lineText1 = (line ? line.text + ' ' : '') + words[i];
		let lineWidth1 = measureWidth(lineText1);
		if ((lineWidth0 + lineWidth1) / 2 < targetWidth) {
			line.width = lineWidth0 = lineWidth1;
			line.text = lineText1;
		} else {
			lineWidth0 = measureWidth(words[i]);
			line = { width: lineWidth0, text: words[i] };
			lines.push(line);
		}
	}
	return lines;
}

//

function getBounds(elements) {
	let x1 = Infinity;
	let y1 = x1;
	let x2 = -x1;
	let y2 = x2;
	for (const element of elements) {
		const { x, y, width, height } = element.getBoundingClientRect();
		if (x < x1) x1 = x;
		if (x + width > x2) x2 = x + width;
		if (y < y1) y1 = y;
		if (y + height > y2) y2 = y + height;
	}
	return [x1, y1, x2 - x1, y2 - y1];
}

//

// Given an array of SVG elements, composites them into a single SVG element,
// and then serializes the result to a blob.
async function serializeAll(elements, { padding = 10 } = {}) {
	const svgns = 'http://www.w3.org/2000/svg';
	const xmlns = 'http://www.w3.org/2000/xmlns/';
	const xlinkns = 'http://www.w3.org/1999/xlink';

	const fragment = location.href + '#';
	let root;
	if (elements.length === 1) {
		root = elements[0].cloneNode(true); // optimize common case
	} else {
		const [ox, oy, dx, dy] = getBounds(elements);
		root = document.createElementNS(svgns, 'svg');
		root.setAttribute('width', dx + 2 * padding);
		root.setAttribute('height', dy + 2 * padding);
		root.setAttribute('viewBox', [-padding, -padding, dx + 2 * padding, dy + 2 * padding]);
		for (const element of elements) {
			const svg = root.appendChild(element.cloneNode(true));
			const { x, y, width, height } = element.getBoundingClientRect();
			svg.setAttribute('x', x - ox);
			svg.setAttribute('y', y - oy);
			svg.setAttribute('width', width);
			svg.setAttribute('height', height);
		}
	}
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
	while (walker.nextNode()) {
		const node = walker.currentNode;
		for (const attr of node.attributes) {
			if (attr.value.includes(fragment)) {
				attr.value = attr.value.replace(fragment, '#');
			}
		}
	}

	root.setAttributeNS(xmlns, 'xmlns', svgns);
	root.setAttributeNS(xmlns, 'xmlns:xlink', xlinkns);
	const serializer = new XMLSerializer();
	const string = serializer.serializeToString(root);
	return new Blob([string], { type: 'image/svg+xml' });
}
