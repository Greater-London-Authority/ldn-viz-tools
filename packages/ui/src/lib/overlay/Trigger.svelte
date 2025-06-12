<script lang="ts">
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../button/Button.svelte';
	import type { ButtonProps } from '../button/types.js';

	type Props = ButtonProps & {
		/**
		 * text that appears in the tooltip target, next to the icon
		 */
		hintLabel?: string;
	};

	let { hintLabel = 'More Info', children }: Props = $props();
</script>

<Button>
	{hintLabel}
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
