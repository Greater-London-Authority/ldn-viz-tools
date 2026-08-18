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
		// chart values don't scale per-breakpoint, so unlike prose/product it's
		// not added to the responsive role loop below.
		'.chart': contexts.chart
	});

	// Add semantics
	addComponents(semantics);

	// Add roles
	const rolesKeys = Object.keys(roles);
	addComponents(Object.fromEntries(rolesKeys.map((role) => [`.${role}`, roles[role]])));

	// Responsive by default - no `.responsive` modifier needed. Fixed roles
	// (identical values at every breakpoint, e.g. Body/Label/Caption) just get
	// no-op media queries here; only the roles that actually scale move.
	['prose', 'product'].forEach((context) => {
		rolesKeys.forEach((role) => {
			const mapping = responsive[context][role];
			if (!mapping) return;

			const sel = [
				`.${context}.${role}`,
				`.${context} .${role}`,
				`.not-prose .${context}.${role}`,
				`.not-prose .${context} .${role}`,
				`.not-prose.${context} .${role}`
			].join(', ');

			addComponents({
				[sel]: mapping.default,
				...(mapping.sm ? { '@screen sm': { [sel]: mapping.sm } } : {}),
				...(mapping.md ? { '@screen md': { [sel]: mapping.md } } : {}),
				...(mapping.lg ? { '@screen lg': { [sel]: mapping.lg } } : {}),
				...(mapping.xl ? { '@screen xl': { [sel]: mapping.xl } } : {})
			});
		});
	});

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

	// --prose-max-width used to scale only inside the `.prose.responsive`
	// aggregate; now that scaling is on by default, it moves onto plain
	// `.prose` (base value already in contexts.cjs) with the same @screen steps.
	const proseResponsive = buildContextResponsiveVars(responsive.prose);

	addComponents({
		'.prose': {
			...proseResponsive.default
		},
		'@screen sm': {
			'.prose': {
				...proseResponsive.sm,
				'--prose-max-width': 'var(--typography-sm-prose-readable-width)'
			}
		},
		'@screen md': {
			'.prose': {
				...proseResponsive.md,
				'--prose-max-width': 'var(--typography-md-prose-readable-width)'
			}
		},
		'@screen lg': {
			'.prose': {
				...proseResponsive.lg,
				'--prose-max-width': 'var(--typography-lg-prose-readable-width)'
			}
		},
		'@screen xl': {
			'.prose': {
				...proseResponsive.xl,
				'--prose-max-width': 'var(--typography-xl-prose-readable-width)'
			}
		}
	});
});
