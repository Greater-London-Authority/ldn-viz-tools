<script lang="ts">
	import { classNames } from '../../../../utils/classNames';
	import SidebarHint from '../../sidebarHint/SidebarHint.svelte';

	export let hintType: 'popover' | 'modal' | 'tooltip' | undefined = undefined;
	export let hintLabel: string | undefined = undefined;

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';
	const lightThemeClasses = 'bg-white text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: groupTitleClasses = classNames('flex justify-between items-end', ...themeClasses);
</script>

<div class={groupTitleClasses}>
	<h3 class="font-bold text-sm"><slot /></h3>

	{#if hintType}
		<SidebarHint {hintType} {hintLabel}>
			<slot name="hint" />
		</SidebarHint>
	{/if}
</div>
