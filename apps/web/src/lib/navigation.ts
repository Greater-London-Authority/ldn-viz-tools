import type { Doc } from '$content/index';
import { getAllDocs } from './utils.js';

type NavItem = { title: string; id: string; href: string };
type NavGroup = NavItem & { children: NavItem[] };

// Pages with an `order` in their front matter come first, in that order.
const byOrder = (a: { order?: number }, b: { order?: number }) =>
	(a.order ?? Infinity) - (b.order ?? Infinity);

const toNavItem = (doc: Doc): NavItem => ({
	title: doc.navLabel ?? doc.title,
	id: doc.slug,
	href: doc.slugFull
});

// Each folder under the section root becomes a group. The folder's index.md
// is the group heading and the other pages in the folder are its children.
const buildNavigation = (docs: Doc[], root: string): NavGroup[] => {
	const folderOf = (doc: Doc) => doc.slug.split('/')[1];
	const isFolderIndex = (doc: Doc) => doc.slug === `${root}/${folderOf(doc)}`;
	const inSection = docs.filter((doc) => doc.slug.startsWith(`${root}/`));

	return inSection
		.filter(isFolderIndex)
		.sort(byOrder)
		.map((index) => ({
			...toNavItem(index),
			children: inSection
				.filter((doc) => folderOf(doc) === folderOf(index) && !isFolderIndex(doc))
				.sort(byOrder)
				.map(toNavItem)
		}));
};

export const navigation = buildNavigation(getAllDocs(), 'design-system');
