<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../../../overlay/Overlay.svelte';
	import Select from '../../../select/Select.svelte';
	import SidebarGroup from './SidebarGroup.svelte';
	import SidebarGroupTitle from './sidebarGroupTitle/SidebarGroupTitle.svelte';

	/**
	 * The `<SidebarGroup>` component groups a titled block of content within a `<SidebarSection>`.
	 * It accepts a title either as a plain string (rendered as a `<SidebarGroupTitle>`) or as a
	 * `title` snippet (typically a `<SidebarGroupTitle>` with a subtitle and/or hint).
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarGroup',
		component: SidebarGroup,
		tags: ['autodocs']
	});
</script>

{#snippet content()}
	<Select label="Boroughs" options={['one', 'two', 'three'].map((d) => ({ label: d, value: d }))} />
	<Select
		label="Data view options"
		options={['one', 'two', 'three'].map((d) => ({ label: d, value: d }))}
	/>
{/snippet}

<Story name="Default (string title)">
	{#snippet template()}
		<SidebarGroup title="Group Title">
			{@render content()}
		</SidebarGroup>
	{/snippet}
</Story>

<!-- Passing a `<SidebarGroupTitle>` as the `title` snippet exercises the `typeof title != 'string'` branch and allows a subtitle and hint. -->
<Story name="With SidebarGroupTitle snippet">
	{#snippet template()}
		<SidebarGroup>
			{#snippet title()}
				<SidebarGroupTitle>
					Pay attention to this group
					{#snippet subTitle()}Some additional explanation about this group.{/snippet}
					{#snippet hint()}<Overlay hintLabel="why">Because it's Awesome!</Overlay>{/snippet}
				</SidebarGroupTitle>
			{/snippet}

			{@render content()}
		</SidebarGroup>
	{/snippet}
</Story>

<!-- With no title, only the children are rendered (the `title=''` fallback). -->
<Story name="Content only (no title)">
	{#snippet template()}
		<SidebarGroup>
			{@render content()}
		</SidebarGroup>
	{/snippet}
</Story>
