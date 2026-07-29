<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../../../overlay/Overlay.svelte';
	import SidebarHeader from './SidebarHeader.svelte';

	/**
	 * The `<SidebarHeader>` creates a header at the top of a `<Sidebar>`.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarHeader',
		component: SidebarHeader,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<SidebarHeader {...args} title="Main sidebar title" />
	{/snippet}
</Story>

<Story name="No Brand">
	{#snippet template(args)}
		<SidebarHeader {...args} title="Main sidebar title" branded={false} />
	{/snippet}
</Story>

<Story name="With Sub-title">
	{#snippet template(args)}
		<SidebarHeader {...args} title="Main sidebar title">
			{#snippet subTitle()}
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			{/snippet}
		</SidebarHeader>
	{/snippet}
</Story>

<Story name="With Hint">
	{#snippet template(args)}
		<SidebarHeader {...args} title="Main sidebar title">
			{#snippet hint()}
				<Overlay
					overlayType="modal"
					modalTitle="About"
					modalDescription="This modal contains information about the application"
					modalWidth="5xl"
				>
					<p class="mb-4">Any content you want can go here</p>
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</Overlay>
			{/snippet}
		</SidebarHeader>
	{/snippet}
</Story>

<Story name="With Long Title">
	{#snippet template(args)}
		<SidebarHeader
			{...args}
			title="Main sidebar title which is<br /> unfortunately very long and so<br /> needs some breaks inserting"
		></SidebarHeader>
	{/snippet}
</Story>
