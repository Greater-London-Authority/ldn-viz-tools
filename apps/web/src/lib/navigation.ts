import { getAllDocs } from './utils.js';

const allDocs = getAllDocs();

const foundations = allDocs
	.filter((doc) => doc.section === 'Foundations')
	.filter((doc) => doc.slugFull !== '/foundations')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-foundations`,
		href: `/${doc.slug}`
	}));

const applicationDesign = allDocs
	.filter((doc) => doc.section === 'Application design')
	.filter((doc) => doc.slugFull !== '/application-design')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-application-design`,
		href: `/${doc.slug}`
	}));

const dataVisualisation = allDocs
	.filter((doc) => doc.section === 'Data visualisation')
	.filter((doc) => doc.slugFull !== '/data-visualisation')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-data-visualisation`,
		href: `/${doc.slug}`
	}));

export const navigation = [
	{
		title: 'Overview',
		id: 'overview',
		href: '/design-system'
	},
	{
		title: 'Foundations',
		id: 'foundations-intro',
		href: '/design-system/foundations',
		children: foundations
	},
	{
		title: 'Application Design',
		id: 'application-design-intro',
		href: '/design-system/application-design',
		children: applicationDesign
	},
	{
		title: 'Data Visualisation',
		id: 'data-visualisation-intro',
		href: '/design-system/data-visualisation',
		children: dataVisualisation
	}
];
