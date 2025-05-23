import { config } from '@repo/eslint-config/svelte.js';

export default [
  ...config,
  {
    ignores: ['.svelte-kit/**', 'dist/**']
  }
];