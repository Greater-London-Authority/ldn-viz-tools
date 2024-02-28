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
		'../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
		'../../../packages/charts/src/**/*.mdx',
		'../../../packages/charts/src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
		'../../../packages/maps/src/**/*.mdx',
		'../../../packages/maps/src/**/*.stories.@(js|jsx|ts|tsx|svelte)'
	],
	addons: [
		'@storybook/addon-svelte-csf',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'storybook-dark-mode'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: true,
		defaultName: 'Documentation'
	}
};
export default config;
