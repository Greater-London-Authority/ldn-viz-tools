const plugin = require('tailwindcss/plugin');

const contexts = require('./contexts');
const roles = require('./roles');
const semantics = require('./semantics');
const formatRules = require('./format');
const responsive = require('./responsive');

module.exports = plugin(function ({ addComponents }) {
	// Add contexts (variables only)
	addComponents({
		'.prose': contexts.prose,
		'.product': contexts.product
	});

	// Add semantics
	addComponents(semantics);

	// Add roles
	const rolesKeys = Object.keys(roles);
	addComponents(Object.fromEntries(rolesKeys.map((role) => [`.${role}`, roles[role]])));

	['prose', 'product'].forEach((context) => {
		rolesKeys.forEach((role) => {
			const mapping = responsive[context][role];
			if (!mapping) return;

			addComponents({
				[`.${context}.${role}, .not-prose .${context}.${role}`]: mapping.default,
				[`.${context} .${role}, .not-prose .${context} .${role}`]: mapping.default,
				[`.${context} .${role}, .not-prose.${context} .${role}`]: mapping.default
			});

			// Variables on parent with role
			addComponents({
				[`.${context}.responsive.${role}`]: mapping.default,
				'@screen md': { [`.${context}.responsive.${role}`]: mapping.md },
				'@screen lg': { [`.${context}.responsive.${role}`]: mapping.lg },
				'@screen xl': { [`.${context}.responsive.${role}`]: mapping.xl }
			});

			// Variables applied to children of parent context
			addComponents({
				[`.${context}.responsive .${role}`]: mapping.default,
				'@screen md': { [`.${context}.responsive .${role}`]: mapping.md },
				'@screen lg': { [`.${context}.responsive .${role}`]: mapping.lg },
				'@screen xl': { [`.${context}.responsive .${role}`]: mapping.xl }
			});
		});
	});

	function buildContextResponsiveVars(responsiveByRole) {
		const result = {
			default: {},
			md: {},
			lg: {},
			xl: {}
		};

		Object.values(responsiveByRole).forEach((role) => {
			if (role.default) Object.assign(result.default, role.default);
			if (role.md) Object.assign(result.md, role.md);
			if (role.lg) Object.assign(result.lg, role.lg);
			if (role.xl) Object.assign(result.xl, role.xl);
		});

		return result;
	}

	const proseResponsive = buildContextResponsiveVars(responsive.prose);

	addComponents({
		'.prose.responsive': {
			...proseResponsive.default,
			'--prose-max-width': 'var(--typography-base-prose-readable-width)'
		},
		'@screen md': {
			'.prose.responsive': {
				...proseResponsive.md,
				'--prose-max-width': 'var(--typography-md-prose-readable-width)'
			}
		},
		'@screen lg': {
			'.prose.responsive': {
				...proseResponsive.lg,
				'--prose-max-width': 'var(--typography-lg-prose-readable-width)'
			}
		},
		'@screen xl': {
			'.prose.responsive': {
				...proseResponsive.xl,
				'--prose-max-width': 'var(--typography-xl-prose-readable-width)'
			}
		}
	});

	// Add format
	Object.entries(formatRules).forEach(([role, spacing]) => {
		// Main .format class
		addComponents({
			[`.${role}.format`]: {
				marginTop: spacing.marginTop,
				marginBottom: spacing.marginBottom
			}
		});

		// Sibling element spacing
		addComponents({
			[`.${role}.format + *`]: {
				marginTop: spacing.sibling.marginTop
			}
		});

		// Special case: role followed by subhead
		if (spacing.subheadAfter) {
			addComponents({
				[`.${role}.format:has(+ .subhead)`]: {
					marginBottom: spacing.subheadAfter.marginBottom
				}
			});
		}
		// Special case: role followed by subtitle
		if (spacing.subtitleAfter) {
			addComponents({
				[`.${role}.format:has(+ .subtitle)`]: {
					marginBottom: spacing.subtitleAfter.marginBottom
				}
			});
		}
	});
});
