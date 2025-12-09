import { getAllDocs } from './utils.js';

const allDocs = getAllDocs();

const introduction = allDocs
	.filter((doc) => doc.section === 'Introduction')
	.filter((doc) => doc.slugFull !== '/design-system/introduction')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-introduction`,
		href: `/${doc.slug}`
	}));

const foundations = allDocs
	.filter((doc) => doc.section === 'Foundations')
	.filter((doc) => doc.slugFull !== '/design-system/foundations')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-foundations`,
		href: `/${doc.slug}`
	}));

const applicationDesign = allDocs
	.filter((doc) => doc.section === 'Application design')
	.filter((doc) => doc.slugFull !== '/design-system/application-design')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-application-design`,
		href: `/${doc.slug}`
	}));

const dataVisualisation = allDocs
	.filter((doc) => doc.section === 'Data visualisation')
	.filter((doc) => doc.slugFull !== '/design-system/data-visualisation')
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
		title: 'Introduction',
		id: 'introduction',
		href: '/design-system/introduction',
		children: introduction
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
