import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
	async preVisit(page) {
		await injectAxe(page);
	},
	async postVisit(page) {
		await checkA11y(
			page,
			'#storybook-root',
			{
				detailedReport: true,
				detailedReportOptions: {
					html: true
				},
				verbose: true
			},
			false,
			'html',
			{
				outputDirPath: 'reports',
				outputDir: 'accessibility',
				reportFileName: 'a11y-audit.htm'
			}
		);
	}
};

export default config;
