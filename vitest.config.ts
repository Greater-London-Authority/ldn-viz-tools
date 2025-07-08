import { defineConfig } from 'vitest/config';
import { sharedConfig, sveltekitConfig } from '@ldn-viz/vitest-config';

export default defineConfig({
	test: {
		// projects: ['packages/*']
		projects: [
			{
				root: './packages/*',
				test: { ...sveltekitConfig.test }
			}
		]
	}
});
