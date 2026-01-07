<script lang="ts" module>
	export type CopyContent = string; //Exclude<undefined, null>
	type TimerId = ReturnType<typeof setTimeout>;

	let lastButtonId = $state('');
	let resetTimerId = $state<null | TimerId>(null);

	const doCopy = (id: string, content: string) => {
		navigator.clipboard
			.writeText(content)
			.then(() => onCopy(id))
			.catch(console.error);
	};

	const onCopy = (id: string) => {
		lastButtonId = id;

		const currTimerId = resetTimerId as TimerId;
		clearTimeout(currTimerId);
		const newTimerId = setTimeout(() => (lastButtonId = ''), 4000);

		resetTimerId = newTimerId;
	};
</script>

<script lang="ts">
	/**
	 * The `<CopyButton>` component is a button enabling quick copy to clipboard
	 * for specific content. The button has a copied state to indicate the copy
	 * was successful. The button will revert back to an uncopied state if
	 * another copy button is clicked or after several seconds.
	 *
	 * @component
	 */

	import { ClipboardDocumentCheck, DocumentDuplicate } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../button/Button.svelte';
	import { randomId } from '../utils/randomId.js';

	interface Props {
		/**
		 * The content to copy. Due to browser compatibility, only text is currently
		 * allowed.
		 */
		content: CopyContent;
		/**
		 * Button text when default slot content is used.
		 */
		label?: string;
		beforeCopy?: import('svelte').Snippet;
		afterCopy?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { content, label = 'Copy', beforeCopy, afterCopy, ...rest }: Props = $props();

	const id = randomId();

	const copyToClipboard = async () => {
		// Firefox query permission does not work or is intentionally limited in
		// functionality. Instead, just check for clipboard in navigator and
		// log error if clipboard copy fails.
		if ('clipboard' in navigator) {
			doCopy(id, content);
		}
	};
</script>

<Button {...rest} onclick={copyToClipboard}>
	{#if lastButtonId !== id}
		<!-- Button text and icon before copy. -->
		{#if beforeCopy}{@render beforeCopy()}{:else}
			{label}
			<Icon src={DocumentDuplicate} class="ml-2 h-5 w-5" />
		{/if}
	{:else}
		<!-- Button text and icon after copy. -->
		{#if afterCopy}{@render afterCopy()}{:else}
			{label}
			<Icon src={ClipboardDocumentCheck} class="ml-2 h-5 w-5" />
		{/if}
	{/if}
</Button>
