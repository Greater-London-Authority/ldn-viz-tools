// Demo menu items for layout examples, mirroring the NavigationMenu stories.
const foundations = [
	{ title: 'Accessibility', id: 'accessibility', href: '/accessibility' },
	{ title: 'Brand', id: 'brand', href: '/brand' },
	{ title: 'Color', id: 'color', href: '/color' },
	{ title: 'Typography', id: 'typography', href: '/typography' },
	{ title: 'Spacing', id: 'spacing', href: '/spacing' },
	{ title: 'Design Tokens', id: 'design-tokens', href: '/design-tokens' }
];

export const navItems = [
	{
		title: 'Foundations',
		id: 'foundations',
		href: '/foundations',
		children: foundations
	},
	{
		title: 'Applications',
		id: 'applications',
		href: '/applications',
		children: [
			{
				title: 'Layout',
				id: 'layout',
				href: '/layout',
				children: [
					{ title: 'Applications', id: 'layout-applications', href: '/layout-applications' },
					{
						title: 'Maps',
						id: 'layout-maps',
						href: '/layout-maps',
						children: [
							{ title: 'Maps with sidebars', id: 'maps-sidebars', href: '/sidebar-maps' },
							{ title: 'Maps in dashboards', id: 'maps-dashboards', href: '/dashboard-maps' }
						]
					}
				]
			},
			{ title: 'User Interface', id: 'userInterface', href: '/userInterface' }
		]
	},
	{
		title: 'Data Visualisation',
		id: 'dataVisualisation',
		href: '/dataVisualisation',
		children: [
			{ title: 'Principles', id: 'dv-principles', href: '/dv-principles' },
			{ title: 'Accessibility', id: 'dv-accessibility', href: '/dv-accessibility' },
			{
				title: 'Color',
				id: 'dv-color',
				href: '/dv-color',
				children: [
					{ title: 'Categorical', id: 'dv-categorical', href: '/dv-categorical' },
					{ title: 'Quantitative', id: 'dv-quantitative', href: '/dv-quantitative' },
					{ title: 'Maps', id: 'dv-maps', href: '/dv-maps' }
				]
			},
			{ title: 'Scaling Shapes', id: 'dv-shapes', href: '/dv-shapes' },
			{ title: 'Chart Themes', id: 'dv-chartThemes', href: '/dv-chartThemes' },
			{ title: 'Chart Examples', id: 'dv-chartExamples', href: '/dv-chartExamples' }
		]
	}
];
