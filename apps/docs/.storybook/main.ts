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
		'../../../packages/ui/src/**/*.stories.@(js|ts|svelte)'
	],
	addons: [
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-svelte-csf'),
		getAbsolutePath('@chromatic-com/storybook')
	],
	framework: {
		name: getAbsolutePath('@storybook/sveltekit'),
		options: {}
	}
};
export default config;
