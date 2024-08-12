<script lang="ts">
	/**
	 * The `<ThemeSwitcher>` component provides a select for the current theme - light, dark or system.
	 *
	 * **WIP**: Currently uses a select component pending ui design review
	 *
	 * **Important**: Requires the inclusion of the sibling "Theme" component. This should be implemented in the top level Layout component of the app. The theme switcher can then live at any level(s)
	 *
	 * @component
	 */
	import { userThemeSelectionStore } from './themeStore';
	import { Select } from '@ldn-viz/ui';
	type Theme = 'light' | 'dark' | 'system';

	const themes: Theme[] = ['light', 'dark', 'system'];

	const onChange = (e: { detail: { [key: string]: string } }) => {
		const value = e.detail.value as Theme;
		$userThemeSelectionStore = value;
	};

	const items = themes.map((theme) => ({ value: theme, label: theme }));
	const initialItem = $userThemeSelectionStore;
</script>

<Select {items} value={initialItem} on:change={onChange} id="theme-switch" label="Theme" />
