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
		const newTimerId = setTimeout(() => (lastButtonId = ''), 2000);

		resetTimerId = newTimerId;
	};
</script>

<script lang="ts">
	/**
	 * Colourchip/ swatch based on CopyButton comonent:
	 * The `<CopyButton>` component is a button enabling quick copy to clipboard
	 * for specific content. The button has a copied state to indicate the copy
	 * was successful. The button will revert back to an uncopied state if
	 * another copy button is clicked or after several seconds.
	 *
	 * @component
	 */

	import { Button, classNames, randomId } from '@ldn-viz/ui';

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

		name: string;
		hex: string;
		value: string;
		type: string;
		description: string;
		size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

		[key: string]: any;
	}

	let {
		content,
		label = 'Copy',
		beforeCopy,
		afterCopy,
		name,
		hex,
		value,
		type,
		description,
		size,
		...rest
	}: Props = $props();

	const id = randomId();

	const copyToClipboard = async () => {
		// Firefox query permission does not work or is intentionally limited in
		// functionality. Instead, just check for clipboard in navigator and
		// log error if clipboard copy fails.
		if ('clipboard' in navigator) {
			doCopy(id, content);
		}
	};

	const sizeClasses = {
		xs: '!p-0.5 space-y-1 w-[82px]',
		sm: '!p-1 space-y-1',
		md: '!p-2 space-y-2',
		lg: '!p-2 space-y-2',
		xl: '!p-2 space-y-2'
	};

	const swatchClass = $derived(
		classNames(
			'text-left !items-stretch !no-underline hover:bg-color-action-background-primary-muted-hover',
			'border-color-ui-border-secondary bg-color-container-level-0 flex-col justify-between border shadow-sm',
			sizeClasses[size]
		)
	);

	const textSize = $derived(size === 'xs' ? 'text-xs' : 'text-sm');
</script>

<Button variant="text" onclick={copyToClipboard} class={swatchClass}>
	<div class="aspect-video" style:background-color={hex}></div>

	{#if size !== 'xs'}
		<div class={textSize}>
			<p class="text-color-text-secondary">{name}</p>
			{#if lastButtonId !== id}
				<p class="text-color-text-primary">{value}</p>
			{:else}
				<p class="text-color-action-primary-active">Copied!</p>
			{/if}
			{#if description}
				<p>Description: {description}</p>
			{/if}
		</div>
	{/if}

	{#if size === 'xs'}
		{@const trimmedName = name.split('-').pop()}
		<div class={textSize}>
			<p class="text-color-text-secondary">{trimmedName}</p>
			{#if lastButtonId !== id}
				<p class="text-color-text-primary">{value}</p>
			{:else}
				<p class="text-color-action-primary-active">Copied!</p>
			{/if}
		</div>
	{/if}
</Button>
