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

<section class="border-b border-color-ui-border-secondary last-of-type:border-0">
	<div class="space-y-4 bg-color-container-level-1 pb-4 text-sm text-color-text-primary">
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
