/*===============================================
  NORMALISE THE FIGMA EXPORT
  The Figma export (lcd-ds.tokens.json) is reshaped once, here, before Style
  Dictionary filters or formats see it. Everything downstream can then rely on
  the token grammar in the specification.

  1. Group keys are kebab-cased. A leading minus is kept, so the negative type
     steps (scale.-1) stay distinct from the positive ones (scale.1).
  2. Collection names lose their `semantic-` prefix and nothing else, so the
     tree mirrors the export (semantic-grid.base -> grid.base). Mapping
     onto the specification's names happens in tokenName, below.
  3. References into `primitive` carry the mode of the collection they were
     exported from ({primitive.xl.typography.scale.14}). The primitive tree has
     no mode level, so that segment is dropped. Any mode name is handled, so a
     new mode doesn't break the build.
  4. Multi-layer shadows (a group of `0`, `1` ... layer tokens) become one
     `shadow` token whose value is the list of layers, in the shape Style
     Dictionary's shadow/css/shorthand transform expects.
  5. The measure variables (typography.{breakpoint}.{typeset}.measure) are
     dropped. They exist so designers can bind a text width in Figma, but a
     Figma variable can't follow the body size, so system.css works out
     --measure-* itself (ADR 0015). normalise.test.js checks they still match.
  6. The focus effect style is dropped. Figma needs it to draw focused
     variants, but components draw focus with their own classes and there are
     no focus tokens (ADR 0019). Figma also exports it as light-mode hex only.
*/

export const isToken = (node) =>
	node !== null && typeof node === 'object' && 'value' in node && 'type' in node;

const isGroup = (node) => node !== null && typeof node === 'object' && !isToken(node);

export const kebab = (key) =>
	String(key)
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/[\s_.․]+/g, '-')
		.toLowerCase();

const normaliseCollection = (key) => kebab(key).replace(/^semantic-/, '');

const normalisePath = ([collection, ...rest]) => [
	normaliseCollection(collection),
	...rest.map(kebab)
];

const normaliseReference = (ref, primitiveKeys) => {
	const path = normalisePath(ref.split('.'));

	// Drop the export mode from primitive references, unless the export ever
	// starts nesting primitives under real keys of the same name.
	if (path[0] === 'primitive' && path.length > 2 && !primitiveKeys.has(path[1])) {
		path.splice(1, 1);
	}
	return path.join('.');
};

const normaliseValue = (value, primitiveKeys) => {
	if (typeof value === 'string') {
		return value.replace(/\{([^}]+)\}/g, (_, ref) => `{${normaliseReference(ref, primitiveKeys)}}`);
	}
	if (Array.isArray(value)) {
		return value.map((item) => normaliseValue(item, primitiveKeys));
	}
	if (value !== null && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [key, normaliseValue(item, primitiveKeys)])
		);
	}
	return value;
};

// Figma's custom-shadow layer -> a DTCG shadow layer with px dimensions.
const toShadowLayer = ({ shadowType, radius, color, offsetX, offsetY, spread }) => ({
	offsetX: `${offsetX}px`,
	offsetY: `${offsetY}px`,
	blur: `${radius}px`,
	spread: `${spread}px`,
	color,
	inset: shadowType === 'innerShadow'
});

const isLayerGroup = (node) => {
	const entries = Object.entries(node).filter(([, child]) => isGroup(child) || isToken(child));
	return (
		entries.length > 0 &&
		entries.every(([key, child]) => /^\d+$/.test(key) && child.type === 'custom-shadow')
	);
};

const shadowToken = (layers, description) => ({
	type: 'shadow',
	value: layers.length === 1 ? layers[0] : layers,
	...(description ? { description } : {})
});

const normaliseTree = (node, primitiveKeys) => {
	if (isToken(node)) {
		if (node.type === 'custom-shadow') {
			return shadowToken([toShadowLayer(node.value)], node.description);
		}
		return { ...node, value: normaliseValue(node.value, primitiveKeys) };
	}

	if (isLayerGroup(node)) {
		const layers = Object.keys(node)
			.filter((key) => /^\d+$/.test(key))
			.sort((a, b) => Number(a) - Number(b))
			.map((key) => toShadowLayer(node[key].value));
		return shadowToken(layers, node.description);
	}

	const result = {};
	for (const [key, child] of Object.entries(node)) {
		if (!isGroup(child) && !isToken(child)) continue; // group metadata, e.g. description: null
		result[kebab(key)] = normaliseTree(child, primitiveKeys);
	}
	return result;
};

const dropFigmaOnly = (tree) => {
	for (const breakpoint of Object.values(tree.typography ?? {})) {
		for (const typeset of Object.values(breakpoint)) delete typeset.measure;
	}
	delete tree.focus;
	return tree;
};

export const normaliseTokens = (json) => {
	const primitiveKeys = new Set(Object.keys(json.primitive ?? {}).map(kebab));

	return dropFigmaOnly(
		Object.fromEntries(
			Object.entries(json).map(([collection, tree]) => [
				normaliseCollection(collection),
				normaliseTree(tree, primitiveKeys)
			])
		)
	);
};

const referencesIn = (value) => {
	if (typeof value === 'string') {
		return [...value.matchAll(/\{([^}]+)\}/g)].map(([, ref]) => ref);
	}
	if (value !== null && typeof value === 'object') {
		return Object.values(value).flatMap(referencesIn);
	}
	return [];
};

/**
 * Names follow the specification's grammar. The normaliser has already
 * kebab-cased every key, so the name is the path joined with hyphens, which
 * keeps negative steps distinct (scale.-1 -> scale--1, scale.1 -> scale-1).
 *  - color.{light-mode,dark-mode}.* -> color-*  (the mode is carried by the selector)
 *  - primitive shadows              -> shadow-* (shadows have no primitive tier)
 *  - a trailing `default` is dropped from semantic tokens (--flow-standard), but kept on primitives (--primitive-typography-font-family-default)
 */
export const tokenName = (token) => {
	let path = token.path;

	if (path[0] === 'color') path = ['color', ...path.slice(2)];
	if (token.type === 'shadow' && path[0] === 'primitive') path = path.slice(1);
	if (path[0] !== 'primitive' && path.length > 1 && path.at(-1) === 'default') {
		path = path.slice(0, -1);
	}

	return path.join('-');
};

// Every {reference} in the normalised tree, with the path of the token using it.
export const collectReferences = (tree, path = []) => {
	if (isToken(tree)) {
		return referencesIn(tree.value).map((ref) => ({ from: path.join('.'), ref }));
	}
	return Object.entries(tree).flatMap(([key, child]) => collectReferences(child, [...path, key]));
};

export const resolvePath = (tree, dotted) =>
	dotted.split('.').reduce((node, key) => (node && isGroup(node) ? node[key] : undefined), tree);
