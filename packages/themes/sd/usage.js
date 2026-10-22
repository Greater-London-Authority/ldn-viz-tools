/*===============================================
  USAGE ALIASES
  The Figma usage export (lcd-ds-usage.tokens.json) holds one typography style
  per alias, each property a reference to a typeset role:

    Usage.product.ui.card-title.$value.fontSize
      = {semantic-typography.product.title.sm.font-size}

  An alias is a class, not a token, so this file is read here rather than
  merged into the token graph. Each alias resolves to the one role all its
  properties reference; an alias whose properties point at different roles is
  an error, because a class can only stand for one role.

  The `Typeset` group of the export restates the roles themselves and is
  ignored.
*/

import { kebab } from './normalise.js';

const REFERENCE = /^\{semantic-typography\.([^.}]+)\.([^.}]+)(?:\.([^.}]+))?\.[^.}]+\}$/;

const isStyle = (node) => node !== null && typeof node === 'object' && '$value' in node;

// { typeset, role, size } from one property reference; size is undefined for eyebrow.
const parseReference = (ref) => {
	const match = REFERENCE.exec(ref);
	if (!match) throw new Error(`Usage alias reference not understood: ${ref}`);
	const [, typeset, role, size] = match;
	return { typeset, role, size };
};

const roleOf = (style, path) => {
	const targets = Object.values(style.$value).map(parseReference);
	const keys = new Set(targets.map(({ typeset, role, size }) => `${typeset}.${role}.${size}`));
	if (keys.size !== 1) {
		throw new Error(`Usage alias ${path.join('.')} references more than one role: ${[...keys]}`);
	}
	return targets[0];
};

const styles = (node, path = []) =>
	isStyle(node)
		? [{ path, style: node }]
		: Object.entries(node).flatMap(([key, child]) => styles(child, [...path, key]));

/**
 * The alias list, in export order:
 *   { selector, typeset, role, size, source }
 * Element aliases style unclassed markup, and their keys are already
 * selectors (h1, p.lead). In longform every style is one. In product they sit
 * in the `formatted` group, because only typeset-product--formatted styles
 * unclassed markup; designers apply them knowing that. Other product styles
 * become classes: .{place}-{part}, or .{part} for an unprefixed place. A
 * product style with no place is an error, so no element ever becomes a class.
 */
export const readUsage = (json, { unprefixedPlaces = [] } = {}) => {
	const usage = json.Usage ?? json.usage;
	if (!usage) throw new Error('Usage export has no Usage group');

	return Object.entries(usage).flatMap(([typeset, tree]) =>
		styles(tree).map(({ path, style }) => {
			const target = roleOf(style, ['Usage', typeset, ...path]);
			if (target.typeset !== kebab(typeset)) {
				throw new Error(
					`Usage alias ${typeset}.${path.join('.')} references the ${target.typeset} typeset`
				);
			}

			const source = ['Usage', typeset, ...path].join('.');
			let selector;
			if (typeset === 'longform') {
				selector = path.join('.');
			} else if (path[0] === 'formatted' && path.length === 2) {
				selector = path[1];
			} else {
				const [place, ...part] = path.map(kebab);
				if (part.length === 0 || place === 'formatted') {
					throw new Error(`Usage alias ${source} needs a place, or belongs in formatted`);
				}
				selector = `.${unprefixedPlaces.includes(place) ? part.join('-') : [place, ...part].join('-')}`;
			}
			return { selector, ...target, source };
		})
	);
};
