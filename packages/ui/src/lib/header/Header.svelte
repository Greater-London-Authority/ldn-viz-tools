<script context="module" lang="ts">
	/**
	 * The `<Header>` component appears at the top of a page.
	 * It typically includes the app name, links to other pages (if the app has multiple pages), and a login/logout control (if the app requires authentication).
	 *
	 * @component
	 */
</script>

<script lang="ts">
	/**
	 * Colour scheme to use, either `light` or `dark`.
	 */
	export let theme: 'light' | 'dark' = 'dark';
</script>

<header
	class={`w-screen flex items-center px-4 py-[.5rem] bg-color-container-level-0 text-color-text-primary text-left h-[50px] border-l-[5px] border-color-static-brand ${theme}`}
>
	<!-- Contents of the header (typically a combination of `<HeaderTitle>`, `<HeaderRight>`, `<NavLinks>`, and `<HeaderItem>` components) -->
	<slot />
</header>
