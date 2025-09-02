import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

async function collectCoverageFiles() {
	const patterns = ['../../apps/**/*', '../../packages/**/*'];
	const destinationDir = path.join(process.cwd(), 'coverage/raw');
	await fs.mkdir(destinationDir, { recursive: true });

	const directoriesWithCoverage: string[] = [];

	for (const pattern of patterns) {
		const matches = await glob(pattern);

		for (const match of matches) {
			const stats = await fs.stat(match);
			if (!stats.isDirectory()) continue;

			const coverageFilePath = path.join(match, 'coverage.json');
			try {
				await fs.access(coverageFilePath);
				directoriesWithCoverage.push(match);

				// Use relative path for unique file name
				const relativePath = path.relative('../../', match).replace(/\//g, '__');
				const destinationFile = path.join(destinationDir, `${relativePath}.json`);

				await fs.copyFile(coverageFilePath, destinationFile);
				console.log(`✔ Copied ${coverageFilePath} → ${destinationFile}`);
			} catch {
				// no coverage.json in this dir, skip
			}
		}
	}

	if (directoriesWithCoverage.length > 0) {
		const formatted = directoriesWithCoverage.map((d) => d.replace(/\.\.\//g, ''));
		console.log(`✅ Found coverage.json in: ${formatted.join(', ')}`);
	} else {
		console.warn('⚠️  No coverage.json files found.');
	}

	console.log(`📁 Coverage collected into: ${destinationDir}`);
}

collectCoverageFiles();
