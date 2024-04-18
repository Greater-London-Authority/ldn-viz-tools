<script lang="ts">
	import { classNames } from '../../../../utils/classNames';

	const darkThemeClasses = 'dark:text-white';
	const lightThemeClasses = 'text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: headerClasses = classNames(...themeClasses);
</script>

<header class={headerClasses}>
	<div class="flex justify-between items-end">
		<h1 class="font-bold text-base"><slot /></h1>

		{#if $$slots.hint}
			<slot name="hint" />
		{/if}
	</div>

	{#if $$slots.subTitle}
		<div class="text-sm">
			<slot name="subTitle" />
		</div>
	{/if}
</header>
