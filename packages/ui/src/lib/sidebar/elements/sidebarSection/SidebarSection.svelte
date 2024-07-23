<script lang="ts">
	/**
	 * The `<SidebarSection>` component is used to group together a 'section' of content within a `<Sidebar>`.
	 * As well as accepting a section title as a prop (which it displays as a `<SidebarSectionTitle>`), it accepts the section content as a slot.
	 * @component
	 */
	import { classNames } from '../../../utils/classNames';
	import SidebarSectionTitle from './sidebarSectionTitle/SidebarSectionTitle.svelte';

	/**
	 * The title of this section. Note tat rather than supplying a title, you can supply a `<SidebarSectionTitle>` component in the `title` slot.
	 */
	export let title = '';

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';
	const lightThemeClasses = 'bg-core-grey-50 text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: sectionClasses = classNames(
		'border-b border-core-grey-600 space-y-2 pb-2 text-sm',
		...themeClasses
	);
</script>

<section>
	<div class={sectionClasses}>
		{#if $$slots.title}
			<!-- An optional `<SidebarSectionTitle>` component, which can accept a subtitle. -->
			<slot name="title" />
		{:else}
			<SidebarSectionTitle>{title}</SidebarSectionTitle>
		{/if}

		<!-- The content to be displayed inside this section. -->
		<slot />
	</div>
</section>
