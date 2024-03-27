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
	import SidebarHint from '../sidebarHint/SidebarHint.svelte';

	export let title: string;
	export let branded: 'true' | 'false' = 'true';
	export let hintType: 'popover' | 'modal' | 'tooltip' | undefined = undefined;
	export let hintLabel: string | undefined = undefined;

	$: headerClasses = classNames('py-1', ...themeClasses, brandClasses[branded]);
</script>

<header class={headerClasses}>
	<div class="flex justify-between items-end">
		<h1 class="text-xl font-bold">{title}</h1>

		{#if hintType}
			<SidebarHint {hintType} {hintLabel}>
				<slot name="hint" />
			</SidebarHint>
		{/if}
	</div>

	{#if $$slots.subTitle}
		<div class="text-sm pt-1">
			<slot name="subTitle" />
		</div>
	{/if}
</header>
