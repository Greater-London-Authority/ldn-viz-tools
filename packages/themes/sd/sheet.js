/*===============================================
  HAND-WRITTEN SHEETS (RFC 0003, workstream 3)
  Shared by sd/content.js and sd/forms.js: parse a hand-written stylesheet,
  check every custom property it reads, and print it laid out like the rest
  of system.css, whatever the source's indentation.
*/

import postcss from 'postcss';

/** Parses `source` and calls check(name) for every var(--name) it reads. */
export const readSheet = (source, check) => {
	const root = postcss.parse(source);
	root.walkDecls((decl) => {
		for (const [, name] of decl.value.matchAll(/var\(--([\w-]+)/g)) check(name);
	});
	root.walkComments((comment) => comment.remove());
	return root;
};

/** Prints a sheet: one selector per line, two-space indent, a blank line between rules. */
export const printSheet = (root) => {
	root.each((node, index) => {
		node.raws.before = index ? '\n\n' : '';
		node.raws.after = '\n';
	});
	root.walkRules((rule) => {
		const depth = rule.parent.type === 'atrule' ? 1 : 0;
		const indent = '  '.repeat(depth);
		if (depth) rule.raws.before = rule.prev() ? `\n\n${indent}` : `\n${indent}`;
		rule.selector = rule.selectors.join(`,\n${indent}`);
		rule.raws.between = ' ';
		rule.raws.after = `\n${indent}`;
		rule.raws.semicolon = true;
		rule.walkDecls((decl) => {
			decl.raws.before = `\n${indent}  `;
			decl.raws.between = ': ';
			decl.value = decl.value.replace(/\s*\n\s*/g, ' ');
		});
	});
	return root.toString().trim();
};
