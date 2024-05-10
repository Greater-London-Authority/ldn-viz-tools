<!--
@component
This is a test...
-->

<script context="module" lang="ts">
	/**
	 * The `<Header>` component appears at the top of a page.
	 * It typically includes the app name, links to other pages (if the app has multiple pages), and a login/logout control (if the app requires authentication).
	 *
	 * @component
	 */

	//export let a='';
</script>

<nav
	class="w-screen flex items-center px-4 py-[.5rem] bg-core-grey-900 text-white text-left h-[50px] border-l-[5px] border-core-blue-500"
>
	<!-- Contents of the header (typically a combination of `<HeaderTitle>`, `<HeaderRight>`, `<NavLinks>`, and `<HeaderItem>` components) -->
	<slot />
</nav>
