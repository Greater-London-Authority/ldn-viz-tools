<script lang="ts">
	import type { Snippet } from 'svelte';

	import SidebarSectionTitle from './sidebarSectionTitle/SidebarSectionTitle.svelte';

	interface Props {
		/**
		 * The title of this section. Note that rather than supplying a title, you can supply a `<SidebarSectionTitle>` component as a `title` snippet.
		 */
		title: Snippet | string;
		children?: Snippet;
	}

	let { title = '', children }: Props = $props();
</script>

<section class="border-color-ui-border-secondary border-b last-of-type:border-0">
	<div class="bg-color-container-level-1 text-color-text-primary space-y-4 pb-4 text-sm">
		{#if typeof title != 'string'}
			<!-- An optional `<SidebarSectionTitle>` component, which can accept a subtitle. -->
			{@render title()}
		{:else if title}
			<SidebarSectionTitle>{title}</SidebarSectionTitle>
		{/if}
		<!-- The content to be displayed inside this section. -->
		{@render children?.()}
	</div>
</section>
