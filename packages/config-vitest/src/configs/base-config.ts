import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export const baseConfig = defineConfig({
	test: {
		globals: true,
		coverage: {
			provider: 'v8',
			reportsDirectory: './coverage/raw',
			exclude: ['**/build', '**/*.config', ...coverageConfigDefaults.exclude],
			reporter: [['json', { file: 'coverage.json' }]]
		}
	}
});
