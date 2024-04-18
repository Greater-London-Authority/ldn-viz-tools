<script lang="ts" context="module">
	type SidebarHeaderBrandClass = {
		[key: string]: string;
	};

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';

	const lightThemeClasses = 'bg-core-grey-50 text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	const brandClasses: SidebarHeaderBrandClass = {
		true: 'pl-2 border-l-[5px] border-core-blue-500',
		false: ''
	};
</script>

<script lang="ts">
	import { classNames } from '../../../utils/classNames';

	export let title: string;
	export let branded: 'true' | 'false' = 'true';

	$: headerClasses = classNames('py-1', ...themeClasses, brandClasses[branded]);
</script>

<header class={headerClasses}>
	<div class="flex justify-between items-end">
		<h1 class="text-xl font-bold">{@html title}</h1>

		{#if $$slots.hint}
			<slot name="hint" />
		{/if}
	</div>

	{#if $$slots.subTitle}
		<div class="text-sm pt-1">
			<slot name="subTitle" />
		</div>
	{/if}
</header>
