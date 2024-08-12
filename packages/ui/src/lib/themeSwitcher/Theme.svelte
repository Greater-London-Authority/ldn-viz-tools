<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { onMount } from 'svelte';

	import { prefersDarkMode } from '../userPreference/mediaQueryStore';
	import { currentThemeMode, userThemeSelectionStore } from './themeStore';

	$: $prefersDarkMode, applyTheme();
	$: $userThemeSelectionStore, applyTheme();

	const applyTheme = () => {
		if (BROWSER) {
			document.documentElement.classList.toggle(
				'dark',
				$currentThemeMode === 'dark' ? true : false
			);
		}
		/*global globalThis*/
		globalThis.localStorage?.setItem('theme', $userThemeSelectionStore);
	};

	onMount(() => {
		applyTheme();
	});
</script>

<!-- Prevent FOUC (Flash of Unstyled Content) -->
<svelte:head>
	<script>
		var userPref = globalThis.localStorage?.getItem('theme');
		document.documentElement.classList.toggle('dark', userPref === 'dark' ? true : false);
	</script>
</svelte:head>
