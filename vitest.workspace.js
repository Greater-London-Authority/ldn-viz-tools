import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'./apps/docs/vite.config.ts',
	'./packages/utils/vite.config.js',
	'./packages/charts/vite.config.ts',
	'./packages/tables/vite.config.ts',
	'./packages/maps/vite.config.ts',
	'./packages/ui/vite.config.ts'
]);
