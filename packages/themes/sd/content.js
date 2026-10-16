/*===============================================
  CONTENT STYLES (RFC 0003, workstream 3; ADR 0015)
  Scopes the hand-written element styles in sd/content.css to each typeset
  that takes content styles. The stylesheet holds the design; this file holds
  the scoping, so nobody writes the boundary selectors by hand.

  A selector `S` becomes, for each scope:

    .typeset-x :where(S):not(:where(<boundary>))

  which weighs the same as the typeset class, so any class on the element
  wins. A trailing pseudo-element (li::marker) can't sit inside :where(); it
  follows the :not().
*/

import postcss from 'postcss';

const PSEUDO_ELEMENT = /(::[\w-]+(?:\([^)]*\))?)$/;

/**
 * The elements a typeset's element styles must not reach: an escape, and
 * anything inside a different typeset nested in this one. A selector can't
 * tell which ancestor typeset is nearest, so the rule stops at the nested one
 * and the nested typeset's own rules take over. The same typeset nested in
 * itself would apply the same styles, so it is not a boundary. (CSS @scope
 * with a lower boundary does this natively; it can replace this function once
 * support allows.)
 */
export const boundary = (scope, otherScopes, escape) => {
	const others = otherScopes.filter((other) => other !== scope);
	const nested = others.length === 1 ? others[0] : `:is(${others.join(', ')})`;
	return [
		`.${escape}`,
		`.${escape} *`,
		...(others.length ? [`${scope} ${nested}`, `${scope} ${nested} *`] : [])
	].join(', ');
};

/** `.typeset-x :where(S):not(:where(<boundary>))`, with any pseudo-element moved after. */
export const scopeSelector = (selector, scope, bounds) => {
	const match = selector.match(PSEUDO_ELEMENT);
	const subject = match ? selector.slice(0, -match[1].length) : selector;
	return `${scope} :where(${subject.trim()}):not(:where(${bounds}))${match ? match[1] : ''}`;
};

/**
 * Builds the scoped sheet.
 *  - source: the text of sd/content.css
 *  - scopes: [{ selector, bounds }], one per typeset that takes content styles
 *  - check(name): throws if a custom property may not be read
 */
export const formatContent = (source, scopes, check) => {
	const root = postcss.parse(source);

	root.walkDecls((decl) => {
		for (const [, name] of decl.value.matchAll(/var\(--([\w-]+)/g)) check(name);
	});

	root.walkRules((rule) => {
		const indent = rule.parent.type === 'atrule' ? '  ' : '';
		rule.selector = rule.selectors
			.flatMap((selector) =>
				scopes.map(({ selector: scope, bounds }) => scopeSelector(selector, scope, bounds))
			)
			.join(`,\n${indent}`);
	});

	// Output is laid out the same as the rest of system.css, whatever the
	// source's indentation.
	root.walkComments((comment) => comment.remove());
	root.each((node, index) => {
		node.raws.before = index ? '\n\n' : '';
		node.raws.after = '\n';
	});
	root.walkRules((rule) => {
		const depth = rule.parent.type === 'atrule' ? 1 : 0;
		if (depth) rule.raws.before = rule.prev() ? '\n\n  ' : '\n  ';
		rule.raws.after = `\n${'  '.repeat(depth)}`;
		rule.raws.between = ' ';
		rule.walkDecls((decl) => {
			decl.raws.before = `\n${'  '.repeat(depth + 1)}`;
		});
		rule.raws.semicolon = true;
	});
	return root.toString().trim();
};
