<script lang="ts">
	import type { Snippet } from 'svelte';

	import SidebarGroupTitle from './sidebarGroupTitle/SidebarGroupTitle.svelte';

	interface Props {
		/**
		 * The title of this section. Note that rather than supplying a title, you can supply a `<SidebarGroupTitle>` component as a`title` snippet.
		 */
		title?: Snippet | string;
		children?: Snippet;
	}

	let { title = '', children }: Props = $props();
</script>

<section>
	<div
		class="space-y-2 bg-color-container-level-1 pb-2 text-sm text-color-text-primary last-of-type:pb-0"
	>
		{#if typeof title != 'string'}
			<!-- An optional `<SidebarSectionTitle>` component, which can accept a subtitle. -->
			{@render title()}
		{:else if title}
			<SidebarGroupTitle>{title}</SidebarGroupTitle>
		{/if}
		<!-- The content to be displayed inside this section. -->
		{@render children?.()}
	</div>
</section>
