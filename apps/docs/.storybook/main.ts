import type { StorybookConfig } from '@storybook/sveltekit';
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
    '../../../packages/ui/src/**/*.mdx',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
    '../../../packages/charts/**/*.mdx',
    '../../../packages/charts/src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
    '../../../packages/maps/**/*.mdx',
    '../../../packages/maps/src/**/*.stories.@(js|jsx|ts|tsx|svelte)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-svelte-csf',
    'storybook-dark-mode'
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;
