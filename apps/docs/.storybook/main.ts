import type { StorybookConfig } from '@storybook/sveltekit';

import { dirname, join } from 'path';

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
		'../../../packages/utils/src/**/*.mdx',
		'../../../packages/utils/src/**/*.stories.@(js|ts|svelte)',
		'../../../packages/charts/src/**/*.mdx',
		'../../../packages/charts/src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
		'../../../packages/maps/src/**/*.mdx',
		'../../../packages/maps/src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
		'../../../packages/tables/src/**/*.mdx',
		'../../../packages/tables/src/**/*.stories.@(js|jsx|ts|tsx|svelte)'
	],
	addons: [
	 	'@kemuridama/storybook-addon-github',
		'@storybook/addon-svelte-csf',
		getAbsolutePath('@storybook/addon-themes'),
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/addon-interactions'),
		getAbsolutePath('@storybook/addon-a11y'),
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: true,
		defaultName: 'Documentation'
	},
	staticDirs: ['../static']
};
export default config;
