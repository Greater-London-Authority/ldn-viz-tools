import type { StorybookConfig } from '@storybook/sveltekit';
import remarkGfm from 'remark-gfm';
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
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false
      }
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    },
    '@storybook/addon-a11y',
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
