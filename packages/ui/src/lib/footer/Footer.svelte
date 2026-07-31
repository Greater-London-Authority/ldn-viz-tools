<script lang="ts">
	import type { Snippet } from 'svelte';
	import LogoCIU from '../logos/LogoCIU.svelte';
	import FooterCookieMenu from './FooterCookieMenu.svelte';

	/**
	 * The `<Footer>` component appears at the bottom of a page.
	 * Note, if `<AnalyticsAndCookieConsent />` is not in your app or configured incorrectly, 'Cookie Settings' will not appear in the footer even when `showCookieMenu` is true.
	 * @component
	 */

	interface Props {
		/**
		 * Colour scheme to use, either `light` or `dark`.
		 */
		theme?: 'light' | 'dark';
		showCookieMenu?: boolean;
		showCiuLogo?: boolean;
		children?: Snippet;
		footerCookieMenu?: Snippet;
		logos?: Snippet;
	}

	let {
		theme = 'dark',
		showCookieMenu,
		showCiuLogo,
		footerCookieMenu,
		logos,
		children
	}: Props = $props();
</script>

<footer class="{theme} mt-auto">
	<div
		class="border-t border-color-border-muted bg-color-container px-4 py-4 text-color-text sm:flex sm:space-x-4 md:px-8"
	>
		<!-- Contents of the footer -->
		{@render children?.()}
	</div>

	{#if showCiuLogo}
		<div class="flex bg-color-container px-4 pb-4 text-color-text sm:flex-row-reverse md:px-8">
			<div class="product">
				<p class="caption mb-1 tracking-wide">Designed and developed by</p>
				<LogoCIU class="h-4" />
			</div>
		</div>
	{:else if logos}
		<div class="flex bg-color-container px-4 pb-4 text-color-text sm:flex-row-reverse md:px-8">
			{@render logos()}
		</div>
	{/if}

	{#if footerCookieMenu}
		<div class="border-t border-color-border-muted bg-color-container-level-1 px-4 py-2 md:px-8">
			{@render footerCookieMenu()}
		</div>
	{:else if showCookieMenu}
		<div class="border-t border-color-border-muted bg-color-container-level-1 px-4 py-2 md:px-8">
			<FooterCookieMenu />
		</div>
	{/if}
</footer>
