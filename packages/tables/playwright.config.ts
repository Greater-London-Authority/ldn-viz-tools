import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'vite build && npm run preview -- --port 4176 --strictPort',
		port: 4176,
		// CI builds every package in parallel, so this build can take longer than the 60s default
		timeout: 180_000
	},
	testDir: 'tests'
});
