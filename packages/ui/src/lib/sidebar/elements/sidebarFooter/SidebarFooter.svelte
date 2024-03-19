<script>
	import { classNames } from '../../../utils/classNames';

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';

	const lightThemeClasses = 'bg-white text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: footerClasses = classNames('mt-auto pt-4', ...themeClasses);
</script>

<footer class={footerClasses}>
	<slot />
	{#if $$slots.menu}
		<div class="border-t border-core-grey-600 pt-2 mt-4 text-sm">
			<slot name="menu" />
		</div>
	{/if}
</footer>
