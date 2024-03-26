<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	export let selectedValue: string | undefined = undefined;
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
	<slot />
</div>
