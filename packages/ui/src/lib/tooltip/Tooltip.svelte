<script lang="ts">
	import { Tooltip, type TooltipTriggerProps } from 'bits-ui';
	import Button from '../button/Button.svelte';

	type Props = Tooltip.RootProps & {
		buttonText?: string;
		trigger?: Snippet<[TooltipTriggerProps]>;
	};

	let { buttonText = 'Hover for tooltip', trigger, children }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button {...props}>{buttonText}</Button>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Portal>
			<Tooltip.Content
				class="bg-color-container-level-0 border-color-ui-border-secondary z-50 max-w-[200px] border p-2 text-sm shadow-lg"
			>
				{@render children?.()}

				<Tooltip.Arrow class="text-color-ui-border-secondary" />
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
