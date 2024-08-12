<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import { currentThemeMode, userThemeSelectionStore } from './themeStore';
	import { prefersDarkMode } from '@ldn-viz/utils';

	$: $prefersDarkMode, applyTheme();
	$: $userThemeSelectionStore, applyTheme();

	const applyTheme = () => {
		if (browser) {
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
