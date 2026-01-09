import { getAllDocs } from './utils.js';

const allDocs = getAllDocs();

const introduction = allDocs
	.filter((doc) => doc.section === 'Getting Started')
	.filter((doc) => doc.slugFull !== '/design-system/getting-started')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-getting-started`,
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

//Non alphabetic sort index. N.B reverse order so non listed pages are appended
const dvPageOrder = ['Colour', 'Accessibility', 'Getting started'];

const dataVisualisation = allDocs
	.filter((doc) => doc.section === 'Data visualisation')
	.filter((doc) => doc.slugFull !== '/design-system/data-visualisation')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-data-visualisation`,
		href: `/${doc.slug}`
	}))
	.sort((a, b) => dvPageOrder.indexOf(b.title) - dvPageOrder.indexOf(a.title));

export const navigation = [
	{
		title: 'Getting Started',
		id: 'getting-started',
		href: '/design-system/getting-started',
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
