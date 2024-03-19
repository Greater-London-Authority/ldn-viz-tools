<script lang="ts">
	import { classNames } from '../../../utils/classNames';
	import SidebarSectionTitle from './sidebarSectionTitle/SidebarSectionTitle.svelte';

	export let title = '';

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';
	const lightThemeClasses = 'bg-white text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: sectionClasses = classNames(
		'border-b border-core-grey-600 space-y-2 pb-2 text-sm',
		...themeClasses
	);
</script>

<section>
	<div class={sectionClasses}>
		<SidebarSectionTitle>{title}</SidebarSectionTitle>
		<slot />
	</div>
</section>
