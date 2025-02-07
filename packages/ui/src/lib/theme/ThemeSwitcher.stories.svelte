<script context="module">
	import Theme from './Theme.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	export const meta = {
		title: 'Ui - App Layout/Themes/ThemeSwitcher',
		component: ThemeSwitcher
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Theme />
	<ThemeSwitcher {...args} />
</Template>

<Story name="Default" source />
