<script lang="ts">
	import type { Snippet } from 'svelte';
	import LogoCIU from '../logos/LogoCIU.svelte';
	import FooterCookieMenu from './FooterCookieMenu.svelte';

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
		class="border-color-border-muted bg-color-container text-color-text border-t px-4 py-4 sm:flex sm:space-x-4 md:px-8"
	>
		<!-- Contents of the footer -->
		{@render children?.()}
	</div>

	{#if showCiuLogo}
		<div class="bg-color-container text-color-text flex px-4 pb-4 sm:flex-row-reverse md:px-8">
			<div>
				<p class="mb-1 text-xs tracking-wide">Designed and developed by</p>
				<LogoCIU class="h-4" />
			</div>
		</div>
	{:else if logos}
		<div class="bg-color-container text-color-text flex px-4 pb-4 sm:flex-row-reverse md:px-8">
			{@render logos()}
		</div>
	{/if}

	{#if footerCookieMenu}
		<div class="border-color-border-muted bg-color-container-level-1 border-t px-4 py-2 md:px-8">
			{@render footerCookieMenu()}
		</div>
	{:else if showCookieMenu}
		<div class="border-color-border-muted bg-color-container-level-1 border-t px-4 py-2 md:px-8">
			<FooterCookieMenu />
		</div>
	{/if}
</footer>
