<script lang="ts" context="module">
	import { get, writable } from 'svelte/store';

	export type CopyContent = string; //Exclude<undefined, null>
	type TimerId = ReturnType<typeof setTimeout>;

	const lastButtonId = writable('');
	const resetTimerId = writable<null | TimerId>(null);

	const doCopy = (id: string, content: string) => {
		navigator.clipboard
			.writeText(content)
			.then(() => onCopy(id))
			.catch(console.error);
	};

	const onCopy = (id: string) => {
		lastButtonId.set(id);

		const currTimerId = get(resetTimerId) as TimerId;
		clearTimeout(currTimerId);
		const newTimerId = setTimeout(() => lastButtonId.set(''), 4000);

		resetTimerId.set(newTimerId);
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
	import { randomId } from '../utils/randomId';

	/**
	 * The content to copy. Due to browser compatibility, only text is currently
	 * allowed.
	 */
	export let content: CopyContent;

	/**
	 * Button text when default slot content is used.
	 */
	export let label = 'Copy';

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

<Button {...$$restProps} on:click={copyToClipboard}>
	{#if $lastButtonId !== id}
		<!-- Button text and icon before copy. -->
		<slot name="before-copy">
			{label}
			<Icon src={DocumentDuplicate} class="w-5 h-5 ml-2" />
		</slot>
	{:else}
		<!-- Button text and icon after copy. -->
		<slot name="after-copy">
			{label}
			<Icon src={ClipboardDocumentCheck} class="w-5 h-5 ml-2" />
		</slot>
	{/if}
</Button>
