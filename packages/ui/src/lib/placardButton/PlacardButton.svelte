<script lang="ts">
	/**
	 * The `<PlacardButton>` component creates a call-to-action link that includes a title and description.
	 *
	 * **Alternatives**: if the button does not need to be as visually prominent or include a description, consider using the [Button](./?path=/docs/ui-components-buttons-button--documentation) component with the `href` prop.
	 * @component
	 */

	import { ArrowRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { type Snippet } from 'svelte';

	interface Props {
		/**
		 * The target of the link.
		 */
		href?: string;
		/**
		 * If `true`, then the target of the link will open in a new browser tab or window.
		 */
		newWindow?: boolean;
		title?: Snippet;
		body?: Snippet;
		footer?: Snippet;
		icon?: Snippet;
	}

	let { href = '', newWindow = false, title, body, footer, icon }: Props = $props();
</script>

<a
	{href}
	target={newWindow ? '_blank' : '_self'}
	rel={newWindow ? 'noopener noreferrer' : ''}
	class="bg-color-action-secondary-muted hover:bg-color-action-secondary-muted-hover text-color-text-primary group flex h-full flex-col transition"
>
	<div class="h-full space-y-2 p-4">
		{#if title}
			<p class="text-2xl font-bold">
				<!-- Title text, displayed at top of card in large font-->
				{@render title?.()}
			</p>
		{/if}

		{#if body}
			<p class="text-color-text-primary prose h-full leading-snug">
				<!-- longer description text displayed below the title in smaller font -->
				{@render body?.()}
			</p>
		{/if}
	</div>
	<div
		class="bg-color-action-background-secondary-muted group-hover:bg-color-action-secondary-muted-active mt-4 flex justify-between px-4 py-2 transition"
	>
		<!-- text displayed at bottom of button, vertically aligned with icon-->
		{@render footer?.()}

		<!-- icon positioned at bottom-right of button (defaults to `ArrowRight`) -->
		{#if icon}
			{@render icon()}
		{:else}
			<Icon src={ArrowRight} theme="solid" class="h-6 w-6" aria-hidden="true" />
		{/if}
	</div>
</a>
