import { getAllDocs } from './utils.js';

const allDocs = getAllDocs();

const components = allDocs
	.filter((doc) => doc.section === 'Components')
	.filter((doc) => doc.slugFull !== '/intro')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-components`,
		href: `/${doc.slug}`
	}));

export const navigation = [
	{
		title: 'Overview',
		id: 'overview',
		href: '/'
	},
	{
		title: 'Components',
		id: 'intro',
		href: '/intro',
		children: components
	}
];
