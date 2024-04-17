<script lang="ts">
	import { classNames } from '../../../../utils/classNames';

	const darkThemeClasses = 'dark:text-white';
	const lightThemeClasses = 'text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: groupTitleClasses = classNames('flex justify-between items-end', ...themeClasses);
</script>

<div class={groupTitleClasses}>
	<h3 class="font-bold text-sm"><slot /></h3>

	{#if $$slots.hint}
		<slot name="hint" />
	{/if}
</div>
