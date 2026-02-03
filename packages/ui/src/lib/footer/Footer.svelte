<script lang="ts">
	import { classNames } from '@ldn-viz/ui';
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

	const logoClasses = $derived(
		classNames(
			'flex bg-color-container-level-0 px-4 pb-4 text-color-text-primary sm:flex-row-reverse md:px-8',
			!children ? 'pt-4' : ''
		)
	);
</script>

<footer class="{theme} mt-auto">
	{#if children}
		<div
			class="border-t border-color-ui-border-secondary bg-color-container-level-0 px-4 py-4 text-color-text-primary sm:flex sm:space-x-4 md:px-8"
		>
			<!-- Contents of the footer -->
			{@render children?.()}
		</div>
	{/if}

	{#if showCiuLogo}
		<div class={logoClasses}>
			<div>
				<p class="mb-1 text-xs tracking-wide">Designed and developed by</p>
				<LogoCIU class="h-4" />
			</div>
		</div>
	{:else if logos}
		<div class={logoClasses}>
			{@render logos()}
		</div>
	{/if}

	{#if footerCookieMenu}
		<div
			class="border-t border-color-ui-border-secondary bg-color-container-level-1 px-4 py-2 md:px-8"
		>
			{@render footerCookieMenu()}
		</div>
	{:else if showCookieMenu}
		<div
			class="border-t border-color-ui-border-secondary bg-color-container-level-1 px-4 py-2 md:px-8"
		>
			<FooterCookieMenu />
		</div>
	{/if}
</footer>
