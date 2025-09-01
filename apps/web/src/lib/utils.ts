import { dataVizGuide, docs, index, type Doc, type Guide } from '$content/index';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

const allContent = [...dataVizGuide, ...docs, index];

export type ContentResolver = () => Promise<{ default: Component; metadata: Doc | Guide }>;

export const generateMetadata = (slug: string = 'index') => {
	return allContent.find((data) => data.slug === slug);
};

export const getAllDocs = () => {
	return docs;
};

function slugFromPath(path: string) {
	return path.replaceAll(/\/src\/content\/|\/index|\.md$/g, '');
}

export const getContent = async (slug: string = 'index') => {
	const modules = import.meta.glob('/src/content/**/*.md');

	let match: { path?: string; resolver?: ContentResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			match = { path, resolver: resolver as unknown as ContentResolver };
			break;
		}
	}

	const content = await match?.resolver?.();
	const metadata = generateMetadata(slug);

	if (!content || !metadata) {
		error(404, 'Could not find the document.');
	}

	return {
		component: content.default,
		metadata
	};
};
