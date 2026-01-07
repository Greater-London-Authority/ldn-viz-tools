<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../../../../overlay/Overlay.svelte';
	import SidebarSectionTitle from './SidebarSectionTitle.svelte';

	/**
	 * The `<SidebarSectionTitle>` component is used to display a subtitle to subdivide a sidebar into sections.
	 * It is used by the `<SidebarSection>` component, which also groups together the content of a section in a `<div>`.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarSection/Section Title',
		component: SidebarSectionTitle,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<SidebarSectionTitle>Section Title</SidebarSectionTitle>
	{/snippet}
</Story>

<Story name="With Subtitle">
	{#snippet template()}
		<SidebarSectionTitle>
			Section Title
			{#snippet subTitle()}
				<p>Maecenas ut libero vel nibh maximus feugiat non sed tortor.</p>
			{/snippet}
		</SidebarSectionTitle>
	{/snippet}
</Story>

<Story name="With Hint">
	{#snippet template()}
		<SidebarSectionTitle>
			Section Title
			{#snippet hint()}
				<Overlay>
					<p class="mb-4">Any content you want can go here</p>
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</Overlay>
			{/snippet}
		</SidebarSectionTitle>
	{/snippet}
</Story>
