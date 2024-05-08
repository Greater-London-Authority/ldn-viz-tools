<script lang="ts">
	/**
	 * The `<TabList>` component allows users to select a tab from a list of options.
	 *
	 * **Alternatives**: if the user's choice doesn't replace what is rendered below (or, for vertical tabs, to the side of) the control then use the [RadioButton](./?path=/docs/ui-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-radiobuttongroup--documentation) or [RadioButtonSolid](./?path=/docs/ui-radiobuttongroupsolid--documentation).
	 * @component
	 */

	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	/**
	 * `id` of the currently selected tab
	 */
	export let selectedValue: string | undefined = undefined;

	/**
	 * orientation of the list of tabs
	 */
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';

	const val: Writable<string | undefined> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));
	setContext('tabContext', {
		selectedValue: val,
		orientation
	});

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';
	const lightThemeClasses = 'bg-white text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	const orientationClasses = {
		vertical: 'flex-col w-20 space-y-0.5 pb-0.5',
		horizontal: 'flex border-b-4 border-b-core-blue-600 w-full pt-5 pb-0 space-x-0.5 items-end'
	};

	$: tabListClasses = classNames(...themeClasses, orientationClasses[orientation], $$props.class);
</script>

<div class={tabListClasses} role="tablist">
	<!-- should contain a series of `<TabLabel>` components  -->
	<slot />
</div>
