/*===============================================
  FORM STYLES (RFC 0003, workstreams 3 and 4; ADR 0015)
  Writes the hand-written sd/forms.css into system.css: checks every var()
  and replaces each chevron(<mode>, --<token>) with an SVG data URI in that
  token's resolved colour for the mode, since a data URI can't read a custom
  property.
*/

import svgToDataUri from 'mini-svg-data-uri';
import { printSheet, readSheet } from './sheet.js';

const CHEVRON = /chevron\(\s*(light|dark)\s*,\s*--([\w-]+)\s*\)/g;

const chevronSvg = (colour) =>
	`url("${svgToDataUri(
		`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${colour}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
	)}")`;

/**
 *  - source: the text of sd/forms.css
 *  - check(name): throws if a custom property may not be read
 *  - resolve(mode, name): the resolved value of a colour token in a mode
 */
export const formatForms = (source, check, resolve) => {
	const root = readSheet(source, check);
	root.walkDecls((decl) => {
		decl.value = decl.value.replace(CHEVRON, (_, mode, name) => chevronSvg(resolve(mode, name)));
	});
	return printSheet(root);
};
