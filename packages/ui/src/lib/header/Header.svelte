<script lang="ts">
	/**
	 * The `<Header>` component appears at the top of a page.
	 * It typically includes the app name, links to other pages (if the app has multiple pages), and a login/logout control (if the app requires authentication).
	 *
	 * @component
	 */

	interface Props {
		/**
		 * Colour scheme to use, either `light` or `dark`.
		 */
		theme?: 'light' | 'dark';
		children?: import('svelte').Snippet;
	}

	let { theme = 'dark', children }: Props = $props();
</script>

<header
	class={`flex h-[50px] items-center border-b border-l-[5px] border-color-static-brand border-b-color-ui-border-secondary bg-color-container-level-0  px-4 py-[.5rem] text-left text-color-text-primary ${theme}`}
>
	<!-- Contents of the header (typically a combination of `<HeaderTitle>`, `<HeaderRight>`, `<NavLinks>`, and `<HeaderItem>` components) -->
	{@render children?.()}
</header>
