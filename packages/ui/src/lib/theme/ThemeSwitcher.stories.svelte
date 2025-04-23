<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Theme from './Theme.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Themes/ThemeSwitcher',
		component: ThemeSwitcher
	});
</script>

<Story name="Default">
	<Theme />
	<ThemeSwitcher />
</Story>
