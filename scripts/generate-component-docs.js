#!/usr/bin/env node

/**
 * Generates a markdown documentation file for each .svelte component.
 *
 * For each component, the markdown includes:
 *   1. The @component JSDoc comment (if present)
 *   2. A table of props with their types, defaults, and descriptions
 *   3. Stories from the corresponding .stories.svelte file (if it exists)
 *
 * Output goes to llm-docs/components/<relative-path>/<ComponentName>.txt
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { basename, dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const PACKAGES_DIR = join(ROOT, 'packages');
const OUTPUT_DIR = join(ROOT, 'llm-docs', 'components');

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Strip the `src/lib` segment from a relative path.
 * e.g. "ui/src/lib/button" -> "ui/button"
 */
function stripSrcLib(relPath) {
	const parts = relPath.split('/');
	const idx = parts.indexOf('src');
	if (idx !== -1 && parts[idx + 1] === 'lib') {
		parts.splice(idx, 2);
	}
	return parts.join('/');
}

/** Recursively find all files matching a predicate. */
function walk(dir, predicate, results = []) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const st = statSync(full);
		if (
			st.isDirectory() &&
			entry !== 'node_modules' &&
			entry !== '.svelte-kit' &&
			entry !== 'dist'
		) {
			walk(full, predicate, results);
		} else if (st.isFile() && predicate(full)) {
			results.push(full);
		}
	}
	return results;
}

// ── Extract @component comment ──────────────────────────────────────────────

function extractComponentComment(source) {
	// Look for a JSDoc block that contains @component
	const jsdocRe = /\/\*\*([\s\S]*?)\*\//g;
	let match;
	while ((match = jsdocRe.exec(source)) !== null) {
		const block = match[1];
		if (block.includes('@component')) {
			// Strip leading " * " from each line, remove @component tag
			const lines = block
				.split('\n')
				.map((l) => l.replace(/^\s*\*\s?/, ''))
				.filter((l) => !l.trim().startsWith('@component'))
				.join('\n')
				.trim();
			return lines || null;
		}
	}
	return null;
}

// ── Extract props from interface Props { ... } ─────────────────────────────

function extractProps(source) {
	// Find "interface Props {" block
	const ifaceStart = source.indexOf('interface Props {');
	if (ifaceStart === -1) return [];

	// Find the matching closing brace
	let depth = 0;
	let start = source.indexOf('{', ifaceStart);
	let end = start;
	for (let i = start; i < source.length; i++) {
		if (source[i] === '{') depth++;
		else if (source[i] === '}') {
			depth--;
			if (depth === 0) {
				end = i;
				break;
			}
		}
	}

	const body = source.slice(start + 1, end);

	// Parse prop entries: each is an optional JSDoc comment followed by a prop declaration
	const props = [];
	// Match JSDoc comment (optional) + prop name + optional ? + : type
	const propRe = /(?:\/\*\*([\s\S]*?)\*\/\s*)?(\w+)(\??):([^;]*);/g;
	let m;
	while ((m = propRe.exec(body)) !== null) {
		const [, jsdoc, name, optional, typeRaw] = m;
		const propName = name.trim();

		// Skip snippet/children props from the docs table
		if (propName === 'children') continue;

		const type = typeRaw.trim();
		const isOptional = optional === '?';

		let description = '';
		if (jsdoc) {
			description = jsdoc
				.split('\n')
				.map((l) => l.replace(/^\s*\*\s?/, ''))
				.join(' ')
				.trim();
		}

		// Try to find default value from the destructuring: `propName = defaultValue`
		let defaultValue = undefined;
		// Look for pattern like `propName = value` in the $props() destructuring
		const defRe = new RegExp(`${propName}\\s*=\\s*(?:\\$bindable\\()?([^,}]+?)(?:\\))?\\s*[,}]`);
		const defMatch = source.match(defRe);
		if (defMatch && isOptional) {
			defaultValue = defMatch[1].trim();
			// Clean up trailing parenthesis from $bindable wrapper
			if (defaultValue.endsWith(')')) {
				defaultValue = defaultValue.slice(0, -1).trim();
			}
		}

		props.push({ name: propName, type, isOptional, description, defaultValue });
	}

	return props;
}

// ── Extract stories ─────────────────────────────────────────────────────────

function extractStories(storiesSource) {
	const stories = [];

	// Strategy: split on <Story to find each story tag, then extract name and content
	const storyParts = storiesSource.split(/<Story\s+/);

	for (let i = 1; i < storyParts.length; i++) {
		const part = storyParts[i];

		// Extract name="..." from the opening tag
		const nameMatch = part.match(/name="([^"]+)"/);
		if (!nameMatch) continue;
		const storyName = nameMatch[1];

		// Check if self-closing: />
		const selfCloseIdx = part.indexOf('/>');
		const openTagEndIdx = part.indexOf('>');

		if (selfCloseIdx !== -1 && (selfCloseIdx <= openTagEndIdx || openTagEndIdx === selfCloseIdx)) {
			// Self-closing story, no body
			stories.push({ name: storyName, code: null });
			continue;
		}

		// Find the content up to </Story>
		const closingTag = '</Story>';
		const closingIdx = part.indexOf(closingTag);
		if (closingIdx === -1) {
			stories.push({ name: storyName, code: null });
			continue;
		}

		const innerContent = part.slice(openTagEndIdx + 1, closingIdx);

		// Try to extract {#snippet ...} content
		const snippetMatch = innerContent.match(/\{#snippet\s+\w+\([^)]*\)\}([\s\S]*?)\{\/snippet\}/);
		if (snippetMatch) {
			const snippetCode = dedent(snippetMatch[1]).trim();
			stories.push({ name: storyName, code: snippetCode });
		} else {
			// Use the inner content directly (e.g. asChild stories)
			const dedented = dedent(innerContent).trim();
			if (dedented) {
				stories.push({ name: storyName, code: dedented });
			} else {
				stories.push({ name: storyName, code: null });
			}
		}
	}

	return stories;
}

/** Remove common leading whitespace from a code block. */
function dedent(text) {
	const lines = text.split('\n');
	const nonEmpty = lines.filter((l) => l.trim().length > 0);
	if (nonEmpty.length === 0) return text;
	const minIndent = Math.min(
		...nonEmpty.map((l) => {
			const m = l.match(/^(\s*)/);
			return m ? m[1].length : 0;
		})
	);
	if (minIndent === 0) return text;
	return lines.map((l) => l.slice(minIndent)).join('\n');
}

// ── Storybook link rewriting ────────────────────────────────────────────────

/**
 * Replace Storybook links like [Name](./?path=/docs/...--documentation)
 * with relative links to the generated markdown doc files, using the
 * markdown link text as the component name for lookup.
 *
 * @param {string} text - Markdown text to process
 * @param {Map<string, string>} componentDocPaths - Map from component name to output path (relative to OUTPUT_DIR)
 * @param {string} currentOutDir - Directory of the file being written (to compute relative links)
 * @returns {string} Text with Storybook links replaced
 */
function replaceStorybookLinks(text, componentDocPaths, currentOutDir) {
	return text.replace(
		/\[([^\]]+)\]\(\.?\/?\?path=\/docs\/[^)]+--documentation\)/g,
		(fullMatch, linkText) => {
			const docRelPath = componentDocPaths.get(linkText);
			if (docRelPath) {
				const relLink = relative(currentOutDir, join(OUTPUT_DIR, docRelPath));
				return `[${linkText}](${relLink})`;
			}
			// No match found, leave the original link
			return fullMatch;
		}
	);
}

// ── Build markdown ──────────────────────────────────────────────────────────

function buildMarkdown(componentName, componentComment, props, stories) {
	const lines = [];

	lines.push(`# ${componentName}`);
	lines.push('');

	if (componentComment) {
		lines.push(componentComment);
		lines.push('');
	}

	if (props.length > 0) {
		lines.push('## Props');
		lines.push('');
		lines.push('| Prop | Type | Default | Description |');
		lines.push('| --- | --- | --- | --- |');
		for (const p of props) {
			const name = p.isOptional ? `${p.name}?` : `**${p.name}**`;
			const type = `\`${p.type.replace(/\|/g, '\\|')}\``;
			const def = p.defaultValue != null ? `\`${p.defaultValue}\`` : '-';
			const desc = p.description.replace(/\|/g, '\\|').replace(/\n/g, ' ');
			lines.push(`| ${name} | ${type} | ${def} | ${desc} |`);
		}
		lines.push('');
	}

	if (stories.length > 0) {
		lines.push('## Stories');
		lines.push('');
		for (const s of stories) {
			lines.push(`### ${s.name}`);
			lines.push('');
			if (s.code) {
				lines.push('```svelte');
				lines.push(s.code);
				lines.push('```');
			} else {
				lines.push('*Default usage (no custom template).*');
			}
			lines.push('');
		}
	}

	return lines.join('\n');
}

// ── Main ────────────────────────────────────────────────────────────────────

function main() {
	const allSvelteFiles = walk(
		PACKAGES_DIR,
		(f) => f.endsWith('.svelte') && !f.endsWith('.stories.svelte')
	);

	// First pass: determine which components will generate docs and build a
	// lookup map from lowercased component name to output path (relative to OUTPUT_DIR).
	const componentDocPaths = new Map(); // component name -> relative output path
	const toGenerate = []; // { filePath, componentName, componentComment, props, stories, relPath }

	for (const filePath of allSvelteFiles) {
		const source = readFileSync(filePath, 'utf-8');
		const componentName = basename(filePath, '.svelte');

		const componentComment = extractComponentComment(source);
		const props = extractProps(source);

		const dir = dirname(filePath);
		const storiesFile = join(dir, `${componentName}.stories.svelte`);
		let stories = [];
		if (existsSync(storiesFile)) {
			const storiesSource = readFileSync(storiesFile, 'utf-8');
			stories = extractStories(storiesSource);
		}

		if (!componentComment && props.length === 0 && stories.length === 0) {
			continue;
		}

		const relPath = stripSrcLib(relative(PACKAGES_DIR, dir));
		const docRelPath = join(relPath, `${componentName}.txt`);
		componentDocPaths.set(componentName, docRelPath);
		toGenerate.push({ filePath, componentName, componentComment, props, stories, relPath });
	}

	// Second pass: generate markdown with Storybook links rewritten.
	let generated = 0;

	for (const { componentName, componentComment, props, stories, relPath } of toGenerate) {
		let md = buildMarkdown(componentName, componentComment, props, stories);

		// Rewrite Storybook links to point to sibling generated docs
		const outDir = join(OUTPUT_DIR, relPath);
		md = replaceStorybookLinks(md, componentDocPaths, outDir);

		mkdirSync(outDir, { recursive: true });
		const outFile = join(outDir, `${componentName}.txt`);
		writeFileSync(outFile, md);
		generated++;
	}

	// Third pass: write per-package and combined component lists.
	const byPackage = new Map();
	for (const { componentName, relPath } of toGenerate) {
		const pkg = relPath.split('/')[0];
		if (!byPackage.has(pkg)) byPackage.set(pkg, []);
		byPackage.get(pkg).push({ componentName, relPath });
	}

	const componentsSectionLines = [];
	for (const pkg of [...byPackage.keys()].sort()) {
		const items = byPackage
			.get(pkg)
			.sort((a, b) => a.componentName.localeCompare(b.componentName));

		// Resolve display name from package.json
		const pkgJsonPath = join(PACKAGES_DIR, pkg, 'package.json');
		let pkgDisplayName = pkg;
		if (existsSync(pkgJsonPath)) {
			try {
				pkgDisplayName = JSON.parse(readFileSync(pkgJsonPath, 'utf-8')).name ?? pkg;
			} catch {
				// ignore
			}
		}

		// Per-package list
		const pkgListLines = [`# ${pkgDisplayName} Components`, ''];
		for (const { componentName, relPath } of items) {
			const withinPkg = relPath.split('/').slice(1).join('/');
			const linkTarget = withinPkg
				? `./${withinPkg}/${componentName}.txt`
				: `./${componentName}.txt`;
			pkgListLines.push(`- [${componentName}](${linkTarget})`);
		}
		pkgListLines.push('');

		const pkgOutDir = join(OUTPUT_DIR, pkg);
		mkdirSync(pkgOutDir, { recursive: true });
		writeFileSync(join(pkgOutDir, 'components-list.txt'), pkgListLines.join('\n'));

		// Contribution to llms.txt Components section
		componentsSectionLines.push(`### ${pkgDisplayName}`);
		componentsSectionLines.push('');
		for (const { componentName, relPath } of items) {
			componentsSectionLines.push(
				`- [${componentName}](./components/${relPath}/${componentName}.txt)`
			);
		}
		componentsSectionLines.push('');
	}

	// Update the ## Components section of llms.txt in-place
	const llmsTxtPath = join(ROOT, 'llm-docs', 'llms.txt');
	const llmsTxt = readFileSync(llmsTxtPath, 'utf-8');
	const newComponentsBlock = `## Components\n\n${componentsSectionLines.join('\n').trimEnd()}\n\n`;
	const updated = llmsTxt.replace(/## Components\n[\s\S]*?(?=\n## |\s*$)/, newComponentsBlock);
	writeFileSync(llmsTxtPath, updated);

	const skipped = allSvelteFiles.length - generated;
	console.log(
		`Done. Generated ${generated} markdown files, skipped ${skipped} components (no docs content).`
	);
	console.log(`Output: ${OUTPUT_DIR}`);
}

main();
