<script lang="ts">
	import type { Snippet } from 'svelte';
	import Overlay from '../overlay/Overlay.svelte';
	import { classNames } from '../utils/classNames';

	interface CardProps {
		title?: string;
		label?: string;
		status: keyof typeof statusClasses;
		overlayContent?: Snippet;
		children: Snippet;
	}

	let { title, label, status = 'default', overlayContent, children }: CardProps = $props();

	const statusClasses = {
		default: 'bg-color-container-level-0 border-color-ui-border-secondary ',
		notice: 'bg-color-ui-background-notice border-color-ui-border-notice',
		positive: 'bg-color-ui-background-positive border-color-ui-border-positive',
		caution: 'bg-color-ui-background-caution border-color-ui-border-caution',
		negative: 'bg-color-ui-background-negative border-color-ui-border-negative'
	};

	let cardClasses: string = $derived(
		classNames(
			statusClasses[status],
			'relative flex h-full flex-col justify-between border border-color-ui-border-secondary bg-color-container-level-0 p-4 shadow-sm'
		)
	);
</script>

<div class={cardClasses}>
	<div class="flex items-center justify-between">
		<div class="mb-typography-spacing-xs flex flex-col space-y-typography-spacing-xxs">
			{#if label}
				<h3 class="product label-md responsive text-color-text-secondary">
					{label}
				</h3>
			{/if}

			{#if title}
				<h3 class="product title-md responsive">{title}</h3>
			{/if}
		</div>

		<div class="absolute right-1 top-1">
			<Overlay>
				{@render overlayContent?.()}
			</Overlay>
		</div>
	</div>
	{@render children?.()}
</div>
