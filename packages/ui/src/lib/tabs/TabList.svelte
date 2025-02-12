<script lang="ts">
	/**
	 * The `<TabList>` component allows users to select a tab from a list of options.
	 *
	 * **Alternatives**: if the user's choice doesn't replace what is rendered below (or, for vertical tabs, to the side of) the control then use the [RadioButton](./?path=/docs/uicomponents-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) or [RadioButtonSolid](.-components-radiobuttons-radiobuttongroupsolid--documentation).
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

	/**
	 * Enables screen reader to describe purpose of tab list. Required.
	 */
	export let ariaLabel: string = '';

	const val: Writable<string | undefined> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));
	setContext('tabContext', {
		selectedValue: val,
		orientation
	});

	const respondToExternalChange = (newVal: string | undefined) => {
		if ($val !== newVal) {
			$val = newVal;
		}
	};
	$: respondToExternalChange(selectedValue);

	const orientationClasses = {
		vertical: 'flex-col w-20 space-y-0.5 pb-0.5',
		horizontal: 'flex border-b-4 border-b-color-ui-primary w-full pt-5 pb-0 space-x-0.5 items-end'
	};

	$: tabListClasses = classNames(
		'bg-color-container-level-0 text-color-text-primary',
		orientationClasses[orientation],
		$$props.class
	);
</script>

<div class={tabListClasses} role="tablist" aria-label={ariaLabel} aria-orientation={orientation}>
	<!-- should contain a series of `<TabLabel>` components  -->
	<slot />
</div>
