<script lang="ts">
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Button, { type ButtonProps } from '../button/Button.svelte';

	/**
	 * text that appears in the tooltip target, next to the icon
	 */
	export let hintLabel = 'what is this?';

	/**
	 * text size for the tooltip target
	 */
	export let hintSize: 'sm' | 'md' | 'lg' | undefined = undefined;

	/**
	 * Selects which family of styles should be applied to the Trigger button.
	 */
	export let variant: ButtonProps['variant'] = 'text';

	/**
	 * Determines how much visual emphasis is placed on the Trigger button.
	 */
	export let emphasis: ButtonProps['emphasis'] = 'secondary';

	/**
	 * MeltUI action passed down from MultipleActionButton, Popover, Tooltip for use in `Button`.
	 */
	export let customAction: ButtonProps['customAction'];

	/**
	 * MeltUI action props passed down from MultipleActionButton, Popover, Tooltip, which include ARIA attributes and tabindex.
	 */
	export let actionProps;
</script>

<Button size={hintSize} class={$$props.class} {variant} {emphasis} {customAction} {actionProps}>
	{#if $$slots.hint}
		<!-- if present, replaces the default `hintLabel` and icon  -->
		<slot name="hint" />
	{:else}
		{hintLabel}

		<Icon
			src={InformationCircle}
			theme="mini"
			class="w-[18px] h-[18px] ml-0.5"
			aria-hidden="true"
		/>
	{/if}
</Button>
