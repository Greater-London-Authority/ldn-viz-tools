const plugin = require('tailwindcss/plugin');

const contexts = require('./contexts');
const roles = require('./roles');
const semantics = require('./semantics');
const responsive = require('./responsive');

module.exports = plugin(function ({ addComponents }) {
	// Add contexts (variables only)
	addComponents({
		'.prose': contexts.prose,
		'.product': contexts.product,
		// chart values don't scale per-breakpoint (md-pinned), but chart IS in the
		// context loop below so that it seals against an outer context.
		'.chart': contexts.chart
	});

	// Add semantics
	addComponents(semantics);

	// Add roles
	const rolesKeys = Object.keys(roles);
	addComponents(Object.fromEntries(rolesKeys.map((role) => [`.${role}`, roles[role]])));

	function buildContextResponsiveVars(responsiveByRole) {
		const result = {
			default: {},
			sm: {},
			md: {},
			lg: {},
			xl: {}
		};

		Object.values(responsiveByRole).forEach((role) => {
			if (role.default) Object.assign(result.default, role.default);
			if (role.sm) Object.assign(result.sm, role.sm);
			if (role.md) Object.assign(result.md, role.md);
			if (role.lg) Object.assign(result.lg, role.lg);
			if (role.xl) Object.assign(result.xl, role.xl);
		});

		return result;
	}

	// Responsive by default — no `.responsive` modifier needed. Fixed roles
	// (identical values at every breakpoint, e.g. Body/Label/Caption) just restate
	// the same value in each media query; only the roles that scale move.
	//
	// Every context publishes its full role set at every breakpoint, on itself.
	// Never on the role element: a declaration on the element beats an inherited
	// one outright, so an element-level rule from an outer context overrides a
	// nested context's own values. Setting the vars on the context and letting
	// them inherit makes the innermost declared context win at any depth, with
	// no specificity or source-order contest.
	//
	// --prose-max-width rides along on the same @screen steps (base value also in
	// contexts.cjs); it is prose-only, hence the `extra` hook.
	//
	// `responsive.cjs` has no `chart` key — chart values are mode-invariant, so the
	// `|| {}` guard leaves chart with the md-pinned block from contexts.cjs. Chart is
	// still in the loop so that it SEALS: nothing targets the role element any more,
	// so a chart nested in prose/product now wins for the roles it defines. Roles it
	// does not define (e.g. `body`) still fall through to the enclosing context —
	// intended.
	['prose', 'product', 'chart'].forEach((context) => {
		const r = buildContextResponsiveVars(responsive[context] || {});
		const extra = (mode) =>
			context === 'prose'
				? { '--prose-max-width': `var(--typography-${mode}-prose-readable-width)` }
				: {};

		// Chart contributes nothing here (no `chart` key in responsive.cjs), so drop
		// empty blocks rather than emitting a bare `.chart {}` into the sheet.
		const block = (mode, vars) => {
			const decls = { ...vars, ...extra(mode) };
			return Object.keys(decls).length ? { [`.${context}`]: decls } : {};
		};

		addComponents({
			...block('base', r.default),
			'@screen sm': block('sm', r.sm),
			'@screen md': block('md', r.md),
			'@screen lg': block('lg', r.lg),
			'@screen xl': block('xl', r.xl)
		});
	});
});
