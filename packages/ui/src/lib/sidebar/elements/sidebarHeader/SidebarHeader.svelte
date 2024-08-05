<script lang="ts" context="module">
	type SidebarHeaderBrandClass = {
		[key: string]: string;
	};

	const brandClasses: SidebarHeaderBrandClass = {
		true: 'pl-2 border-l-[5px] border-color-static-brand',
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

	$: headerClasses = classNames(
		'py-1 bg-color-container-level-1 text-color-text-primary',
		brandClasses[branded]
	);
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
