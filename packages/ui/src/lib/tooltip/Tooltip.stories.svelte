<script module lang="ts">
	import { Cog6Tooth } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Trigger from '../overlay/Trigger.svelte';
	import Tooltip from './Tooltip.svelte';
	/**
	 * The `Tooltip` component displays explanatory text next to a trigger element when the user hovers over (or focuses) it, built on top of the `bits-ui` `Tooltip` primitive.
	 *
	 * **Alternatives**: if the content needs to remain visible while the user interacts with it (e.g. to click a link), or should open when the trigger is clicked rather than hovered, use a [Popover](./?path=/docs/ui-components-overlays-popover--documentation) instead.
	 * To display content in a dialog that overlays the rest of the page, use a [Modal](./?path=/docs/ui-components-overlays-modal--documentation) instead.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Tooltip',
		component: Tooltip,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let open = $state(false);
</script>

<Story name="Default">
	{#snippet template(args)}
		<Tooltip {...args}>The contents of the Tooltip...</Tooltip>
	{/snippet}
</Story>

<Story name="Custom size">
	{#snippet template(args)}
		<Tooltip {...args}>
			{#snippet trigger(props)}
				<Trigger {...props} size="lg" />
			{/snippet}
			The contents of the Tooltip...
		</Tooltip>
	{/snippet}
</Story>

<Story name="Custom hint label">
	{#snippet template(args)}
		<Tooltip {...args} hintLabel="I'm a little tooltip">The contents of the Tooltip...</Tooltip>
	{/snippet}
</Story>

<Story name="Custom hint icon">
	{#snippet template(args)}
		<Tooltip {...args}>
			{#snippet trigger(props)}
				<Trigger {...props}>
					I have a different icon
					<Icon src={Cog6Tooth} theme="mini" class="ml-0.5 h-[18px] w-[18px]" aria-hidden="true" />
				</Trigger>
			{/snippet}
			The contents of the Tooltip...
		</Tooltip>
	{/snippet}
</Story>

<Story name="Custom trigger">
	{#snippet template(args)}
		<Tooltip {...args}>
			{#snippet trigger(props)}
				<Button {...props}>
					I have a different trigger component
					<Icon src={Cog6Tooth} theme="mini" class="ml-0.5 h-[18px] w-[18px]" aria-hidden="true" />
				</Button>
			{/snippet}
			The contents of the Tooltip...
		</Tooltip>
	{/snippet}
</Story>

<!--
Setting the `disableHoverableContent` prop to `false` allows the user to move
the cursor from the tooltip trigger to its content with it closing.
-->
<Story name="Enabling hovering over tooltip contents">
	{#snippet template(args)}
		<Tooltip {...args} disableHoverableContent={false}>The contents of the Tooltip...</Tooltip>
	{/snippet}
</Story>

<!--
The `open` prop is `$bindable`, so the tooltip can be opened and closed
programmatically from outside the component.
-->
<Story name="Controlled open state">
	{#snippet template(args)}
		<div class="flex flex-col gap-4">
			<div class="flex gap-2">
				<Button onclick={() => (open = true)}>Open</Button>
				<Button onclick={() => (open = false)}>Close</Button>
			</div>
			<Tooltip {...args} bind:open>The contents of the Tooltip...</Tooltip>
		</div>
	{/snippet}
</Story>

<!--
Tooltip content is capped at `max-w-[200px]`; long text wraps onto multiple lines
within that constraint.
-->
<Story name="Long content wrapping">
	{#snippet template(args)}
		<Tooltip {...args}>
			This is a much longer tooltip. Because the content is capped at a maximum width of 200 pixels,
			the text wraps onto several lines instead of stretching across the whole screen.
		</Tooltip>
	{/snippet}
</Story>
