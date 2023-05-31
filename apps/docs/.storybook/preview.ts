import type { Preview } from '@storybook/svelte';
import '../src/app.postcss';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
      appBg: 'black'
    }
  }
};

export default preview;
