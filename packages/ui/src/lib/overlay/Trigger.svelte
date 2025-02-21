<script lang="ts">
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { getContext } from 'svelte';

	import Button, { type ButtonProps } from '../button/Button.svelte';

	/**
	 * text that appears in the tooltip target, next to the icon
	 */
	export let hintLabel = 'More Info';

	/**
	 * Label for use by screen readers.
	 */
	export let ariaLabel = '';

	/**
	 * text size for the tooltip target
	 */
	export let size: ButtonProps['size'] = 'sm';

	/**
	 * When true removes vertical padding and sets line height to 0 - useful for aligning buttons with text.
	 */
	export let slim: ButtonProps['slim'] = true;

	/**
	 * Selects which family of styles should be applied to the Trigger button.
	 */
	export let variant: ButtonProps['variant'] = 'text';

	/**
	 * Determines how much visual emphasis is placed on the Trigger button.
	 */
	export let emphasis: ButtonProps['emphasis'] = 'secondary';

	interface TriggerFuncs {
		action: (node: HTMLElement) => void;
		actionProps: { [key: string]: any };
	}

	const { action, actionProps } = getContext<TriggerFuncs>('triggerFuncs');
</script>

<Button {size} class={$$props.class} {variant} {emphasis} {slim} {ariaLabel} {action} {actionProps}>
	<slot>
		{hintLabel}

		<Icon
			src={InformationCircle}
			theme="mini"
			class="w-[18px] h-[18px] ml-0.5"
			aria-hidden="true"
		/>
	</slot>
</Button>
