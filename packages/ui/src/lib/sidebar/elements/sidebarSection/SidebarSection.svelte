<script lang="ts">
	import type { Snippet } from 'svelte';

	import SidebarSectionTitle from './sidebarSectionTitle/SidebarSectionTitle.svelte';

	interface Props {
		/**
		 * The title of this section. Note that rather than supplying a title, you can supply a `<SidebarSectionTitle>` component as a `title` snippet.
		 */
		title?: Snippet | string;
		children?: Snippet;
	}

	let { title = '', children }: Props = $props();
</script>

<section
	class="product body-sm flex flex-col gap-flow-tight border-b border-color-border-muted pb-4 last-of-type:border-0"
>
	{#if typeof title != 'string'}
		<!-- An optional `<SidebarSectionTitle>` component, which can accept a subtitle. -->
		{@render title()}
	{:else if title}
		<SidebarSectionTitle>{title}</SidebarSectionTitle>
	{/if}
	<!-- The content to be displayed inside this section. -->
	<div class="flex flex-col gap-flow-default">
		{@render children?.()}
	</div>
</section>
