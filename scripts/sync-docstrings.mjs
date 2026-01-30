#!/usr/bin/env node

/**
 * This script copies @component docstrings from Svelte component files
 * to their corresponding .stories.svelte files.
 *
 * This is necessary because at somme point during the Svelte 5 migration,
 * Storybook stopped extracting these comments from components itself.
 *
 * The @component tag is removed when copying to stories files, and the rest of
 * the docstring is placed after the defineMeta() in a context=module script tag.
 *
 * Treating the sources files as strings (rather than parsing them into a tree)
 * is potentially slightly brittle, but this should be ok as the script will be
 * run manually and the changes it makes checked with 'git diff'.
 *
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import process from 'node:process';

import { glob } from 'glob';
import { dirname, basename, join } from 'path';

const componentFiles = await glob(process.argv.slice(-1)[0] + 'src/lib/**/*.svelte', {
  cwd: new URL('..', import.meta.url).pathname,
  absolute: true,
  ignore: ['**/*.stories.svelte']
});


let updated = 0;
let skipped = 0;
let noDocstring = 0;
let noStories = 0;

for (const componentPath of componentFiles) {
  const componentContent = readFileSync(componentPath, 'utf-8');

  // Match the pattern: /** ... @component ... */
  const docstringMatch = componentContent.match(/\/\*\*[\s\S]*?@component[\s\S]*?\*\//m);

  if (!docstringMatch) {
    noDocstring++;
    continue;
  }

  const docstring = docstringMatch[0];

  // Remove the line like: " * @component" or "\t * @component"
  let storiesDocstring = docstring.replace(/^[\t ]*\*[\t ]*@component[\t ]*\n?/m, '');

  // Normalize indentation
  const docLines = storiesDocstring.split('\n');
  const normalizedLines = docLines.map((line) => {
    // Remove leading tab(s) but preserve space before * in continuation lines (" * ") to align nicely with "/**" and "*/"
    const content = line.replace(/^\t+/, '');

    // Add single tab for non-empty lines
    return content ? '\t' + content : '';
  });
  storiesDocstring = normalizedLines.join('\n');

  // Find the corresponding stories file
  const dir = dirname(componentPath);
  const name = basename(componentPath, '.svelte');
  const storiesPath = join(dir, `${name}.stories.svelte`);

  if (!existsSync(storiesPath)) {
    noStories++;
    console.log(`No stories file for: ${componentPath}`);
    continue;
  }

  let storiesContent = readFileSync(storiesPath, 'utf-8');

  const moduleScriptMatch = storiesContent.match(/<script\s+module\s+lang="ts">/);
  if (!moduleScriptMatch) {
    console.log(`No module script in: ${storiesPath}`);
    skipped++;
    continue;
  }


  // Find the module <script> tag and extracts its contents
  const scriptStartIndex = storiesContent.indexOf('<script module lang="ts">');
  const scriptEndIndex = storiesContent.indexOf('</script>', scriptStartIndex);
  const scriptContent = storiesContent.slice(
    scriptStartIndex + '<script module lang="ts">'.length,
    scriptEndIndex
  );
  const lines = scriptContent.split('\n');


// Find the defineMeta line
  let defineMetaLineIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const { Story } = defineMeta(')) {
      defineMetaLineIndex = i;
      break;
    }
  }

  if (defineMetaLineIndex === -1) {
    console.log(`No defineMeta found in: ${storiesPath}`);
    skipped++;
    continue;
  }

  let existingDocstringStart = -1;
  let existingDocstringEnd = -1;

  // Search backwards from defineMeta to find end of existing docstring ("*/")
  for (let i = defineMetaLineIndex - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (line === '') continue; // skip blank lines
    if (line.endsWith('*/')) {
      existingDocstringEnd = i;
      // Now find the start
      for (let j = i; j >= 0; j--) {
        if (lines[j].trim().startsWith('/**')) {
          existingDocstringStart = j;
          break;
        }
      }
      break;
    } else {
      // No existing docstring before defineMeta
      break;
    }
  }

  let newScriptContent;

  if (existingDocstringStart !== -1 && existingDocstringEnd !== -1) {
    // Replace existing docstring
    const beforeDocstring = lines.slice(0, existingDocstringStart).join('\n');
    const afterDocstring = lines.slice(existingDocstringEnd + 1).join('\n');
    newScriptContent = beforeDocstring + '\n' + storiesDocstring + '\n' + afterDocstring;
  } else {
    // Insert new docstring immediately before defineMeta
    const beforeInsert = lines.slice(0, defineMetaLineIndex).join('\n');
    const afterInsert = lines.slice(defineMetaLineIndex).join('\n');
    newScriptContent = beforeInsert + storiesDocstring + '\n\n' + afterInsert;
  }

  const newStoriesContent =
    storiesContent.slice(0, scriptStartIndex + '<script module lang="ts">'.length) +
    newScriptContent +
    storiesContent.slice(scriptEndIndex);

  if (newStoriesContent !== storiesContent) {
    writeFileSync(storiesPath, newStoriesContent);
    console.log(`Updated: ${storiesPath}`);
    updated++;
  } else {
    skipped++;
  }
}

console.log(`\nSummary:`);
console.log(`  Updated: ${updated}`);
console.log(`  Skipped (no changes): ${skipped}`);
console.log(`  No @component docstring: ${noDocstring}`);
console.log(`  No stories file: ${noStories}`);
