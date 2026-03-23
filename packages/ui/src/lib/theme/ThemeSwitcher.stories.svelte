<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	/**
	 * The `<ThemeSwitcher>` component provides a select for the current theme - light, dark or system.
	 *
	 * **Important**: Requires the inclusion of the sibling "Theme" component. This should be implemented in the top level Layout component of the app. The theme switcher can then live at any level(s)
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Theme Switcher',
		component: ThemeSwitcher,
		tags: ['autodocs'],
		render: defaultTemplate
	});
</script>

{#snippet defaultTemplate(args: { [key: string]: any })}
	<ThemeSwitcher {...args} />
{/snippet}

<Story name="Default" />

<Story name="With size" args={{ size: 'xs' }} />
