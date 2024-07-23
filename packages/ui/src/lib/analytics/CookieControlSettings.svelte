<script context="module">
	const isCookieControlManagedByParent = () => {
		if (!window.top || window === window.top) {
			return false;
		}

		try {
			const londonGovDomains = ['london.gov.uk'];
			const url = new URL(window.top.location.href);

			for (const d of londonGovDomains) {
				if (url.hostname.toLowerCase().endsWith(d)) {
					return true;
				}
			}

			return false;
		} catch (e) {
			return false;
		}
	};
</script>

<script>
	/**
	 * The `CookieControlSettings` component provides a button which can be clicked on to open the cookie settings modal.
	 * @component
	 * */
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const cookieControlStore = writable(null);

	onMount(() => {
		if (!isCookieControlManagedByParent()) {
			cookieControlStore.set(window.CookieControl);
		}
	});
</script>

{#if $cookieControlStore}
	<button aria-label="View cookie settings" on:click={$cookieControlStore.open}>
		Cookie Settings
	</button>
{/if}
