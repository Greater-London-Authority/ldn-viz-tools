// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/sveltekit';
import { createRequire } from 'node:module';
import { dirname, join } from 'path';
import remarkGfm from 'remark-gfm';
const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../../../packages/ui/src/**/*.mdx',
		'../../../packages/ui/src/**/*.stories.@(js|ts|svelte)',
		'../../../packages/charts/src/**/*.mdx',
		'../../../packages/charts/src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
		'../../../packages/maps/src/**/*.mdx',
		'../../../packages/maps/src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
		'../../../packages/tables/src/**/*.mdx',
		'../../../packages/tables/src/**/*.stories.@(js|jsx|ts|tsx|svelte)'
	],
	addons: [
		getAbsolutePath('@storybook/addon-themes'),
		getAbsolutePath('@storybook/addon-svelte-csf'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-vitest'),
		{
			name: getAbsolutePath('@storybook/addon-docs'),
			options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } }
		}
	],
	framework: {
		name: getAbsolutePath('@storybook/sveltekit'),
		options: {}
	},
	docs: {
		defaultName: 'Documentation'
	},
	staticDirs: ['../static']
};
export default config;
