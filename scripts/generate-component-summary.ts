#!/usr/bin/env -S node --strip-types
/**
 * Extract @component JSDoc comments from Svelte files in packages/
 * and output a single Markdown file.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Recursively collect files matching a test function. */
function walkDir(dir: string, test: (name: string) => boolean): string[] {
	const results: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...walkDir(full, test));
		} else if (test(entry.name)) {
			results.push(full);
		}
	}
	return results.sort();
}

/** Read the package name from `package.json`, falling back to directory name. */
function getPackageName(packageDir: string): string {
	const pkgJson = join(packageDir, 'package.json');
	if (existsSync(pkgJson)) {
		try {
			const data = JSON.parse(readFileSync(pkgJson, 'utf-8'));
			return data.name ?? basename(packageDir);
		} catch {
			// fall through
		}
	}
	return basename(packageDir);
}

/**
 * Extract the @component JSDoc comment from a Svelte file.
 *
 * Returns the descriptive text from the JSDoc block containing @component,
 * excluding the @component tag itself and any other JSDoc tags.
 * Returns null if no @component comment is found.
 */
function extractComponentComment(filepath: string): string | null {
	const text = readFileSync(filepath, 'utf-8');

	// Match both /** ... */ and /* ... */ blocks
	const jsdocPattern = /\/\*\*?(.*?)\*\//gs;

	let match: RegExpExecArray | null;
	while ((match = jsdocPattern.exec(text)) !== null) {
		const block = match[1];
		if (!block.includes('@component')) continue;

		// Process the block: strip leading whitespace and * prefixes per line
		const lines = block.split('\n');
		const cleanedLines: string[] = [];
		for (const line of lines) {
			let stripped = line.trim();
			if (stripped.startsWith('*')) {
				stripped = stripped.slice(1);
				// Remove at most one leading space after the *
				if (stripped.startsWith(' ')) {
					stripped = stripped.slice(1);
				}
			}
			cleanedLines.push(stripped);
		}

		// Collect description lines (before @component or any other JSDoc tag)
		const descriptionLines: string[] = [];
		for (const cline of cleanedLines) {
			if (cline.trim().startsWith('@')) break;
			descriptionLines.push(cline);
		}

		const description = descriptionLines.join('\n').trim();
		return description || null;
	}

	return null;
}

interface ComponentInfo {
	name: string;
	description: string;
	dir: string;
	filePath: string;
}

/**
 * Read a `Documentation.mdx` file and return its contents with import
 * statements and <Meta lines stripped, and Markdown headings bumped
 * down by the given offset (so they nest correctly under the parent
 * heading level).
 * Returns null if the file doesn't exist or has no content.
 */
function readMdxDoc(dir: string, headingOffset: number): string | null {
	for (const name of ['Documentation.mdx', 'documentation.mdx']) {
		const filepath = join(dir, name);
		if (!existsSync(filepath)) continue;

		const rawLines = readFileSync(filepath, 'utf-8').split('\n');

		// Filter out import statements, <Meta lines, export blocks, and
		// standalone JSX component invocations (e.g. <Log />).
		// Lines inside fenced code blocks (```) are never filtered.
		const lines: string[] = [];
		let inExportBlock = false;
		let inCodeBlock = false;
		for (const line of rawLines) {
			const trimmed = line.trimStart();

			// Toggle fenced code block state
			if (trimmed.startsWith('```')) {
				inCodeBlock = !inCodeBlock;
				lines.push(line);
				continue;
			}

			// Inside code blocks, keep everything as-is
			if (inCodeBlock) {
				lines.push(line);
				continue;
			}

			if (trimmed.startsWith('import ')) continue;
			if (trimmed.startsWith('<Meta')) continue;
			// Skip standalone JSX tags like <Log /> or <Component />
			if (/^<[A-Z]\w*\s*\/>\s*$/.test(trimmed)) continue;
			// Track export blocks (export function ... { ... })
			if (trimmed.startsWith('export ')) {
				inExportBlock = true;
				continue;
			}
			if (inExportBlock) {
				// End of export block when we see a closing brace at column 0
				if (trimmed === '}') {
					inExportBlock = false;
				}
				continue;
			}
			lines.push(line);
		}

		const filtered = lines.map((line) => {
			// Bump markdown headings down by headingOffset levels
			const headingMatch = line.match(/^(#{1,6})\s/);
			if (headingMatch) {
				const hashes = headingMatch[1];
				const newLevel = Math.min(hashes.length + headingOffset, 6);
				return '#'.repeat(newLevel) + line.slice(hashes.length);
			}
			return line;
		});
		const content = filtered.join('\n').trim();
		return content || null;
	}
	return null;
}

/**
 * Compute the relative link from the index.txt output to the per-component
 * doc file generated by generate-component-docs.js.
 * Returns null if the doc file doesn't exist.
 */
function componentDocLink(filePath: string, packagesDir: string, outputDir: string): string | null {
	const componentName = basename(filePath, '.svelte');
	const relDir = relative(packagesDir, dirname(filePath));
	const docFile = join(outputDir, 'components', relDir, `${componentName}.txt`);
	if (!existsSync(docFile)) return null;
	// Link is relative to the directory containing index.txt (which is outputDir)
	return `components/${relDir}/${componentName}.txt`;
}

/**
 * Build a map from component name to its doc file path (relative to outputDir)
 * by scanning the generated components directory.
 */
function buildComponentDocMap(componentsDir: string, outputDir: string): Map<string, string> {
	const map = new Map<string, string>();
	if (!existsSync(componentsDir)) return map;
	const mdFiles = walkDir(componentsDir, (name) => name.endsWith('.txt'));
	for (const mdFile of mdFiles) {
		const name = basename(mdFile, '.txt');
		const relPath = relative(outputDir, mdFile);
		map.set(name, relPath);
	}
	return map;
}

/**
 * Replace Storybook links like [Name](./?path=/docs/...--documentation)
 * with links to the generated markdown doc files, using the markdown
 * link text as the component name for lookup.
 */
function replaceStorybookLinks(text: string, componentDocMap: Map<string, string>): string {
	return text.replace(
		/\[([^\]]+)\]\(\.?\/?\?path=\/docs\/[^)]+--documentation\)/g,
		(fullMatch, linkText: string) => {
			const docPath = componentDocMap.get(linkText);
			if (docPath) {
				return `[${linkText}](${docPath})`;
			}
			return fullMatch;
		}
	);
}

function main(): void {
	const repoRoot = dirname(__dirname);
	const packagesDir = join(repoRoot, 'packages');
	const outputDir = join(repoRoot, 'llm-docs');

	mkdirSync(outputDir, { recursive: true });

	const outputFile = join(outputDir, 'component-list.txt');

	if (!existsSync(packagesDir)) {
		console.error(`Error: ${packagesDir} not found`);
		process.exit(1);
	}

	const componentsDir = join(outputDir, 'components');
	const componentDocMap = buildComponentDocMap(componentsDir, outputDir);

	const mdParts: string[] = [];
	let componentCount = 0;
	let packageCount = 0;

	// Sort packages alphabetically by directory name
	const packageDirs = readdirSync(packagesDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => join(packagesDir, d.name))
		.sort();

	for (const packageDir of packageDirs) {
		const packageName = getPackageName(packageDir);

		// Find all .svelte files (exclude .stories.svelte)
		const svelteFiles = walkDir(
			packageDir,
			(name) => name.endsWith('.svelte') && !name.endsWith('.stories.svelte')
		);

		// Find all documentation.mdx files
		const mdxFiles = walkDir(packageDir, (name) => name.toLowerCase() === 'documentation.mdx');

		// Extract component info with directory path
		const components: ComponentInfo[] = [];
		for (const svelteFile of svelteFiles) {
			const comment = extractComponentComment(svelteFile);
			if (comment !== null) {
				components.push({
					name: basename(svelteFile, '.svelte'),
					description: comment,
					dir: dirname(svelteFile),
					filePath: svelteFile
				});
			}
		}

		// Build a map of directory -> mdx content
		const mdxByDir = new Map<string, string>();
		for (const mdxFile of mdxFiles) {
			const dir = dirname(mdxFile);
			const content = readMdxDoc(dir, 2);
			if (content) {
				mdxByDir.set(dir, content);
			}
		}

		// Group components by their immediate parent directory
		const componentsByDir = new Map<string, ComponentInfo[]>();
		for (const comp of components) {
			const group = componentsByDir.get(comp.dir) ?? [];
			group.push(comp);
			componentsByDir.set(comp.dir, group);
		}

		// Collect all directories that have components or mdx docs
		const allDirs = new Set([...componentsByDir.keys(), ...mdxByDir.keys()]);
		if (allDirs.size === 0) continue;

		packageCount++;
		mdParts.push(`# ${packageName}\n`);

		const sortedDirs = [...allDirs].sort();
		for (const dir of sortedDirs) {
			const group = componentsByDir.get(dir) ?? [];
			const mdxContent = mdxByDir.get(dir) ?? null;
			componentCount += group.length;

			// Determine if this directory needs a group heading
			// (multiple components, or has mdx docs alongside components, or mdx-only)
			const needsGroupHeading = group.length > 1 || (mdxContent && group.length >= 0);

			if (needsGroupHeading) {
				const dirName = basename(dir);
				const titleCased = dirName.charAt(0).toUpperCase() + dirName.slice(1);

				if (group.length > 0) {
					mdParts.push(`## ${titleCased} components\n`);
				} else {
					mdParts.push(`## ${titleCased}\n`);
				}

				if (mdxContent) {
					mdParts.push(`### General documentation\n`);
					mdParts.push(`${replaceStorybookLinks(mdxContent, componentDocMap)}\n`);
				}

				for (const { name, description, filePath } of group) {
					const link = componentDocLink(filePath, packagesDir, outputDir);
					if (link) {
						mdParts.push(`### [${name}](${link})\n`);
					} else {
						mdParts.push(`### ${name}\n`);
					}
					mdParts.push(`${replaceStorybookLinks(description, componentDocMap)}\n`);
				}
			} else if (group.length === 1) {
				// Single documented component, no mdx
				const link = componentDocLink(group[0].filePath, packagesDir, outputDir);
				if (link) {
					mdParts.push(`## [${group[0].name}](${link})\n`);
				} else {
					mdParts.push(`## ${group[0].name}\n`);
				}
				mdParts.push(`${replaceStorybookLinks(group[0].description, componentDocMap)}\n`);
			}
		}
	}

	const result = mdParts.join('\n');
	writeFileSync(outputFile, result, 'utf-8');

	console.log(`Written to ${outputFile}`);
	console.log(`Extracted ${componentCount} component(s) across ${packageCount} package(s).`);
}

main();
