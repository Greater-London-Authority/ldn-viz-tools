<script lang="ts">
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { getContext } from 'svelte';

	import Button, { type ButtonProps } from '../button/Button.svelte';

	/**
	 * text that appears in the tooltip target, next to the icon
	 */
	export let hintLabel = 'what is this?';

	/**
	 * text size for the tooltip target
	 */
	export let size: ButtonProps['size'] = 'sm';

	/**
	 * Selects which family of styles should be applied to the Trigger button.
	 */
	export let variant: ButtonProps['variant'] = 'text';

	/**
	 * Determines how much visual emphasis is placed on the Trigger button.
	 */
	export let emphasis: ButtonProps['emphasis'] = 'secondary';

	const { customAction, actionProps } = getContext('triggerFuncs');
</script>

<Button {size} class={$$props.class} {variant} {emphasis} {customAction} {actionProps}>
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
