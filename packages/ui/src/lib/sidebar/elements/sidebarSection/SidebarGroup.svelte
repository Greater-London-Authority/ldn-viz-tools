<script lang="ts">
	import type { Snippet } from 'svelte';

	import SidebarGroupTitle from './sidebarGroupTitle/SidebarGroupTitle.svelte';

	interface Props {
		/**
		 * The title of this group. Note that rather than supplying a title, you can supply a `<SidebarGroupTitle>` component as a`title` snippet.
		 */
		title?: Snippet | string;
		children?: Snippet;
	}

	let { title = '', children }: Props = $props();
</script>

<div class="product">
	{#if typeof title != 'string'}
		<!-- An optional `<SidebarSectionTitle>` component, which can accept a subtitle. -->
		{@render title()}
	{:else if title}
		<SidebarGroupTitle>{title}</SidebarGroupTitle>
	{/if}
	<!-- The content to be displayed inside this section. -->
	<div class="mt-flow-default flex flex-col gap-flow-default">
		{@render children?.()}
	</div>
</div>
