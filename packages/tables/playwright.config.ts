import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview -- --port 4176 --strictPort',
		port: 4176
	},
	testDir: 'tests'
});
