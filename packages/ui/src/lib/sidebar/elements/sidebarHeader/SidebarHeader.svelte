<script lang="ts" module>
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

	interface Props {
		/**
		 * The title to display in the header.
		 */
		title: string;
		/**
		 * If `true`, then a blue ribbon is added to the left of the title.
		 */
		branded?: 'true' | 'false';
		hint?: import('svelte').Snippet;
		subTitle?: import('svelte').Snippet;
	}

	let { title, branded = 'true', hint, subTitle }: Props = $props();

	let headerClasses = $derived(
		classNames('py-1 bg-color-container-level-1 text-color-text-primary', brandClasses[branded])
	);
</script>

<header class={headerClasses}>
	<div class="flex items-end justify-between">
		<h1 class="text-xl font-bold leading-tight">{@html title}</h1>

		{#if hint}
			<!-- An optional `<Overlay>` component to provide additional explanation. -->
			{@render hint?.()}
		{/if}
	</div>

	{#if subTitle}
		<div class="pt-1 text-sm">
			<!-- Optional longer subtitle to display below the main title. -->
			{@render subTitle?.()}
		</div>
	{/if}
</header>
