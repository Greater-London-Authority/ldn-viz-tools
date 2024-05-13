<script>
	/**
	 * The `<SidebarFooter>` is used to create a footer at the bottom of a `<Sidebar`.
	 * @component
	 */
	import { classNames } from '../../../utils/classNames';

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';

	const lightThemeClasses = 'bg-core-grey-50 text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: footerClasses = classNames('mt-auto pt-4', ...themeClasses);
</script>

<footer class={footerClasses}>
	<!-- content to display above menu/links - typically a row of logos -->
	<slot />
	{#if $$slots.menu}
		<div class="border-t border-core-grey-600 pt-2 mt-4 text-sm">
			<!-- a menu/list of links -->
			<slot name="menu" />
		</div>
	{/if}
</footer>
