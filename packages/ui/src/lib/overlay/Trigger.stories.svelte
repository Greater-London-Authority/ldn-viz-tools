<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Trigger from './Trigger.svelte';

	/**
	 * The `<Trigger>` component is the default button used to open an [Overlay](./?path=/docs/ui-components-overlays-overlay--documentation)
	 * (tooltip, popover or modal).
	 * It is a thin wrapper around [Button](?path=/docs/ui-components-buttons-button--documentation) that adds a hint label and an information icon.
	 *
	 **/
	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Trigger',
		component: Trigger,
		tags: ['autodocs']
	});

	const variants = ['solid', 'outline', 'text'] as const;
	const emphases = ['primary', 'secondary'] as const;
	const sizes = ['xs', 'sm', 'md', 'lg'] as const;
</script>

<Story name="Default">
	{#snippet template(args)}
		<Trigger {...args} />
	{/snippet}
</Story>

<!--
There are many variations, but typically teh variant is `trxt` and the size is `xs`.
-->
<Story name="Emphasis variations">
	{#snippet template()}
		<div class="space-y-8">
			{#each variants as variant}
				<div class="space-y-2">
					<p class="font-bold capitalize">{variant}</p>
					{#each emphases as emphasis}
						<div class="flex flex-wrap items-center gap-4">
							<span class="text-color-text-secondary w-24 text-sm capitalize">{emphasis}</span>
							{#each sizes as size}
								<Trigger {variant} {emphasis} {size} slim={false} hintLabel={size} />
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/snippet}
</Story>
