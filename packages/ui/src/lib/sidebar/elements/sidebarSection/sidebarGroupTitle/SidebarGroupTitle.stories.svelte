<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../../../../overlay/Overlay.svelte';
	import SidebarGroupTitle from './SidebarGroupTitle.svelte';

	/**
	 * The `<SidebarGroupTitle>` component is used to display a subtitle to subdivide a `<SidebarSection>`.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarSection/Group Title',
		component: SidebarGroupTitle,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<SidebarGroupTitle>Group Title</SidebarGroupTitle>
	{/snippet}
</Story>

<Story name="With Subtitle">
	{#snippet template()}
		<SidebarGroupTitle>
			Section Title
			{#snippet subTitle()}
				<p>Maecenas ut libero vel nibh maximus feugiat non sed tortor.</p>
			{/snippet}
		</SidebarGroupTitle>
	{/snippet}
</Story>

<Story name="With Hint">
	{#snippet template()}
		<SidebarGroupTitle>
			Group Title
			{#snippet hint()}
				<Overlay>
					<p class="mb-4">Any content you want can go here</p>
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</Overlay>
			{/snippet}
		</SidebarGroupTitle>
	{/snippet}
</Story>
