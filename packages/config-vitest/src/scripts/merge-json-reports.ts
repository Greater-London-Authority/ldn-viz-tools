import fs from 'fs/promises';
import path from 'path';

async function mergeCoverageFiles() {
	const inputDir = path.join(process.cwd(), 'coverage/raw');
	const outputDir = path.join(process.cwd(), 'coverage/merged');
	const outputFile = path.join(outputDir, 'merged-coverage.json');

	await fs.mkdir(outputDir, { recursive: true });

	const files = await fs.readdir(inputDir);
	const coverageList: Record<string, any>[] = [];

	for (const file of files) {
		if (!file.endsWith('.json')) continue;

		const fullPath = path.join(inputDir, file);
		const contents = await fs.readFile(fullPath, 'utf-8');

		try {
			const parsed = JSON.parse(contents);
			coverageList.push(parsed);
			console.log(`✔ Included ${file}`);
		} catch {
			console.warn(`⚠️ Failed to parse ${file}, skipping.`);
		}
	}

	const mergedCoverage = Object.assign({}, ...coverageList);
	await fs.writeFile(outputFile, JSON.stringify(mergedCoverage, null, 2));
	console.log(`✅ Merged coverage written to: ${outputFile}`);
}

mergeCoverageFiles();
