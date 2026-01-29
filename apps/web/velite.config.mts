import { defineCollection, defineConfig, s, type UserConfig } from 'velite';

const baseSchema = s.object({
	title: s.string(),
	description: s.string(),
	path: s.path(),
	content: s.markdown(),
	navLabel: s.string().optional(),
	raw: s.raw()
});

const docSchema = baseSchema
	.extend({
		toc: s.toc(),
		section: s.enum([
			'Overview',
			'Getting Started',
			'Foundations',
			'Application design',
			'Data visualisation'
		])
	})
	.transform((data) => {
		return {
			...data,
			slug: data.path,
			slugFull: `/${data.path}`
		};
	});

const guideSchema = baseSchema.transform((data) => {
	return {
		...data,
		slug: data.path,
		slugFull: `/${data.path}`
	};
});

const index = defineCollection({
	name: 'Index',
	pattern: './index.md',
	schema: baseSchema.transform((data) => {
		return {
			...data,
			slug: data.path,
			slugFull: `/${data.path}`
		};
	}),
	single: true
});

const docs = defineCollection({
	name: 'Doc',
	pattern: './design-system/**/*.md',
	schema: docSchema
});

const dataVizGuide = defineCollection({
	name: 'Guide',
	pattern: './dataviz-guide/**/*.md',
	schema: guideSchema
});

export default defineConfig({
	root: './src/content',
	collections: {
		index,
		docs,
		dataVizGuide
	}
}) as UserConfig;
