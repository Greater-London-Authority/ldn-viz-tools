import { defineCollection, defineConfig, s, type UserConfig } from 'velite';

const baseSchema = s.object({
	title: s.string(),
	description: s.string(),
	heroImage: s.string().optional(),
	thumbnail: s.string().optional(),
	layout: s.string().optional(),
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

export default defineConfig({
	root: './src/content',
	collections: {
		index,
		docs
	}
}) as UserConfig;
