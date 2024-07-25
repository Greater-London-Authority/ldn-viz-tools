<script lang="ts">
	/**
	 * The `<SidebarGroupTitle>` component is used to display a subtitle to sub-divide a `<SidebarSection>`.
	 * @component
	 */

	import { classNames } from '../../../../utils/classNames';

	const darkThemeClasses = 'dark:text-white';
	const lightThemeClasses = 'text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: groupTitleClasses = classNames('flex justify-between items-end', ...themeClasses);
</script>

<div class={groupTitleClasses}>
	<h3 class="font-semibold text-sm leading-snug">
		<!-- The title. -->
		<slot />
	</h3>

	{#if $$slots.hint}
		<!-- An optional `<SidebarHint>` component to provide additional explanation. -->
		<slot name="hint" />
	{/if}
</div>
