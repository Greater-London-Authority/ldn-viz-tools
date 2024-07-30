<script lang="ts">
	/**
	 * The `<SidebarSectionTitle>` component is used to display a subtitle to sub-divide a sidebar into sections.
	 * It is used by the `<SidebarSection>` component, which also groups together the content of a section in a `<div>`.
	 * @component
	 */

	import { classNames } from '../../../../utils/classNames';

	const darkThemeClasses = 'dark:text-white';
	const lightThemeClasses = 'text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: headerClasses = classNames(...themeClasses);
</script>

<header class={headerClasses}>
	<div class="flex justify-between items-end">
		<h1 class="font-semibold text-base leading-snug">
			<!-- The title of the section. -->
			<slot />
		</h1>

		{#if $$slots.hint}
			<!-- An optional `<SidebarHint>` component to provide additional explanation. -->
			<slot name="hint" />
		{/if}
	</div>

	{#if $$slots.subTitle}
		<div class="text-xs leading-snug mb-2">
			<!-- Optional longer subtitle to display below the main title. -->
			<slot name="subTitle" />
		</div>
	{/if}
</header>
