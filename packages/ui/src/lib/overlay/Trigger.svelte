<script lang="ts">
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';
	import Button from '../button/Button.svelte';
	import type { ButtonProps } from '../button/types.js';

	type Props = ButtonProps & {
		/**
		 * text that appears in the tooltip target, next to the icon
		 */
		hintLabel?: string;

		/**
		 * text size for the tooltip target
		 */
		size?: ButtonProps['size'];

		/**
		 * Determines how much visual emphasis is placed on the Trigger button.
		 */
		emphasis?: ButtonProps['emphasis'];

		/**
		 * Selects which family of styles should be applied to the Trigger button.
		 */
		variant?: ButtonProps['variant'];

		/**
		 * When true removes vertical padding and sets line height to 0 - useful for aligning buttons with text.
		 */
		slim?: ButtonProps['slim'];
		children?: Snippet;
	};

	let {
		hintLabel = 'More Info',
		size = 'xs',
		emphasis = 'muted',
		variant = 'text',
		slim = true,
		children,
		...restProps
	}: Props = $props();
</script>

<Button {size} {emphasis} {variant} {slim} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		{hintLabel}

		<Icon
			src={InformationCircle}
			theme="mini"
			class="ml-0.5 h-[18px] w-[18px]"
			aria-hidden="true"
		/>
	{/if}
</Button>
