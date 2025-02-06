<script lang="ts">
	/**
	 * The `<ThemeSwitcher>` component provides a select for the current theme - light, dark or system.
	 *
	 * **Important**: Requires the inclusion of the sibling "Theme" component. This should be implemented in the top level Layout component of the app. The theme switcher can then live at any level(s)
	 *
	 * @component
	 */
	import { Button } from '@ldn-viz/ui';
	import { createDropdownMenu } from '@melt-ui/svelte';
	import { Moon, Sun } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { currentThemeMode, userThemeSelectionStore } from './themeStore';
	type Theme = 'light' | 'dark' | 'system';

	const themes: Theme[] = ['light', 'dark', 'system'];

	const onChange = (e: { value: string }) => {
		const value = e.value as Theme;
		$userThemeSelectionStore = value;
	};

	const menuItems = themes.map((theme) => ({ value: theme, label: theme }));

	$: themeIcon = $currentThemeMode === 'light' ? Sun : Moon;

	const {
		elements: { menu, item, trigger, arrow }
	} = createDropdownMenu();

	const highlightedClasses =
		'bg-color-input-background-active text-color-static-white py-1 px-2 cursor-pointer';
	const nonHighlightedClasses =
		'text-color-input-valueText hover:bg-color-input-background-hover py-1 px-2 cursor-pointer';
</script>

<div class="inline-flex">
	<div use:trigger>
		<Button
			{...$trigger}
			class={`text-color-text-primary rounded-full !p-1`}
			variant="solid"
			emphasis="secondary"
			size="sm"
		>
			<Icon src={themeIcon} theme="mini" class="w-4 h-4" aria-hidden="true" />
			<span class="sr-only">Theme Switch</span>
		</Button>
	</div>
	<div {...$menu} use:menu class="bg-color-input-background capitalize shadow pt-2 z-40">
		{#each menuItems as menuItem}
			<div
				{...$item}
				use:item
				on:m-click={() => onChange({ value: menuItem.value })}
				class={menuItem.value === $userThemeSelectionStore
					? highlightedClasses
					: nonHighlightedClasses}
			>
				{menuItem.label}
			</div>
		{/each}
		<div {...$arrow} use:arrow />
	</div>
</div>
