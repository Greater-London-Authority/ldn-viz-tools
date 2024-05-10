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
	/**
	 * The `<SidebarHeader>` creates a header at the top of a `<Sidebar>`.
	 * @component
	 */
	import { classNames } from '../../../utils/classNames';

	/**
	 * The title to display in the header.
	 */
	export let title: string;

	/**
	 * If `true`, then a blue ribbon is added to the left of the title.
	 */
	export let branded: 'true' | 'false' = 'true';

	$: headerClasses = classNames('py-1', ...themeClasses, brandClasses[branded]);
</script>

<header class={headerClasses}>
	<div class="flex justify-between items-end">
		<h1 class="text-xl font-bold">{@html title}</h1>

		{#if $$slots.hint}
			<!-- Help text to display when user clicks on "More info". -->
			<slot name="hint" />
		{/if}
	</div>

	{#if $$slots.subTitle}
		<div class="text-sm pt-1">
			<!-- Optional longer subtitle to display below the main title. -->
			<slot name="subTitle" />
		</div>
	{/if}
</header>
