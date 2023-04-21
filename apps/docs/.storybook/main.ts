import type { StorybookConfig } from '@storybook/sveltekit';
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/ui/src/**/*.mdx',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/charts/**/*.mdx',
    '../../../packages/charts/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/maps/**/*.mdx',
    '../../../packages/maps/src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
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
