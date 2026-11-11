<script lang="ts">
	/**
	 * `MarkdownPre` is rendered instead of the `<pre>` HTML element in markdown processed by mdsvex.
	 * It adds a [CopyButton](./?path=/docs/ui-components-buttons-copybutton--documentation)
	 * that copies the text of the code block.
	 *
	 * Other props, such as the `class` and `style` that a syntax highlighter adds, are passed through to the `<pre>`.
	 * @component
	 */

	import { ClipboardDocumentCheck, DocumentDuplicate } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';
	import CopyButton from '../copyButton/CopyButton.svelte';

	let { children, ...restProps }: { children: Snippet } & Record<string, any> = $props();

	let codeContent = $state('');
</script>

<div class="group relative">
	<CopyButton content={codeContent} emphasis="secondary" class="absolute right-0" size="sm">
		{#snippet beforeCopy()}
			Copy
			<Icon src={DocumentDuplicate} theme="outline" class="ml-0.5 h-4 w-4" />
		{/snippet}

		{#snippet afterCopy()}
			Copied
			<Icon src={ClipboardDocumentCheck} theme="outline" class="ml-0.5 h-4 w-4" />
		{/snippet}
	</CopyButton>
	<pre
		class="body-sm"
		{...restProps}
		{@attach (node) => {
			codeContent = node.textContent ?? '';
		}}>{@render children?.()}</pre>
</div>
