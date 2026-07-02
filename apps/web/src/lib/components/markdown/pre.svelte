<script lang="ts">
	import { CopyButton } from '@ldn-viz/ui';
	import { ClipboardDocumentCheck, DocumentDuplicate } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';

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
		class="pt-spacing-lg"
		{...restProps}
		{@attach (node) => {
			codeContent = node.textContent;
		}}>
{@render children?.()}
</pre>
</div>
