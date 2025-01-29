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
	 * MeltUI action passed down from MultipleActionButton, Popover, Tooltip for use in `Button`.
	 */
	export let customAction: ButtonProps['customAction'];

	/**
	 * MeltUI action props passed down from MultipleActionButton, Popover, Tooltip, which include ARIA attributes and tabindex.
	 */
	export let actionProps;
</script>

<Button
	variant="text"
	size={hintSize}
	class="!p-0"
	emphasis="secondary"
	{customAction}
	{actionProps}
>
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
