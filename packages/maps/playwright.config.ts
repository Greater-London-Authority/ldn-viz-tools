import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview -- --port 4175 --strictPort',
		port: 4175
	},
	testDir: 'tests'
});
