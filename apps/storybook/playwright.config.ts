import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview -- --port 4177 --strictPort',
		port: 4177
	},
	testDir: 'tests'
});
