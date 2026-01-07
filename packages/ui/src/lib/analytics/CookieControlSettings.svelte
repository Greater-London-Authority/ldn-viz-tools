<script module>
	const isCookieControlManagedByParent = () => {
		if (window.location === window.parent.location) {
			return false;
		}

		try {
			const londonGovDomains = ['.london.gov.uk'];
			const url = document.referrer;
			const hostname = new URL(url).hostname;

			for (const domain of londonGovDomains) {
				if (hostname.endsWith(domain)) {
					return true;
				}
			}

			return false;
		} catch (_err) {
			return false;
		}
	};
</script>

<script lang="ts">
	import type { ButtonProps } from '../button/types';

	/**
	 * The `CookieControlSettings` component provides a button which can be clicked on to open the cookie settings modal.
	 * @component
	 * */
	import { onMount } from 'svelte';
	import Button from '../button/Button.svelte';

	let {
		slim = true,
		variant = 'text',
		emphasis = 'secondary',
		...restProps
	}: ButtonProps = $props();

	let cookieControlStore = $state(undefined);

	onMount(() => {
		if (typeof window !== 'object') {
			// in SSR context rather than in browser
			return;
		}

		if (!isCookieControlManagedByParent()) {
			cookieControlStore = window.CookieControl;
		}
	});
</script>

{#if cookieControlStore}
	<Button
		{slim}
		{variant}
		{emphasis}
		aria-label="View cookie settings"
		onclick={cookieControlStore.open}
		{...restProps}
	>
		Cookie Settings
	</Button>
{/if}
