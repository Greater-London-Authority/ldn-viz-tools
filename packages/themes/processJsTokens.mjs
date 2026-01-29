import fs from 'fs';
import tokens from './styles/js/input.js';

const makeHierachial = (node) => {
	if (typeof node === 'string') {
		return node;
	}

	const result = {};

	for (const k of Object.keys(node)) {
		const val = makeHierachial(node[k]);

		if (k.includes('-')) {
			// Token name *does* contain a hyphen, so it needs to be stored as an indirect descendent of node
			const parts = k.split('-');
			let pos = result;

			// Navigate downwards through descendents to correct place in hierachy, creating new child objects as needed
			for (const part of parts.slice(0, -1)) {
				if (!pos[part]) {
					// case 1: create new object to store child tokens in
					pos[part] = {};
					pos = pos[part];
				} else if (typeof pos[part] !== 'object') {
					// case 2: string already recorded, so move this and create an object
					const defaultVal = pos[part];
					pos[part] = {};
					pos[part].default = defaultVal;
					pos = pos[part];
				} else {
					// case 3: already have an object to store child tokens in, so nothing to create
					pos = pos[part];
				}
			}

			// Set the final value
			const lastPart = parts[parts.length - 1];
			if (typeof pos[lastPart] === 'object') {
				pos[lastPart].default = val;
			} else {
				pos[lastPart] = val;
			}
		} else {
			// Token name *does not* contain a hyphen, so it needs to be stored as a direct descendent of node

			if (typeof result[k] === 'object') {
				result[k].default = val;
			} else {
				result[k] = val;
			}
		}
	}

	return result;
};

const h = makeHierachial(tokens);

const output = `export default ${JSON.stringify(h, null, 2)};\n`;
fs.writeFileSync('./styles/js/color-tokens.js', output, 'utf8');
