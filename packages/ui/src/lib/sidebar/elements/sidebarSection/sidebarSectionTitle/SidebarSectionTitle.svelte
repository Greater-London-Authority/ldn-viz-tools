<script lang="ts">
	import { classNames } from '../../../../utils/classNames';
	import SidebarHint from '../../sidebarHint/SidebarHint.svelte';

	export let hintType: 'popover' | 'modal' | 'tooltip' | undefined = undefined;
	export let hintLabel: string | undefined = undefined;

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';
	const lightThemeClasses = 'bg-white text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: headerClasses = classNames(...themeClasses);
</script>

<header class={headerClasses}>
	<div class="flex justify-between items-end">
		<h1 class="font-bold text-base"><slot /></h1>

		{#if hintType}
			<SidebarHint {hintType} {hintLabel}>
				<slot name="hint" />
			</SidebarHint>
		{/if}
	</div>

	{#if $$slots.subTitle}
		<div class="text-sm">
			<slot name="subTitle" />
		</div>
	{/if}
</header>
