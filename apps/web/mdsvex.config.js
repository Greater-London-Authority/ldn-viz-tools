import { defineMDSveXConfig } from "mdsvex";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { createHighlighter } from "shiki";
import { visit } from "unist-util-visit";

const prettyCodeOptions = {
	theme: {
		light: "github-light",
		dark: "github-dark",
	},
	createHighlighter: (options) =>
		createHighlighter({
			...options,
			langs: [
				"plaintext",
				import("shiki/langs/javascript.mjs"),
				import("shiki/langs/typescript.mjs"),
				import("shiki/langs/css.mjs"),
				import("shiki/langs/svelte.mjs"),
				import("shiki/langs/shellscript.mjs"),
				import("shiki/langs/markdown.mjs"),
			],
		}),
	keepBackground: false,
	onVisitLine(node) {
		if (node.children.length === 0) {
			// @ts-expect-error - we're changing the node type
			node.children = { type: "text", value: " " };
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ["line--highlighted"];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ["chars--highlighted"];
	},
};

export const baseRemarkPlugins = [remarkGfm, remarkRemovePrettierIgnore];
export const baseRehypePlugins = [
	rehypeSlug,
	[rehypePrettyCode, prettyCodeOptions],
	rehypeAutolinkHeadings,
	rehypeHandleMetadata,
];

/**
 * Removes `<!-- prettier-ignore -->` and `// prettier-ignore` from code blocks
 * before they are converted to HTML for syntax highlighting.
 *
 * We do this because sometimes we want to force a line break in code blocks, but
 * prettier removes them, however, we don't want to include the ignore statement
 * in the final code block.
 *
 * One caveat is that if you did want to include the ignore statement in the final
 * code block, you'd have to do some hacky stuff like including it in the comment
 * itself and checking for it in the code block, but that's not something we need
 * at the moment.
 */
function remarkRemovePrettierIgnore() {
	return async (tree) => {
		visit(tree, "code", (node) => {
			node.value = node.value
				.replaceAll("<!-- prettier-ignore -->\n", "")
				.replaceAll("// prettier-ignore\n", "");
		});
	};
}

/**
 * Adds `data-metadata` to `<figure>` elements that contain a `<figcaption>`.
 * We use this to style elements within the `<figure>` differently if a `<figcaption>`
 * is present.
 */
function rehypeHandleMetadata() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === "element" && node?.tagName === "figure") {
				if (!("data-rehype-pretty-code-figure" in node.properties)) {
					return;
				}

				const preElement = node.children.at(-1);
				if (preElement && "tagName" in preElement && preElement.tagName !== "pre") {
					return;
				}

				const firstChild = node.children.at(0);

				if (firstChild && "tagName" in firstChild && firstChild.tagName === "figcaption") {
					node.properties["data-metadata"] = "";
					const lastChild = node.children.at(-1);
					if (lastChild && "properties" in lastChild) {
						lastChild.properties["data-metadata"] = "";
					}
				}
			}
		});
	};
}

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineMDSveXConfig({
	extensions: ['.md'],
	layout: {
		_: resolve(__dirname, "./src/lib/layouts/docs.svelte")
	},
	remarkPlugins: [...baseRemarkPlugins],
	rehypePlugins: [...baseRehypePlugins],
});
